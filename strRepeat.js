function repeat(s, n) {
  return (new Array(n + 1)).join(s);
}

function repeat(s, n) {
  return (n > 0) ? s.concat(repeat(s, --n)) : "";
}
