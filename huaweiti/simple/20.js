const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
 
void (async function () {
  // 产品数, 总投资, 总风险
  const [m, n, x] = (await readline()).split(" ").map(Number);
 
  // 产品回报率序列
  const back = (await readline()).split(" ").map(Number);
  // 产品风险值序列
  const risk = (await readline()).split(" ").map(Number);
  // 产品投资额序列
  const invest = (await readline()).split(" ").map(Number);
 
  let max_invest_back = 0;
  let select = {};
 
  for (let i = 0; i < m; i++) {
    // 如果单个产品的投资风险未超过总风险，则投资单个产品
    if (risk[i] <= x) {
      // 产品I的投资额不能超过该产品的最大投资额，以及总投资
      const investI = Math.min(invest[i], n);
      // 产品投资回报
      const invest_back = investI * back[i];
 
      // 如果投资回报高于其他产品组合，那么选择该产品
      if (invest_back > max_invest_back) {
        max_invest_back = invest_back;
        select = {};
        select[i] = investI;
      }
    }
 
    for (let j = i + 1; j < m; j++) {
      // 如果两个产品的风险和不超过了总风险，那么两个产品都选
      if (risk[i] + risk[j] <= x) {
        let investI; // 产品I的投资额
        let investJ; // 产品J的投资额
 
        // 其中优先投资回报率大的
        if (back[i] > back[j]) {
          // 产品I回报率高，则能投多少投多少，最多不能超过min(总投资, 产品I的最多投资额)
          investI = Math.min(n, invest[i]);
          // 留给产品J的剩余钱未 n - investI, 而产品J最多投资invest[j]，因此取二者较小值
          investJ = Math.min(n - investI, invest[j]);
        } else {
          investJ = Math.min(n, invest[j]);
          investI = Math.min(n - investJ, invest[i]);
        }
 
        // 总投资回报
        const invest_back = investI * back[i] + investJ * back[j];
 
        // 如果当前产品组合的总回报更大，则选当前组合产品
        if (invest_back > max_invest_back) {
          max_invest_back = invest_back;
          select = {};
          // select的key记录产品的ID，val记录产品的投资额
          if (investI > 0) select[i] = investI;
          if (investJ > 0) select[j] = investJ;
        }
      }
    }
  }
 
  const res = [];
  for (let i = 0; i < m; i++) {
    if (select[i] != undefined) {
      res.push(select[i]);
    } else {
      res.push("0");
    }
  }
 
  console.log(res.join(" "));
})();