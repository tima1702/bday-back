const callLocalApi = require('../util/callLocalApi');
const userData = {
  firstName: 'Firstname',
  lastName: 'Lastname',
  data: {
    templateId: 1234,
    testVar: 'TEST VAR',
  },
};

describe('getMatchedTemplate', () => {
  test('check template', async (done) => {
    const template = {
      title: 'TITLE',
      text: 'text!@!#',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: '<!!firstName!!>This is a plain text section block.',
          },
        },
      ],
    };

    const templateResp = await callLocalApi.post('/templates', template);
    const bdaysResp = await callLocalApi.post('/bdays', { ...userData, date: 638199918 });

    const templateMatchResp = await callLocalApi.get(
      `/templates/${templateResp.data.data.id}/${bdaysResp.data.data.id}`,
    );

    template.blocks[0].text.text = `${userData.firstName}This is a plain text section block.`;
    expect(templateMatchResp.data).toEqual({
      data: {
        ...template,
        attachments: [],
      },
    });

    done();
  });
});
