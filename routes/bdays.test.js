const callLocalApi = require('../util/callLocalApi');
const userData = {
  firstName: 'Firstname',
  lastName: 'Lastname',
  data: {
    templateId: 1234,
    testVar: 'TEST VAR',
  },
};

describe('API', () => {
  test('check template', async (done) => {
    const bdaysResp = await callLocalApi.post('/bdays', { ...userData, date: 638199918 });
    const bdaysInfoResp = await callLocalApi.get(`/bdays/${bdaysResp.data.data.id}`);
    expect(bdaysInfoResp.data).toEqual({
      data: {
        ...userData,
        date: '23/03/1990',
      },
    });

    done();
  });
});
