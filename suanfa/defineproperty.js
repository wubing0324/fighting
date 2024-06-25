Object.defineProperty(window, 'a', {
  value: 1,
  writable: true,
  get: function(val) {
    console.log(val)
    return 2
  }
});
console.log(a)