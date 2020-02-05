class FakeModel {
  getHello() {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000, 'Привет мир!');
    });
  }
}

module.exports = new FakeModel();
