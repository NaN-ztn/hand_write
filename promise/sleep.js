export function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration, `sleep ${duration}`);
  });
}

// 可用生成器实现
