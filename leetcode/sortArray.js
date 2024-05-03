// 912. 排序数组
// 这个不叫冒泡版，这个叫耗费性能版的插入排序，所以leetcode计算超时了
const sortArray1 = (arr) => {
  const length = arr.length;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        arr[j] += arr[i];
        arr[i] = arr[j] - arr[i];
        arr[j] = arr[j] - arr[i];
      }
    }
  }

  return arr;
};

// 快排 - 又超时了
// 外层 - 获取基准点，左侧递归排序，右侧递归排序
const quickSort = (nums, left, right) => {
  if (left > right) return; // 这句话，论证了 +1 和 -1 的重要性，用来打断的
  const pivot = partition(nums, left, right);
  quickSort(nums, left, pivot - 1);
  quickSort(nums, pivot + 1, right);
};
const partition = (nums, left, right) => {
  let pivot = right; // [5, 2, 3, 1, 4]
  let point = left; // 一个指针定在左边 - 用来优化一件事 - 不必开辟额外内存空间
  for (let i = left; i < right; i++) {
    if (nums[i] <= nums[pivot]) {
      [nums[i], nums[point]] = [nums[point], nums[i]];
      point++;
    }
  }
  // 最后有两个节点，point和pivot，point左侧都小于pivot，所以pivot放在point的位置
  [nums[point], nums[pivot]] = [nums[pivot], nums[point]];

  return point;
};

const sortArray2 = (nums) => {
  if (nums.length < 2) return nums;

  quickSort(nums, 0, nums.length - 1);

  return nums;
};

/* 归并排序 */

const arr1 = [5, 2, 3, 1, 4];
console.log(sortArray(arr1));
