const asyncWrapper = async (fn, error) => {
  try {
    return await fn;
  } catch (e) {
    throw error;
  }
};

module.exports = asyncWrapper;
