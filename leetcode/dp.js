// 动态规划

// 509 斐波那契数
const collectMap = {};
var fib = function (n) {
  // 边界条件
  if (n === 0) return 0;
  if (n === 1) return 1;

  const pre = collectMap[n - 1] || fib(n - 1);
  const doublePre = collectMap[n - 2] || fib(n - 2);
  // 算法 fn = f(n-1) + f(n-2)
  return pre + doublePre;
};

// 322 零钱兑换

var coinChange = function (coins, amount) {};
