const averageData = {
  sum: 0,
  count: 0,
  get average() {
    console.log('average run');
    return this.sum / this.count;
  }
};
function add(x, y) {
  return x + y;
}
function calcAverage(input) {
  averageData.sum = averageData.sum + input;
  averageData.count = averageData.count + 1;
  return averageData;
}
let k = averageData;

console.log(calcAverage(5));

function filterArray(arr, filterFn) {
  return arr.filter(filterFn);
}

const a = [1, 2, 3, 4, 5, 6];
console.log(filterArray(a, (a) => false));