// 26. 删除有序数组中的重复项
const removeDuplicates = (nums) => {
  let i = 0;
  let j = 0;
  const numsLength = nums.length;

  for (; j < numsLength; j++) {
    if (nums[i] !== nums[j]) {
      i++;
      nums[i] = nums[j];
    }
  }

  console.log("i is", i);
  console.log("nums is", nums);

  return nums;
  // return i + 1
};

// const arr = [1, 1, 2, 2, 2, 3, 3, 4];
// removeDuplicates(arr);

// 27. 移除元素
const removeElement = (nums, val) => {
  let i = 0;
  let numsLength = nums.length;

  for (let j = 0; j < numsLength; j++) {
    if (nums[j] !== val) {
      nums[i] = nums[j];
      i++;
    }
  }

  console.log("i is", i);
  console.log("nums is", nums);

  return i; // 这个i已经是下一位了，不需要+1
};

// const arr = [1, 1, 2, 4, 5, 2, 3, 3, 4];
// removeElement(arr, 2);

// 面试题 17.19. 消失的两个数字
//  O(N) 时间内只用 O(1) 的空间
// 参考题目 - 1-100中寻找失去的两个数
var missingTwo = function (nums) {
  const allLens = nums.length + 2;

  let sum = 0;
  for (let num of nums) {
    sum += num;
  }

  const missingSum = (allLens * (1 + allLens)) / 2 - sum;
  const halfMissingNum = missingSum / 2;

  let leftSum = 0;
  let leftLens = 0;
  for (let num of nums) {
    if (num < halfMissingNum) {
      leftSum += num;
      leftLens++;
    }
  }
  leftLens++;

  const preSum = (leftLens * (1 + leftLens)) / 2;
  const leftOne = preSum - leftSum;

  return [leftOne, missingSum - leftOne];
};

// const arr = [1];
// console.log(missingTwo(arr));
