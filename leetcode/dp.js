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

var coinChange = function (coins, amount) {};
