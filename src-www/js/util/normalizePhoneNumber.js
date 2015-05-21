let log = (...args) => {
  console.log('[normalizePhoneNumber]', ...args);
}

export default (number) => {
  number = number.replace(/[- ~!@#$%^&*()_+=,.\/\\]/g, '');
  number = number.replace(/^886/, '0');
  if (number.length === 10) {
    let tmp = [];
    tmp.push(number.slice(0, 4));
    tmp.push(number.slice(4, 7));
    tmp.push(number.slice(7, 10));
    number = tmp.join('-');
  }
  return number;
};
