function Fbi(i){
  if (i < 2) {
      return i === 0 ? 0 : 1
  }
  debugger
  return Fbi(i - 1) + Fbi(i - 2)
}
console.log(Fbi(6))