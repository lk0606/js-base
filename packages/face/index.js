
const options = [
    {
      id: 'zhejiang',
      text: 'Zhejiang',
      children: [
        {
          id: 'hangzhou',
          text: 'Hangzhou',
          children: [
            {
              id: 'xihu',
              text: 'West Lake'
            }
          ]
        }
      ]
    },
    {
      id: 'jiangsu',
      text: 'Jiangsu',
      children: [
        {
          id: 'nanjing',
          text: 'Nanjing',
          children: [
            {
              id: 'zhonghuamen',
              text: 'Zhong Hua Men'
            }
          ]
        }
      ]
    }
  ];

function getNode(id, source) {
    for(let item of source) {
        if(item.id===id) {
            break
        } 
        else{
            if(item.children && Array.isArray(item.children)) {
                getNode(id, item.children)
            }
        }
        return item
    }
    
}
// console.log(getNode('nanjing', options), '11')

const JsonTree = {
    "tagName": "ul",
    "props": {
      "className": "list",
      "data-name": "jsontree"
    },
    "children": [{
        "tagName": "li",
        "children": [{
          "tagName": "img",
          "props": {
            "src": "//img.alicdn.com/tps/TB1HwXxLpXXXXchapXXXXXXXXXX-32-32.ico",
            "width": "16px"
          }
        }]
      },
      {
        "tagName": "li",
        "children": [{
          "tagName": "a",
          "props": {
            "href": "https://www.aliyun.com",
            "target": "_blank"
          },
          "children": "阿里云"
        }]
      }
    ]
  };
//   将类似以下JSON表示的树状结构（可以无限层级）通过parseDOM函数（使用document.createElement，document.createTextNode，appendChild等方法）生成一颗DOM树（返回一个element元素）
function parseDOM(jsontree, wrap){
    const { tagName, props, children } = jsontree;
    const element = document.createElement(tagName);

    if(props) {
      Object.keys(props).forEach(attr=> {
        if(attr in element) {
          element[attr] = props[attr]
        } else {
          element.setAttribute(attr, props[attr])
        }
      })
    }
    //请实现过程
    //....
    if(wrap) {
      wrap.appendChild(element)
    }
    if (children && Array.isArray(children)) {
      children.forEach(item=> {
          parseDOM(item, element)
      })
    } 
    else {
      if(typeof children === 'string') {
        if(wrap) {
          let vnode = document.createTextNode(children)
          element.appendChild(vnode)
        }
      }
    }
    return element;
}

console.log(parseDOM(JsonTree), 'parseDOM')