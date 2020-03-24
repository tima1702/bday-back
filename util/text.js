function firstLetterUpperCase(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

function compositeLetterUpperCase(str) {
  const arr = str.split('-');
  if (arr.length > 1) {
    return arr.map((word) => firstLetterUpperCase(word)).join('-');
  }

  return firstLetterUpperCase(str);
}

module.exports = {
  firstLetterUpperCase,
  compositeLetterUpperCase,
};
