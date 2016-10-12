var apn = require('apn');
var request = require('request');
var prompt = require('prompt');
var config = require('./config.json');

function sendIosNotification(title, text) {
  var apnProvider = new apn.Provider({ token: config.ios.token, production: config.ios.production });
  var note = new apn.Notification();
  note.alert = title;
  note.badge = 0;
  note.payload = {'messageFrom': text};
  note.topic = config.ios.appId;
  apnProvider.send(note, config.ios.deviceTokens).then(function(res) {
    console.log('APNS:');
    console.log(res);
  });
}

function sendAndroidNotification(title, text) {
  var options = {
    method: 'POST',
    uri: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      'Authorization': config.android.authKey,
      'Content-Type': 'application/json'
    },
    json: {
      'notification': { 'title': title, 'text': text },
      'registration_ids' : config.android.deviceTokens
    }
  };
  request(options, function(err, res, bodyString) {
    console.log('FCM:');
    if (err) {
      console.log(err);
    } else {
      console.log(bodyString);
    }
  });
}

var schema = {
  properties: {
    title: {
      description: 'Notification title',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Title must be only letters, spaces, or dashes',
      required: true,
      default: 'Notification title'
    },
    text: {
      description: 'Notification text',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Text must be only letters, spaces, or dashes',
      required: true,
      default: 'Notification text'
    },
    ios: {
      description: 'Send to iOS?(y/n)',
      pattern: /(^y$)|(^n$)/,
      message: 'Answer with y or n',
      required: true
    },
    android: {
      description: 'Send to Android?(y/n)',
      pattern: /(^y$)|(^n$)/,
      message: 'Answer with y or n',
      required: true
    }
  }
};
prompt.start();
prompt.get(schema, function (err, result) {
  console.log('Sending notification:');
  console.log(result.title);
  console.log(result.text);
  if (result.ios === 'y') {
    sendIosNotification(result.title, result.text);
  }
  if (result.android === 'y') {
    sendAndroidNotification(result.title, result.text);
  }
});
