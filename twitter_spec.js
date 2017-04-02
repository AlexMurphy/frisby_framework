var frisby = require('frisby');
frisby.create('Testing the twitter api')
//Calling get method
.get('https://api.twitter.com/1/statuses/user_timeline.json?screen_name=anyname')
//Verifying expected outcomes
.expectStatus(410)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('errors.*',{
message: String,
})
.expectJSON('errors.*',{
code: 64,
message: function(val) { expect(val).toMatchOrBeNull("Oklahoma City, OK"); } // Custom matcher callback
})
.toss();