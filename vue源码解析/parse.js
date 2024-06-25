// 主逻辑
function parse(html, options) {
  var stack = []
  var root;
  var currentParent;
  function closeElement (element) {
    if (currentParent) {
      // 关联元素父子关系,使得每个标签解析的match对象有了父子关系
      currentParent.children.push(element);
      element.parent = currentParent;
    }
    // remove trailing whitespace node again
    trimEndingWhitespace(element);
  }
  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    var lastNode;
    while (
      (lastNode = el.children[el.children.length - 1]) &&
      lastNode.type === 3 &&
      lastNode.text === ' '
    ) {
      el.children.pop();
    }
  }
  parseHTML(html, {
    start: function(tag, attrs, unary, start$1, end) {
      var element = createASTElement(tag, attrs, currentParent);
      if (!root) {
        root = element;
      }
      // 1.unary: false.不是自闭合标签,当前element变为currentParent,之后到结束标签触发end(),执行closeElement,从stack中取出当前标签,再取出当前标签的父标签,赋值关系.
      // 2.unary: true.是自闭合标签则挂到父元素对象上(currentParent),自闭合标签本身不会被推入stack.它不会包含子元素。
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    },
    end: function end (tag, start, end$1) {
      // 取当前标签和其父标签,建立层级关系
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },
    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            console.warn(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            console.warn(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      var children = currentParent.children;
      if (text) {
        var res;
        var child;
        // 解析表达式{{xxx}}
        if (text !== ' ' && (res = parseText(text))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
  })
  return root
}
function parseHTML (html, options) {
  // handleStartTag和parseEndTag中维护标签个数，用于找到和结束标签对应的开始标签的位置
  var stack = [];
  var index = 0;
  var isUnaryTag$$1 = isUnaryTag
  // 循环查询html内容，将不同类型的匹配结果存储到ast树种，然后截取掉，继续匹配剩下的html
  while (html) {
    var textEnd = html.indexOf('<');
    if (textEnd === 0) {
      // 标签类型：注释 <!--xxx-->
      if (comment.test(html)) {
        var commentEnd = html.indexOf('-->');

        if (commentEnd >= 0) {
          // 存储到ast
          if (options.shouldKeepComment) {
            // 截取注释中的文本用于生成ast对象
            options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
          }
          // 截掉处理过的html
          advance(commentEnd + 3);
          continue
        }
      }
      // 标签类型：条件注释 
      // <![if !IE]>
      // <link href="non-ie.css" rel="stylesheet">
      // <![endif]>
      if (conditionalComment.test(html)) {
        var conditionalEnd = html.indexOf(']>');

        if (conditionalEnd >= 0) {
          // vue源码中直接截取了，没存储到ast树
          advance(conditionalEnd + 2);
          continue
        }
      }
      // Doctype:
      var doctypeMatch = html.match(doctype);
      if (doctypeMatch) {
        // vue源码中直接截取了，没存储到ast树
        advance(doctypeMatch[0].length);
        continue
      }
      // End tag: 一般标签中结束标签<xxx></xxx>中的</xxx>
      var endTagMatch = html.match(endTag);
      if (endTagMatch) {
        var curIndex = index;
        advance(endTagMatch[0].length);
        parseEndTag(endTagMatch[1], curIndex, index);
        continue
      }
      // start tag: 标签中的开始标签<xxx></xxx>中的<xxx>。
      // 1.自闭合标签<xxx/>，不会入栈 stack，直接closeElement，
      // 2.入栈，处理对应的属性attribute，直到匹配到<xxx id="x" class="x" :class="dynmicx">中的>，
      // 截取html并进入下一次循环
      var startTagMatch = parseStartTag();
      if (startTagMatch) {
        handleStartTag(startTagMatch);
        if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
          advance(1);
        }
        continue
      }
    }
    var text = (void 0), rest = (void 0), next = (void 0);
    if (textEnd >= 0) {
      // 把<以前的文本切掉，判断当前从<开始的字符串是不是 结束、开始、注释、条件注释标签，
      // 如果都不是那就是文本，循环这一过程遍历所有<,直到文本结束或者遇到标签，记录得到的文本
      rest = html.slice(textEnd);
      while (
        !endTag.test(rest) &&
        !startTagOpen.test(rest) &&
        !comment.test(rest) &&
        !conditionalComment.test(rest)
      ) {
        // < in plain text, be forgiving and treat it as text
        next = rest.indexOf('<', 1);
        if (next < 0) { break }
        textEnd += next;
        rest = html.slice(textEnd);
      }
      text = html.substring(0, textEnd);
    }
    // textEnd<0说明不存在<，所以全是文本
    if (textEnd < 0) {
      text = html;
    }
    // 截取文本
    if (text) {
      advance(text.length);
    }
    if (options.chars && text) {
      options.chars(text, index - text.length, index);
    }
  }
  function parseEndTag (tagName, start, end) {
    options.end('', start, index);

    // 注释掉也没什么问题，核心就是上面那一句，所以parseHTML中的stack可以去掉

    // var pos, lowerCasedTagName;
    // if (start == null) { start = index; }
    // if (end == null) { end = index; }

    // // Find the closest opened tag of the same type
    // if (tagName) {
    //   lowerCasedTagName = tagName.toLowerCase();
    //   // 匹配到结束标签,找到对应的开始标签的位置
    //   debugger
    //   for (pos = stack.length - 1; pos >= 0; pos--) {
    //     if (stack[pos].lowerCasedTag === lowerCasedTagName) {
    //       break
    //     }
    //   }
    // } else {
    //   // If no tag name is provided, clean shop
    //   pos = 0;
    // }
    // if (pos >= 0) {
    //   // Close all the open elements, up the stack
    //   // 这里不会一次性关闭所有标签,因为pos的大小限制了循环的次数,已知情况下循环只走了一次,把正在匹配到的标签从stack删除了
    //   for (var i = stack.length - 1; i >= pos; i--) {
    //     if (i > pos || !tagName &&
    //       options.warn
    //     ) {
    //       options.warn(
    //         ("tag <" + (stack[i].tag) + "> has no matching end tag."),
    //         { start: stack[i].start, end: stack[i].end }
    //       );
    //     }
    //     if (options.end) {
    //       options.end(stack[i].tag, start, end);
    //     }
    //   }

    //   // Remove the open elements from the stack
    //   stack.length = pos;
    //   lastTag = pos && stack[pos - 1].tag;
    // } else if (lowerCasedTagName === 'br') {
    //   if (options.start) {
    //     options.start(tagName, [], true, start, end);
    //   }
    // } else if (lowerCasedTagName === 'p') {
    //   if (options.start) {
    //     options.start(tagName, [], false, start, end);
    //   }
    //   if (options.end) {
    //     options.end(tagName, start, end);
    //   }
    // }
  }
  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    // unary:true自闭合标签.false为一般标签
    var unary = isUnaryTag$$1(tagName);

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
          ? shouldDecodeNewlinesForHref
          : shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }
    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }
  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      // 没到结束标签或者还有属性匹配就继续循环,match匹配能拿到每个属性的开始属性,在加上匹配结果的长度,就是结束位置
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      // '/>'或'>','/'是子项
      if (end) { 
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }
  function advance (n) {
    index += n;
    html = html.substring(n);
  }
}

// 正则
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;


// 用到的函数
var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}
function parseText (
  text
) {
  var tagRE = defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}
var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});
function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}
function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;
function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}
var inBrowser = true
var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}
var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

// var template1 = `<div id="app" :testDyncAttr="testDyncAttr">
// <!-- <div v-if="flag" ref='message'>{{ message }}</div> -->
// <!-- <div v-else>{{ randomNum }}</div> -->
// <button @click="change">change</button>
// <button @click="toggle">toggle</button>
// <!-- <button-counter></button-counter> -->
// <ul>
//   <li v-for="(item, index) in datalist">{{item}}</li>
// </ul>
// </div>`
// var template2 = `<div id="app">
// <div class="class1 class2">
//   <p></p>
//   <br/>
// </div>
// <input/>
// </div>`
// let root = parse(template1.trim(), {shouldKeepComment: true})
// console.log(root)

var template = `<div v-if="flag" ref='message'>{{ message }}</div>
<div v-else>{{ randomNum }}</div>`
console.log(parseText(template))