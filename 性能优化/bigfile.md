<template>
  <div>
    <button @click="startDownload">开始分段下载（并发）</button>
    <button @click="cancelDownload" :disabled="!isDownloading">取消</button>
    <div v-if="progress > 0">
      总进度：{{ progress }}%
      <div class="progress-bar">
        <div :style="{ width: progress + '%' }"></div>
      </div>
      <div>下载速度：{{ downloadSpeed }} MB/s</div>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      progress: 0,
      error: '',
      isDownloading: false,
      downloadSpeed: 0,
      chunks: [],          // 存储所有分片
      controllers: [],     // 存储所有AbortController
      chunkSize: 5 * 1024 * 1024, // 每片5MB
      totalSize: 0,        // 文件总大小（从后端获取）
    };
  },
  methods: {
    async startDownload() {
      this.isDownloading = true;
      this.error = '';
      this.progress = 0;
      this.chunks = [];
      this.controllers = [];

      try {
        // 1. 获取文件总大小
        const { data: fileInfo } = await axios.head('http://your-server.com/large-file', {
          headers: { 'Accept': 'application/json' }
        });
        this.totalSize = fileInfo.size || 100 * 1024 * 1024; // 默认100MB

        // 2. 计算分片数量
        const chunkCount = Math.ceil(this.totalSize / this.chunkSize);

        // 3. 并发下载所有分片
        const downloadPromises = [];
        for (let i = 0; i < chunkCount; i++) {
          const start = i * this.chunkSize;
          const end = Math.min(start + this.chunkSize - 1, this.totalSize - 1);
          downloadPromises.push(this.downloadChunk(i, start, end));
        }

        await Promise.all(downloadPromises);

        // 4. 合并所有分片并保存
        if (this.chunks.length === chunkCount) {
          const blob = new Blob(this.chunks);
          this.saveFile(blob);
        }
      } catch (err) {
        if (err.message !== 'canceled') {
          this.error = `下载失败: ${err.message}`;
        }
      } finally {
        this.isDownloading = false;
      }
    },

    async downloadChunk(chunkIndex, start, end) {
      const controller = new AbortController();
      this.controllers.push(controller);

      try {
        const response = await axios.get('http://your-server.com/large-file', {
          headers: { 'Range': `bytes=${start}-${end}` },
          responseType: 'blob',
          signal: controller.signal,
          onDownloadProgress: (e) => {
            // 计算实时速度（简化版）
            const loaded = start + e.loaded;
            this.updateProgress(loaded);
          }
        });

        this.chunks[chunkIndex] = response.data;
      } catch (err) {
        if (err.message !== 'canceled') {
          throw err;
        }
      }
    },

    updateProgress(loadedBytes) {
      this.progress = Math.round((loadedBytes / this.totalSize) * 100);
      // 简单计算下载速度（实际需更精确计算）
      this.downloadSpeed = (loadedBytes / 1024 / 1024 / (performance.now() / 1000)).toFixed(2);
    },

    saveFile(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-file.zip';
      a.click();
      URL.revokeObjectURL(url);
    },

    cancelDownload() {
      this.controllers.forEach(controller => controller.abort());
      this.isDownloading = false;
      this.error = '下载已取消';
    }
  }
};
</script>

<style>
.progress-bar {
  width: 100%;
  height: 20px;
  background: #eee;
  margin: 10px 0;
}
.progress-bar div {
  height: 100%;
  background: #42b983;
}
.error { color: red; }
</style>
