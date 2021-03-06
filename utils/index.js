const Airtable = require('airtable')
const moment = require('moment')
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID)

module.exports = {
  setColor: function(newHire) {
    return new Promise(function(resolve, reject) {
      
      let startDate = moment(new Date(newHire.get('Start Date')).setHours(0,0,0,0)).add(1, 'day') // no idea why we need to add a day
      let today = moment(new Date().setHours(0,0,0,0))
      // set color to red if past due
      // set color to orange if today
      // leave color as default if in the future
      if (startDate < today) {
        return resolve('danger')
      } else if (startDate.isSame(today)) {
        return resolve('warning')
      } else {
        return resolve('good')
      }
      
    });
  },
  
  getProjects: function(task) {
    return new Promise(function(resolve, reject) {
      
      if (task.get('Project').length > 0) {
        base('Projects').find(task.get('Project'), function(err, project) {
          if (err) { console.log(err); return reject(err); }
          return resolve(project.get('Name'))
        })
      }
      
    });
  },
  
  getPeople: function(task) {
    return new Promise(function(resolve, reject) {
      
      if (task.get('People').length > 0) {
        base('People').find(task.get('People'), function(err, people) {
          if (err) { console.log(err); return reject(err); }
          return resolve(people.get('Name'))
        })
      }
    });
  }
  
}
