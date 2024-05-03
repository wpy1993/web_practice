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

const arr = [1, 1, 2, 4, 5, 2, 3, 3, 4];
// removeElement(arr, 2);
