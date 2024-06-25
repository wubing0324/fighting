function deepCloneBFS(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    const map = new Map();
    const queue = [];
  
    const clone = Array.isArray(obj) ? [] : {};
    map.set(obj, clone);
    queue.push({ source: obj, target: clone });
  
    while (queue.length > 0) {
      const { source, target } = queue.shift();
  
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          const value = source[key];
  
          if (typeof value === 'object' && value !== null) {
            if (map.has(value)) {
              target[key] = map.get(value);
            } else {
              const newClone = Array.isArray(value) ? [] : {};
              map.set(value, newClone);
              target[key] = newClone;
              queue.push({ source: value, target: newClone });
            }
          } else {
            target[key] = value;
          }
        }
      }
    }
  
    return clone;
  }
  
  // 测试代码
  const a = { name: "John", address: { city: "New York" } };
  a.self = a;  // 循环引用
  
  const b = deepCloneBFS(a);
  
  console.log(b);
  console.log(b === a);  // false
  console.log(b.address === a.address);  // false
  console.log(b.self === b);  // true
  