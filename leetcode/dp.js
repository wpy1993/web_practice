// 动态规划

// 128. 最长连续序列
var longestConsecutive = function (nums) {
  // 要求时间复杂度 O(n)
  const numMap = {}; // num: length
  let maxLength = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (!numMap[num]) {
      const leftLength = numMap[num - 1] || 0;
      const rightLength = numMap[num + 1] || 0;

      let curLength = leftLength + 1 + rightLength;
      numMap[num - leftLength] =
        numMap[num + rightLength] =
        numMap[num] =
          curLength;

      console.log("numMap is", numMap);

      maxLength = Math.max(curLength, maxLength);
    }
  }

  return maxLength;
};

// const numList = [1, 5, 8, 9, 7, 6];
// console.log(longestConsecutive(numList));

/**
 * 一个小实验，看一下map和obj谁快，好像 obj写入更快
 * */
// console.time("obj");
// let obj2 = {};
// for (let i = 0; i < 100000; i++) {
//   obj2[i] = i;
// }
// console.timeEnd("obj");  // 2.657958984375 ms

// console.time("map");
// let map2 = new Map();
// for (let i = 0; i < 100000; i++) {
//   map2.set(i, i);
// }
// console.timeEnd("map");  // 9.458984375 ms

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
// 可能代码没错，但是爆栈了，而且字典毫无用处
// 这道题不适合递归
var coinChange = function (coins, amount) {
  if (amount <= 0) return 0;

  // 字典缓存
  const countMap = {};
  for (let coin of coins) {
    countMap[coin] = 1;
  }

  let dig = 1;

  const getMinCoinCounts = (sum) => {
    // 结束条件
    if (countMap[sum] !== undefined) {
      return countMap[sum];
    }

    // for循环，递减
    let innerCount = Number.MAX_VALUE;
    for (let coin of coins) {
      dig++;
      if (dig >= 1148576) {
        throw new Error("out done");
      }
      if (coin > sum) continue;

      console.log("calcute", sum, coin);
      let leftCount = getMinCoinCounts(sum - coin);
      // console.log("end is", sum, coin, leftCount);
      if (leftCount === -1) continue;
      innerCount = Math.min(leftCount + 1, innerCount);
    }

    if (innerCount === Number.MAX_VALUE) {
      return -1;
    }
    countMap[sum] = innerCount;
    return innerCount;
  };

  const count = getMinCoinCounts(amount);

  return count;
};

const count = coinChange([186, 83], 6249);
console.log("count is", count);

// 70. 爬楼梯
const stairsCollect = [0, 1, 2];
var climbStairs = (n) => {
  if (n === 0) return 0;

  if (stairsCollect[n]) return stairsCollect[n];

  const oneStepStart = (stairsCollect[n - 1] =
    stairsCollect[n - 1] === undefined
      ? climbStairs(n - 1)
      : stairsCollect[n - 1]);
  const twostepStart = (stairsCollect[n - 2] =
    stairsCollect[n - 2] === undefined
      ? climbStairs(n - 2)
      : stairsCollect[n - 2]);
  return oneStepStart + twostepStart;
};

// const steps = climbStairs(3);
// console.log("steps is", steps);
