var frisby = require('frisby');
frisby.create('First test')
  .post('http://httpbin.org/post', [{
"id":1,
"question": 'test question?',
"answer": 'test answer'
}],
  { json: true })
  .inspectJSON()
  .expectJSONTypes({
  json: Array
  })   
  .expectJSON('json.?', {
  answer: 'test answer',
  id: 1,
  question: 'test question?'
  })
.toss();