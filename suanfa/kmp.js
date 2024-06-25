var pat = 'ababc'

function getDP(pat){
  var len = pat.length
  var dp = Array.from({length: len}, (v, i) => 0)
  for (let j = 0; j < len; j++) {
    dp[j] = Array.from({length: 256}, (v, i) => 0)
  }
  console.table(dp)
}

getDP(pat)

console.log(pat.charAt(0))