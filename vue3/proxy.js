var obj = {name: 'obj', child: {name: 'child1'}}

const isObject = (val) => {
    return val !== null && typeof val === "object";
};

var handler = {
    get: function (obj, prop) {
        let res = obj[prop]
        console.log('get res = ', res)
        // return res;
        return isObject(res) ? new Proxy(res, handler) : res;
    },
    set: function (obj, prop, value) {
        console.log('set res = ', obj)
        // The default behavior to store the value
        obj[prop] = value;
    
        // 表示成功
        return true;
    }
}

var p = new Proxy(obj, handler)

p.child.name