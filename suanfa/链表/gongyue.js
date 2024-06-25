function euclideanAlgorithmIterative(originalA, originalB) {
  // Make input numbers positive.
  let a = Math.abs(originalA);
  let b = Math.abs(originalB);

  // Subtract one number from another until both numbers would become the same.
  // This will be out GCD. Also quit the loop if one of the numbers is zero.
  while (a && b && a !== b) {
    [a, b] = a > b ? [a - b, b] : [a, b - a];
  }

  // Return the number that is not equal to zero since the last subtraction (it will be a GCD).
  return a || b;
}

console.log(euclideanAlgorithmIterative(300,150))

function gongbeishu(a, b) {
  return (a === 0 || b === 0) ? 0 : Math.abs(a * b) / euclideanAlgorithmIterative(a, b)
}
console.log(gongbeishu(3,15))