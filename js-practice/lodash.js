// 只是试一下 throttle 和 debounce

const fn = () => {};

const fn1 = throttle(fn, 50);

const throttle = (fn, duration) => {
  const timer = null;
  return function () {
    // 这个function也是可以注入arguments的哦
    const context = this;
    const args = arguments;
    if (!timer) {
      fn().apply(context, args);
      timer = setTimeout(() => {
        timer = null;
      }, duration);
    }
  };
};

const fn2 = debounce(fn, 50);

const debounce = (fn, duration) => {
  const timer = null;
  return function () {
    const context = this;
    const args = arguments;
    // 停止触发 且 duration 后执行
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn().apply(context, args);
    }, duration);
  };
};
