let bin = 0;
let dig = 1;
cells = [0, 1, 1, 0, 0, 0, 0, 0]
for (let i = cells.length - 1; i >= 0; i--) {
    bin += cells[i] * dig;
    dig *= 2;
}
console.log(bin)
console.log(dig)