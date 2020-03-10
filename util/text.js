function firstLetterUpperCase(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

module.exports = {
  firstLetterUpperCase,
};
