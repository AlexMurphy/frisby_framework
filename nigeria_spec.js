var frisby = require('frisby');
frisby.create('First test')
  .get('http://services.groupkt.com/country/get/iso2code/NI')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectJSON()
  .expectJSONTypes('RestResponse', {
    messages: Array
  })
  .expectJSONTypes('RestResponse.messages.result?', {
    name: function(val) { expect(val).toMatchOrBeNull("Oklahoma City, OK"); } // Custom matcher callback

  })
.toss();