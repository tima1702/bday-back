class CustomError {
  create() {
    return new Error('error create');
  }

  query() {
    return new Error('error query');
  }

  delete() {
    return new Error('error delete');
  }

  update() {
    return new Error('error update');
  }

  timeout() {
    return new Error('error timeout');
  }

  notMofify() {
    return new Error('not modify');
  }

  notFound() {
    return new Error('not found');
  }
}

module.exports = new CustomError();
