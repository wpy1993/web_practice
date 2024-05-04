// 结论： in 获取下标；of 获取下标对应的值
const tetForInAndOf = () => {
  const arr = [4, 5, 6];
  for (let i in arr) {
    console.log("i is", i);
  }

  for (let num of arr) {
    console.log("num is", num);
  }

  const obj = { a: 4, b: 5 };

  for (let key in obj) {
    console.log("key is", key);
  }

  // for (let val of obj) {
  //   console.log("val is", val); // 错误，没这种用法，只支持iterable类型数据
  // }
};

// 这个知识点本该知道的，但是忘了 —— break打断后续所有
// 附赠一个知识点，多层循环中，continue可以指定继续的起始循环位置 —— `continue label`; break同理，只是它代表从哪一层开始中断
const testBreakAndContinue = () => {
  const arr = [1, 2, 3];

  for (let i of arr) {
    if (i === 2) {
      break;
    }
    console.log("break work in ", i); // 1
  }

  for (let i of arr) {
    if (i === 2) {
      continue;
    }
    console.log("continue work in ", i); // 1 3
  }
};

// testBreakAndContinue();

const testString = () => {
  const str = "abcdef";
  for (let i of str) {
    console.log("i is ", i); // a b c d e f
  }
};

testString();
