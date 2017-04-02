var frisby = require('frisby');
frisby.create('GET JSON data with parameters')
  .post('http://httpbin.org/post',{ username: "a_test_user", 
    	password: 'a_test_password' },
    { json: true },
    { headers: { 'Content-Type': 'application/json' }})
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json')
  // .expectJSONTypes({
  //   token: String
  }
  .afterJSON(function (res) {
    /* include auth token in the header of all future requests */
    frisby.globalSetup({
      request: { 
        headers: { 'x-access-token': res.token }
      }
    });

    frisby.create('GET data requiring token authentication')
      .get('https://some.url/rest/data')
      .expectStatus(200)
      .expectHeader('Content-Type', 'application/json')
      .expectJSON({ /* whatever data you expect */ })
    .toss();

    /*
      however many more test cases you want to run using
      the authentication token
    */
  })
.toss()