function getRes(n) {

    const dfs = (n, res) => {
        if (n === 1) {
            return res
        }
        if (n % 2  == 0) {
            return dfs(n / 2, res + 1)
        } else {
            return Math.min(dfs(n - 1, res + 1), dfs(n + 1, res + 1))
        }
        
    }
    return dfs(n, 0)
}

console.log(getRes(10))