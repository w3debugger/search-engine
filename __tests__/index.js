const searchEngine = require('../index');
const users = require(`${__dirname}/users.json`);

test('search within the whole JSON', () => {
  const expectedFieldValue = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "nationalities": [
        "ir"
      ],
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "tags": [
        "Programmer",
        "Entrepreneur",
        "Writer",
        "Political Organizer",
        "Internet Hacktivist"
      ],
      "company": [
        {
          "name": "Romaguera-Crona 1",
          "catchPhrase": "Multi-layered client-server neural-net 1",
          "bs": "harness real-time e-markets 1"
        }, {
          "name": "Romaguera-Crona 2",
          "catchPhrase": "Multi-layered client-server neural-net 2",
          "bs": "harness real-time e-markets 2"
        }, {
          "name": "Romaguera-Crona 3",
          "catchPhrase": "Multi-layered client-server neural-net 3",
          "bs": "harness real-time e-markets 3"
        }
      ]
    }
  ];

  const searchKeywords = [
    "Leanne Graham", // search in level 1
    "hildegard.org", // search in level 2
    "Political Organizer", // search in simple array
    "Romaguera-Crona 2" // search in array of object
  ]

  searchKeywords.forEach(testItem => {
    const actualFieldValue = searchEngine(users, testItem);

    expect(actualFieldValue).toEqual(expectedFieldValue);
  });
});

test('search by value by specific key within JSON', () => {
  const expectedFieldValue = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "nationalities": [
        "ir"
      ],
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "tags": [
        "Programmer",
        "Entrepreneur",
        "Writer",
        "Political Organizer",
        "Internet Hacktivist"
      ],
      "company": [
        {
          "name": "Romaguera-Crona 1",
          "catchPhrase": "Multi-layered client-server neural-net 1",
          "bs": "harness real-time e-markets 1"
        }, {
          "name": "Romaguera-Crona 2",
          "catchPhrase": "Multi-layered client-server neural-net 2",
          "bs": "harness real-time e-markets 2"
        }, {
          "name": "Romaguera-Crona 3",
          "catchPhrase": "Multi-layered client-server neural-net 3",
          "bs": "harness real-time e-markets 3"
        }
      ]
    }
  ];

  const searchKeywords = [
    "@name:Leanne Graham", // search in level 1
    "@city:Gwenborough", // search in level 2
    "@bs:harness real-time e-markets 2", // search in array
    "@nationalities:ir" // search in array
  ]

  searchKeywords.forEach(testItem => {
    const actualFieldValue = searchEngine(users, testItem);

    expect(actualFieldValue).toEqual(expectedFieldValue);
  });
});

test('If nothing found', () => {
  const expectedFieldValue = [];

  const searchKeywords = [
    "EmptyField",
    "@missingField:Leanne Graham"
  ]

  searchKeywords.forEach(testItem => {
    const actualFieldValue = searchEngine(users, testItem);

    expect(actualFieldValue).toEqual(expectedFieldValue);
  });
});
