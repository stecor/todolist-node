const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/', function (req, res) {
  var today = new Date()
  var currentDay = today.getDay()

  if (currentDay === 6 || currentDay === 0) {
    res.send('It is weekend')
  } else {
    res.send('It is work day ' + currentDay)
  }
})

app.listen(3000, function () {
  console.log('Server running on port 3000')
})
