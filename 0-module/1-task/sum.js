function sum(a, b) {
  if ((typeof a && typeof b) === "number") {
    return (a + b);
  } else {
    throw TypeError();
  }
}
module.exports = sum;
