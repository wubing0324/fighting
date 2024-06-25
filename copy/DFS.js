function deepClone(obj, map = new Map()) {
    // 基本类型和函数直接返回
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    // 如果对象已经被拷贝过，直接返回其拷贝
    if (map.has(obj)) {
      return map.get(obj);
    }
  
    // 创建新对象或数组
    const clone = Array.isArray(obj) ? [] : {};
  
    // 记录已经拷贝的对象
    map.set(obj, clone);
  
    // 递归拷贝对象的属性
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key], map);
      }
    }
  
    return clone;
  }
  
  // 测试代码
  const a = { name: "John", address: { city: "New York" } };
  a.self = a;  // 循环引用
  
  const b = deepClone(a);
  
  console.log(b);
  console.log(b === a);  // false
  console.log(b.address === a.address);  // false
  console.log(b.self === b);  // true
  