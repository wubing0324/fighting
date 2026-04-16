var arr = [1,2,8,7]
const result = []
let used = new Array(arr.length).fill(false)

let map = {
	2: 5,
	5: 2,
	6: 9,
	9: 6
}
const dfs = (path) => {
    if (path.length > 0) {
        result.push(parseInt(path.join('')))
    }
    if (path.length == arr.length) {
        return
    }

    for (let i = 0; i < arr.length; i++) {
			if (used[i]) continue

			used[i] = true
			path.push(arr[i])
			dfs(path)
			path.pop()
			

			let m = map[arr[i]]
			if(m) {
				path.push(m)
				dfs(path)
				path.pop()
			}
			used[i] = false
    }
}
dfs([])

console.log(result)