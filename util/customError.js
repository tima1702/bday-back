class CustomErrorExtends extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

function getError(type, str) {
  const obj = { type };
  if (str) obj.data = { details: [str] };
  return new CustomErrorExtends(JSON.stringify(obj));
}

class CustomError {
  create(str) {
    return getError('error create', str);
  }

  query(str) {
    return getError('error query', str);
  }

  delete(str) {
    return getError('error delete', str);
  }

  update(str) {
    return getError('error update', str);
  }

  timeout(str) {
    return getError('error timeout', str);
  }

  notMofify(str) {
    return getError('not modify', str);
  }

  notFound(str) {
    return getError('not found', str);
  }
}

module.exports = new CustomError();
