const templates = require('./templates');

const userData = {
  firstName: 'Firstname',
  lastName: 'Lastname',
  data: {
    templateId: 1234,
    testVar: 'TEST VAR',
  },
};

describe('changeTemplateVariable', () => {
  const strBefore =
    'Looks <!!firstName!!> like<!!lastName!!> you <!!data.templateId!!>have<!!data.testVar!!> a scheduling<!!data.TEST!!> conflict with this event:';
  const strAfter = `Looks ${userData.firstName} like${userData.lastName} you ${userData.data.templateId}have${userData.data.testVar} a scheduling conflict with this event:`;
  const strAfterUserDataEmpty = 'Looks  like you have a scheduling conflict with this event:';

  test('userData', () => {
    expect(templates.changeTemplateVariable(strBefore, userData)).toEqual(strAfter);
  });

  test('userDataEmpty', () => {
    expect(templates.changeTemplateVariable(strBefore)).toEqual(strAfterUserDataEmpty);
    expect(templates.changeTemplateVariable(strBefore, null)).toEqual(strAfterUserDataEmpty);
    expect(templates.changeTemplateVariable(strBefore, undefined)).toEqual(strAfterUserDataEmpty);
    expect(templates.changeTemplateVariable(strBefore, {})).toEqual(strAfterUserDataEmpty);
    expect(templates.changeTemplateVariable(strBefore, [])).toEqual(strAfterUserDataEmpty);
  });
});

describe('templateBlock', () => {
  const beforeBlocks = JSON.parse(
    `[{"type":"section","text":{"type":"plain_text","emoji":true,"text":"Looks <!!firstName!!> like<!!lastName!!> you <!!data.templateId!!>have<!!data.testVar!!> a scheduling<!!data.TEST!!> conflict with this event:"}},{"type":"divider"},{"type":"section","text":{"type":"mrkdwn","text":"*<fakeLink.toUserProfiles.com|Iris / Zelda 1-1>*\\nTuesday, January 21 4:00-4:30pm\\nBuilding 2 - Havarti Cheese (3)\\n2 guests"},"accessory":{"type":"image","image_url":"https://api.slack.com/img/blocks/bkb_template_images/notifications.png","alt_text":"calendar thumbnail"}},{"type":"context","elements":[{"type":"image","image_url":"https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png","alt_text":"notifications warning icon"},{"type":"mrkdwn","text":"*Conflicts with Team Huddle: 4:15-4:30pm*"}]},{"type":"divider"},{"type":"section","text":{"type":"mrkdwn","text":"*Propose a new time:*"}},{"type":"section","text":{"type":"mrkdwn","text":"*Today - 4:30-5pm*\\nEveryone is available: @iris, @zelda"},"accessory":{"type":"button","text":{"type":"plain_text","emoji":true,"text":"Choose"},"value":"click_me_123"}},{"type":"section","text":{"type":"mrkdwn","text":"*Tomorrow - 4-4:30pm*\\nEveryone is available: @iris, @zelda"},"accessory":{"type":"button","text":{"type":"plain_text","emoji":true,"text":"Choose"},"value":"click_me_123"}},{"type":"section","text":{"type":"mrkdwn","text":"*Tomorrow - 6-6:30pm*\\nSome people aren't available: @iris, ~@zelda~"},"accessory":{"type":"button","text":{"type":"plain_text","emoji":true,"text":"Choose"},"value":"click_me_123"}},{"type":"section","text":{"type":"mrkdwn","text":"*<fakelink.ToMoreTimes.com|Show more times>*"}},{"type":"section","text":{"type":"plain_text","text":"This is a plain text section block.","emoji":true}},{"type":"image","title":{"type":"plain_text","text":"Example Image","emoji":true},"image_url":"https://api.slack.com/img/blocks/bkb_template_images/goldengate.png","alt_text":"Example Image"},{"type":"context","elements":[{"type":"mrkdwn","text":"For more info, contact <support@acme.inc>"}]},{"type":"divider"},{"type":"actions","elements":[{"type":"conversations_select","placeholder":{"type":"plain_text","text":"Select a conversation","emoji":true}},{"type":"channels_select","placeholder":{"type":"plain_text","text":"Select a channel","emoji":true}},{"type":"users_select","placeholder":{"type":"plain_text","text":"Select a user","emoji":true}},{"type":"static_select","placeholder":{"type":"plain_text","text":"Select an item","emoji":true},"options":[{"text":{"type":"plain_text","text":"Excellent item 1","emoji":true},"value":"value-0"},{"text":{"type":"plain_text","text":"Fantastic item 2","emoji":true},"value":"value-1"},{"text":{"type":"plain_text","text":"Nifty item 3","emoji":true},"value":"value-2"},{"text":{"type":"plain_text","text":"Pretty good item 4","emoji":true},"value":"value-3"}]}]},{"type":"section","text":{"type":"mrkdwn","text":"You can add an image next to text in this block."},"accessory":{"type":"image","image_url":"https://api.slack.com/img/blocks/bkb_template_images/plants.png","alt_text":"plants"}},{"type":"section","text":{"type":"mrkdwn","text":"You can add a button alongside text in your message. "},"accessory":{"type":"button","text":{"type":"plain_text","text":"Button","emoji":true},"value":"click_me_123"}},{"type":"section","text":{"type":"mrkdwn","text":"Pick an item from the dropdown list"},"accessory":{"type":"static_select","placeholder":{"type":"plain_text","text":"Select an item","emoji":true},"options":[{"text":{"type":"plain_text","text":"Choice 1","emoji":true},"value":"value-0"},{"text":{"type":"plain_text","text":"Choice 2","emoji":true},"value":"value-1"},{"text":{"type":"plain_text","text":"Choice 3","emoji":true},"value":"value-2"}]}},{"type":"section","text":{"type":"mrkdwn","text":"Pick one or more items from the list"},"accessory":{"type":"multi_static_select","placeholder":{"type":"plain_text","text":"Select items","emoji":true},"options":[{"text":{"type":"plain_text","text":"Choice 1","emoji":true},"value":"value-0"},{"text":{"type":"plain_text","text":"Choice 2","emoji":true},"value":"value-1"},{"text":{"type":"plain_text","text":"Choice 3","emoji":true},"value":"value-2"}]}},{"type":"section","text":{"type":"mrkdwn","text":"This block has an overflow menu."},"accessory":{"type":"overflow","options":[{"text":{"type":"plain_text","text":"Option 1","emoji":true},"value":"value-0"},{"text":{"type":"plain_text","text":"Option 2","emoji":true},"value":"value-1"},{"text":{"type":"plain_text","text":"Option 3","emoji":true},"value":"value-2"},{"text":{"type":"plain_text","text":"Option 4","emoji":true},"value":"value-3"}]}},{"type":"section","text":{"type":"mrkdwn","text":"Pick a date for the deadline."},"accessory":{"type":"datepicker","initial_date":"1990-04-28","placeholder":{"type":"plain_text","text":"Select a date","emoji":true}}},{"type":"section","fields":[{"type":"plain_text","text":"*this is plain_text text*","emoji":true},{"type":"plain_text","text":"*this is plain_text text*","emoji":true},{"type":"plain_text","text":"*this is plain_text text*","emoji":true},{"type":"plain_text","text":"*this is plain_text text*","emoji":true},{"type":"plain_text","text":"*this is plain_text text*","emoji":true}]}]`,
  );

  const afterBlocks = [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        emoji: true,
        text: `Looks ${userData.firstName} like${userData.lastName} you ${userData.data.templateId}have${userData.data.testVar} a scheduling conflict with this event:`,
      },
    },
    ...beforeBlocks.slice(1),
  ];

  const afterBlocksEmptyUserData = [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        emoji: true,
        text: `Looks  like you have a scheduling conflict with this event:`,
      },
    },
    ...beforeBlocks.slice(1),
  ];

  const timeStart = new Date().getTime();

  test('timeout', () => {
    beforeBlocks.forEach((block) =>
      expect(() => templates.templateBlock(block, userData, timeStart, 0)).toThrowError('timeout'),
    );
  });

  test('userData', () => {
    beforeBlocks.forEach((block, i) =>
      expect(templates.templateBlock(block, userData, timeStart, 5000)).toEqual(afterBlocks[i]),
    );
    expect(beforeBlocks.map((block) => templates.templateBlock(block, userData, timeStart, 5000))).toEqual(afterBlocks);
  });

  test('userDataEmpty', () => {
    expect(beforeBlocks.map((block) => templates.templateBlock(block, {}, timeStart, 5000))).toEqual(
      afterBlocksEmptyUserData,
    );
    expect(beforeBlocks.map((block) => templates.templateBlock(block, null, timeStart, 5000))).toEqual(
      afterBlocksEmptyUserData,
    );
    expect(beforeBlocks.map((block) => templates.templateBlock(block, undefined, timeStart, 5000))).toEqual(
      afterBlocksEmptyUserData,
    );
    expect(beforeBlocks.map((block) => templates.templateBlock(block, 1, timeStart, 5000))).toEqual(
      afterBlocksEmptyUserData,
    );
    expect(beforeBlocks.map((block) => templates.templateBlock(block, '', timeStart, 5000))).toEqual(
      afterBlocksEmptyUserData,
    );
    expect(beforeBlocks.map((block) => templates.templateBlock(block, [], timeStart, 5000))).toEqual(
      afterBlocksEmptyUserData,
    );
  });
});
