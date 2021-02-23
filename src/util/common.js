export default {
  formatNum(num) {
    num = Number(num)
    if (num >= 1000000) {
      num = (num / 1000000).toFixed(2) + '百万';
    } else if (num >= 10000) {
      num = (num / 10000).toFixed(2) + '万';
    } else {
      num = num.toFixed(2)
    }
    return num;
  }
}