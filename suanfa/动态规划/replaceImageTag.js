var str = '<span>fdsfds</span>fdsfdsfds<image src="www.baidu.com/dsadsa?45646546" />gfdgfd gfdgfd<image src="www.baidu.com/dsadsa?45646546" >'

function replaceImageTag(html) {
  var startTagClose = /<(\s*image\s*[^>]*)\/>/ig
  var imageSatrtTag = /<(\s*image\s*[^>]*)>/ig
  html = html.replace(startTagClose, function(match, p1, offset, string) {
    return ` &lt ${p1} &gt `
  })
  
  html = html.replace(imageSatrtTag, function(match, p1, p2, offset, string) {
    return ` &lt ${p1} &gt `
  })
  return html
}

console.log(replaceImageTag(str))
