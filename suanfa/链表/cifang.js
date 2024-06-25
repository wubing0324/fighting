function cifang(base, power) {
  if (power === 0) {
    return 1
  }
  if (power % 2 == 0) {
    const value = cifang(base, power / 2)
    return value * value
  }
  const value = cifang(base, Math.floor(power / 2))
  return base * value * value
}

console.log(cifang(2, 10))