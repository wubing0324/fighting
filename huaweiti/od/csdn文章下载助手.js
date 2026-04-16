/**
 * CSDN算法题目内容提取助手
 * 使用方法：
 * 1. 手动下载CSDN文章HTML内容
 * 2. 将HTML内容保存到od/原始文章/目录下
 * 3. 运行此脚本，会将内容整理到od/题目/目录下
 */

const fs = require('fs');
const path = require('path');

// 算法题目列表
const 算法题目 = [
  {
    序号: 1,
    题目: '流浪地球',
    考点: '逻辑模拟',
    难度: '100分',
    文章ID: '127914382' // 这里需要填写正确的文章ID
  },
  {
    序号: 2,
    题目: '构成正方形的数量',
    考点: '数学问题',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 3,
    题目: '童话的车',
    考点: '位运算',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 4,
    题目: '敲敲字段加密',
    考点: '字符串、数组、集合操作',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 5,
    题目: 'TLV解码',
    考点: '字符串、数组、集合操作',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 6,
    题目: '分报座',
    考点: '递归+缓存优化',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 7,
    题目: 'boss的收入',
    考点: '逻辑分析',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 8,
    题目: '手机App防沉迷系统',
    考点: '逻辑分析',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 9,
    题目: '字符串分割',
    考点: '字符串、数组、集合操作',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 10,
    题目: '英文输入法',
    考点: '字符串、数组、集合操作',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 11,
    题目: '连续字母长度',
    考点: '字符串、数组、集合操作',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 12,
    题目: '考勤信息',
    考点: '逻辑分析',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 13,
    题目: '字符串变换最小字符串',
    考点: '字符串、数组、集合操作',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  {
    序号: 14,
    题目: '整数对最小和',
    考点: '逻辑分析',
    难度: '100分',
    文章ID: '' // 这里需要填写正确的文章ID
  },
  // 其他已知的题目
  {
    序号: '其他',
    题目: '信道分配',
    考点: '逻辑分析',
    难度: '未知',
    文章ID: '127607871'
  }
];

/**
 * 从HTML内容中提取题目信息
 * @param {string} html HTML内容
 * @returns {Object} 提取的题目信息
 */
function extractProblemInfo(html) {
  // 这里实现从HTML中提取题目信息的逻辑
  // 由于实际的HTML结构未知，这里只提供一个框架
  
  // 题目描述通常在特定的标签或元素中
  const problemDescription = html.match(/<div class="problem-description">([\s\S]*?)<\/div>/i)?.[1] || '';
  
  // 输入描述
  const inputDescription = html.match(/<div class="input-description">([\s\S]*?)<\/div>/i)?.[1] || '';
  
  // 输出描述
  const outputDescription = html.match(/<div class="output-description">([\s\S]*?)<\/div>/i)?.[1] || '';
  
  // 示例
  const examples = html.match(/<div class="examples">([\s\S]*?)<\/div>/i)?.[1] || '';
  
  // 解题思路
  const solution = html.match(/<div class="solution">([\s\S]*?)<\/div>/i)?.[1] || '';
  
  // 代码实现
  const code = html.match(/<pre><code>([\s\S]*?)<\/code><\/pre>/i)?.[1] || '';
  
  return {
    problemDescription,
    inputDescription,
    outputDescription,
    examples,
    solution,
    code
  };
}

/**
 * 将题目信息转换为Markdown格式
 * @param {string} title 题目标题
 * @param {Object} info 题目信息
 * @returns {string} Markdown格式的题目
 */
function convertToMarkdown(title, info) {
  return `# ${title}

## 题目描述
${info.problemDescription}

## 输入描述
${info.inputDescription}

## 输出描述
${info.outputDescription}

## 示例
${info.examples}

## 解题思路
${info.solution}

## 代码实现
\`\`\`javascript
${info.code}
\`\`\``;
}

/**
 * 处理主函数
 */
function processArticles() {
  console.log('开始处理CSDN文章...');
  
  // 确保目录存在
  const originDir = path.join(__dirname, '原始文章');
  const targetDir = path.join(__dirname, '题目');
  
  if (!fs.existsSync(originDir)) {
    fs.mkdirSync(originDir, { recursive: true });
    console.log(`创建目录: ${originDir}`);
  }
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`创建目录: ${targetDir}`);
  }
  
  // 读取原始文章目录
  const files = fs.readdirSync(originDir);
  console.log(`共找到 ${files.length} 个文件`);
  
  // 处理每个文件
  for (const file of files) {
    if (!file.endsWith('.html')) continue;
    
    const filePath = path.join(originDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // 从文件名提取文章ID
    const articleId = file.replace(/[^0-9]/g, '');
    
    // 查找对应的题目
    const problem = 算法题目.find(p => p.文章ID === articleId);
    if (!problem) {
      console.log(`未找到ID为 ${articleId} 的题目信息，跳过处理`);
      continue;
    }
    
    // 提取题目信息
    const problemInfo = extractProblemInfo(fileContent);
    
    // 转换为Markdown
    const markdown = convertToMarkdown(problem.题目, problemInfo);
    
    // 保存到目标目录
    const targetPath = path.join(targetDir, `${problem.题目}.md`);
    fs.writeFileSync(targetPath, markdown, 'utf-8');
    
    console.log(`处理完成: ${problem.题目}`);
  }
  
  console.log('全部处理完成!');
}

// 执行处理
// processArticles();

console.log('请先填写题目对应的文章ID，然后取消注释最后一行代码执行处理');
console.log('用法: node csdn文章下载助手.js'); 