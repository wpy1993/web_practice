// 1 两数之和 内存溢出了
var twoSumOverSize = function (nums, target) {
  let numsMaxIndex = nums.length - 1;
  let results = [];

  const loopFunc = (firstNum, firstIndex) => {
    let index = firstIndex + 1;
    let leftNum = target - firstNum;

    let secNum = undefined;
    let secIndex = undefined;

    let isSearching = true;

    while (index < numsMaxIndex && isSearching) {
      if (nums[index] === leftNum) {
        secNum = nums[index];
        secIndex = index;
        isSearching = false;
      }
    }
    return [firstIndex, secIndex];
  };

  for (let i = 0; i <= numsMaxIndex; i++) {
    results = loopFunc(nums[i], i);
    if (results[1]) break;
  }

  return results;
};

var twoSum = function (nums, target) {
  const numMap = {};

  const maxSize = nums.length;
  for (let i = 0; i < maxSize; i++) {
    const leftNum = target - nums[i];
    if (numMap[leftNum] !== undefined) {
      return [numMap[leftNum], i];
    } else {
      numMap[nums[i]] = i;
    }
  }
};

console.log(twoSum([3, 2, 4], 6));
