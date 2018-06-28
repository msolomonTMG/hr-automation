const request = require('request')

module.exports = {
  sendStartDateChangedWebhook: function(data) {
    return new Promise(function(resolve, reject) {
      
      let options = {
        method: 'post',
        body: data,
        json: true,
        url: process.env.ZAPIER_START_DATE_ENDPOINT
      }
      
      request(options, function(err, response, body) {
        if (err) { console.log(err); return reject(err); }
        return resolve(body)
      })
      
    });
    
  },
  sendNewHiresStartingTodayWebhook: function(data) {
    return new Promise(function(resolve, reject) {
      
      let options = {
        method: 'post',
        body: data,
        json: true,
        url: process.env.ZAPIER_TODAYS_NEW_HIRES_ENDPOINT
      }
      
      request(options, function(err, response, body) {
        if (err) { console.log(err); return reject(err); }
        return resolve(body)
      })
      
    });
    
  },
  
  
}
