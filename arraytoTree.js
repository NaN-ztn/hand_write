function arraytoTree(arr) {
  let root = arr.shift()
  let tree = {
    id: root.id,
    val: root.val,
    children: arr.length > 0 ? toTree(root.id, arr) : []
  }
  return tree
}

function toTree(parentId, arr) {
  let children = []
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let node = arr[i]
    if (node.parentId === parentId) {
      children.push({
        id: node.id,
        val: node.val,
        children: toTree(node.id, arr)
      })
    }
  }
  return children
}

let input = [
  {
    id: 1, val: '学校', parentId: null
  }, {
    id: 2, val: '班级1', parentId: 1
  }, {
    id: 3, val: '班级2', parentId: 1
  }, {
    id: 4, val: '学生1', parentId: 2
  }, {
    id: 5, val: '学生2', parentId: 2
  }, {
    id: 6, val: '学生3', parentId: 3
  },
]
console.log(arraytoTree(input))

function jsonToTree(data) {
  // 初始化结果数组，并判断输入数据的格式
  let result = []
  if (!Array.isArray(data)) {
    return result
  }
  // 使用map，将当前对象的id与当前对象对应存储起来
  let map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  // 
  data.forEach(item => {
    let parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

// 转换前：
let source = [{
  id: 1,
  pid: 0,
  name: 'body'
}, {
  id: 2,
  pid: 1,
  name: 'title'
}, {
  id: 3,
  pid: 2,
  name: 'div'
}]
