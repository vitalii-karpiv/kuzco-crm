function prettifyNumber(num) {
  num = parseFloat(num);
  if (num > 999) {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return num.toFixed(2);
}

export { prettifyNumber };
