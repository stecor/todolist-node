const express = require('express')
const bodyParser = require('body-parser')

const app = express()
var items = []

// setup for ejs
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

// show the current date
app.get('/', function (req, res) {
  var today = new Date()

  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }
  // format the date and add to variable
  var day = today.toLocaleDateString('en-US', options)

  // render all res
  res.render('list', { kindOfDay: day, newListItems: items })
})

// add Items to the list
app.post('/', function (req, res) {
  //add item value from input to the variable
  var item = req.body.newItem

  // add item to the array
  items.push(item)

  // redirect res
  res.redirect('/')
})

app.listen(3000, function () {
  console.log('Server running on port 3000')
})
