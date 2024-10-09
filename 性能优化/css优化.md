https://developer.mozilla.org/zh-CN/docs/Learn/Performance/CSS
https://vue3js.cn/interview/css/css_performance.html#%E4%BA%8C%E3%80%81%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F

##### 删除不必要的样式
coverage去掉无用或首屏不用资源、延迟加载他们以提高首屏速度
##### 将 CSS 拆分为独立模块
##### 预加载重要资源
你可以使用 rel="preload" 将 <link> 元素转换为预加载器，用于关键资源，包括 CSS 文件、字体和图片：
```javascript
<link rel="preload" href="style.css" as="style" />

<link
  rel="preload"
  href="ComicSans.woff2"
  as="font"
  type="font/woff2"
  crossorigin />

<link
  rel="preload"
  href="bg-image-wide.png"
  as="image"
  media="(min-width: 601px)" />

```
##### 最小化和压缩你的 CSS：
##### 简化选择器
```javascript
/* 非常具体的选择器 */
body div#main-content article.post h2.headline {
  font-size: 24px;
}

/* 你可能只需要这个 */
.headline {
  font-size: 24px;
}
```
##### 不要将样式应用于不需要的元素
```javascript
/* 选择 <body> 元素内的所有元素 */
body * {
  font-size: 14px;
  display: flex;
}
```
##### 内嵌关键css，延迟和非阻塞加载非首屏css
库：critical
##### 减少HTTP请求
1.合理拆分
2.雪碧图
3.减少使用@import

    css样式文件有两种引入方式，一种是link元素，另一种是@import

    @import会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时

    而且多个@import可能会导致下载顺序紊乱

    比如一个css文件index.css包含了以下内容：@import url("reset.css")

    那么浏览器就必须先把index.css下载、解析和执行后，才下载、解析和执行第二个文件reset.css


性能优化：
https://web.dev/articles/reduce-the-scope-and-complexity-of-style-calculations?utm_source=lighthouse&utm_medium=devtools&hl=zh-cn
降低选择器的复杂性

下面是一些简单的准则，可帮助您尽可能缩短在网页中进行重排的用时：

1.减少不必要的 DOM 深度。在 DOM 树中的一个级别进行更改可能会致使该树的所有级别（上至根节点，下至所修改节点的子级）都随之变化。这会导致花费更多的时间来执行重排。
2.尽可能减少 CSS 规则的数量，并移除未使用的 CSS 规则。
3.如果您想进行复杂的渲染更改（例如动画），请在流程外执行此操作。您可以使用 position-absolute 或 position-fixed 来实现此目的。
4.避免使用不必要且复杂的 CSS 选择器（尤其是后代选择器），因为此类选择器需要耗用更多的 CPU 处理能力来执行选择器匹配。
5.content-visibility(兼容性不是很好)
https://www.cnblogs.com/coco1s/p/16373817.html
+ 在一些需要被频繁切换显示、隐藏状态的元素上，使用 content-visibility: hidden，用户代理无需重头开始渲染它和它的子元素，能有效的提升切换时的渲染性能；
+ content-visibility: auto 的作用更加类似于虚拟列表，使用它能极大的提升长列表、长文本页面的渲染性能；
+ 合理使用 contain-intrinsic-size 预估设置了content-visibility: auto 元素的高宽，可以有效的避免滚动条在滚动过程中的抖动；
+ content-visibility: auto 无法直接替代 LazyLoad，设置了 content-visibility: auto 的元素在可视区外只是未被渲染，但是其中的静态资源仍旧会在页面初始化的时候被全部加载；
+ 即便存在设置了 content-visibility: auto 的未被渲染的元素，但是它并不会影响全局的搜索功能。
6.图片设置优先级（fetchpriority 属性）：
使用 fetchpriority HTML 属性，可以在使用 link、img 或 script 标记下载资源时，为 CSS、字体、脚本和图片等资源类型指定下载优先级。它可以采用以下值：

high：该资源的优先级较高，并且您希望浏览器为其设置更高的优先级，前提是浏览器自己的启发法不会阻止这种情况的发生。
low：该资源的优先级较低，如果其启发法允许，浏览器也会降低该资源的优先级。
auto：默认值，可让浏览器选择合适的优先级。
以下是在标记中使用 fetchpriority 属性以及与脚本等效的 priority 属性的一些示例。
```javascript
<!-- We don't want a high priority for this above-the-fold image -->
<img src="/images/in_viewport_but_not_important.svg" fetchpriority="low" alt="I'm an unimportant image!">

<!-- We want to initiate an early fetch for a resource, but also deprioritize it -->
<link rel="preload" href="/js/script.js" as="script" fetchpriority="low">

<script>
  fetch('https://example.com/', {priority: 'low'})
  .then(data => {
    // Trigger a low priority fetch
  });
</script>
```
为图片设置尺寸，来避免布局偏移,免得加载界面后用户移动内容，图片此时加载好导致界面偏移


##### 字体的优化
1.放在cdn，在cdn和html不同域名的情况下，使用dns-prefetch和preconnect加速dns解析和建立连接
2.使用preload提前加载字体资源
3.字体子集：拆分首屏字体定义为单独的font-family：'first-fonts';（拆分工具：fontmin或者font-spider,通过字体子集，可以去掉无用的生僻字，减少字体文件大小），非首屏字体延迟加载。
4.使用font-display: swap; 字体加载不阻塞html渲染，先使用默认字体，等字体加载完再替换
5.缓存