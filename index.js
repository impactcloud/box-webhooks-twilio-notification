var express = require('express'),
    app = express(),
    twilio = require(twilio),
    accountSid = '',
    authToken = '',
    BoxSDK = require('box-node-sdk');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/create_webhook', function(request, response){
  var sdk = new BoxSDK({
    clientID: '',
    clientSecret: ''
  });

  var client = sdk.getBasicClient('');

  client.webhooks.create('', client.itemTypes.FILE, '', [client.webhooks.triggerTypes.FILE.UPLOADED], function(err, data){
    if(err){
      console.log('Failed to create Box Webhook successfully');
    }
  });
});

app.get('/send_sms', function(request, response) {
  var client = new twilio(accountSid, authToken);
  
  client.messages.create({
      body: 'Volunteer Form Update',
      to: '6504171570',  // Text this number
      from: '+12345678901' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
