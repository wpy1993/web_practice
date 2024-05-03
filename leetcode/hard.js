// 4. 寻找两个正序数组的中位数
// 该答案时间复杂度 O(m+n) 不符合要求
var findMedianSortedArrays = function (nums1, nums2) {
  const length1 = nums1.length;
  const length2 = nums2.length;
  const max = Number.MAX_VALUE;

  if (!length1 && !length2) return 0;

  const midPreNumInd = Math.floor((length1 + length2 + 1) / 2) - 1;
  const midAfterNumInd = Math.ceil((length1 + length2 + 1) / 2) - 1;

  let midPreNum = 0;
  let midAfterNum = 0;

  let i = 0;
  let j = 0;
  let curNum = undefined;
  let count = -1;
  while (true) {
    // 赋值及结束
    if (count === midPreNumInd) {
      midPreNum = curNum;
    }
    if (count === midAfterNumInd) {
      midAfterNum = curNum;
      break;
    }

    // 循环比对
    const num1 = nums1[i] || nums1[i] === 0 ? nums1[i] : max;
    const num2 = nums2[j] || nums2[j] === 0 ? nums2[j] : max;
    if (num1 <= num2) {
      curNum = nums1[i];
      i++;
    } else {
      curNum = nums2[j];
      j++;
    }
    count++;
  }

  return (midPreNum + midAfterNum) / 2;
};

const arr1 = [0, 0];
const arr2 = [0, 0];
console.log(findMedianSortedArrays(arr1, arr2));
