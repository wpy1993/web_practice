// 151. 反转字符串中的单词
const reservePart = (s, start, end) => {
  // console.log("s is ", start, s[start]);
  while (start !== end || start + 1 !== end) {
    let temp = s[start];
    s.replace(start, 1, s[end]);
    s.replace(end, 1, temp);
    // s[start] = s[start] ^ s[end];
    // s[end] = s[start] ^ s[end];
    // s[start] = s[start] ^ s[end];
    start++;
    end--;
  }
  return s;
};
var reverseWords = function (s) {
  const max = s.length - 1;
  // 全量交换
  s = reservePart(s, 0, max);

  // 每个单词交换
  let p = 0;
  let q = 0;
  while (q !== max) {
    if (s[p] !== " ") {
      if (s[q + 1] === " ") {
        s = reservePart(s, p, q);

        p = q = q + 1;
      } else {
        q++;
      }
    }
    if (s[p] === " ") {
      p++;
      q++;
    }
  }

  return s;
};

// reverseWords("hello wplay");

// 3. 无重复字符的最长子串
const lengthOfLongestSubstring = function (s) {
  if (!s) return 0;

  const sMap = {};

  let cur = 0;
  let next = 0;
  let maxLength = 0;
  while (next < s.length) {
    const char = s[next];
    next++;

    // 扩大窗口
    if (!sMap[char]) {
      sMap[char] = 1;
    } else {
      sMap[char]++;
    }

    // 缩小窗口
    if (sMap[char] > 1) {
      while (sMap[char] > 1) {
        sMap[s[cur]]--;
        cur++;
      }
    }

    maxLength = Math.max(maxLength, next - cur);
  }

  return maxLength;
};

const sss = "abccdcb";
console.log(lengthOfLongestSubstring(sss));
