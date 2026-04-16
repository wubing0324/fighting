// class UnionSet {
//     constructor(n) {
//         this.fa = new Array(n).fill(0).map((_, idx) => idx)
//     }

//     find(x) {
//         if (x !== this.fa[x]) {
//             this.fa[x] = this.find(this.fa[x])
//             return this.fa[x]
//         }
//         return x
//     }

//     unio(x, y) {
//         let fa_x = this.find(x)
//         let fa_y = this.find(y)
//         if (fa_x !== fa_y) {
//             this.fa[this.fa_y] = this.fa_x
//         }
//     }
// }

class UnionSet {
  constructor(n) {
    this.fa = new Array(n).fill(0).map((_, index) => index)
    this.count = n
  }

  find(x) {
    if (x !== this.fa[x]) {
      this.fa[x] = this.find(this.fa[x])
      return this.fa[x]
    }
    return x
  }

  union(x, y) {
    let fa_x = this.find(x)
    let fa_y = this.find(y)
    if (fa_x != fa_y) {
      this.fa[fa_y] = fa_x
    }
  }
}