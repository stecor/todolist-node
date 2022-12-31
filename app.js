const express = require('express')
const bodyParser = require('body-parser')

const app = express()
let items = ['Buy Food', 'Cook Food', 'Eat Food']
let workItems = []

// setup for ejs
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

// show the current date
app.get('/', function (req, res) {
  let today = new Date()

  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }
  // format the date and add to variable
  let day = today.toLocaleDateString('en-US', options)

  // render all res
  res.render('list', { listTitle: day, newListItems: items })
})

// add Items to the list
app.post('/', function (req, res) {
  //add item value from input to the variable
  let item = req.body.newItem

  // add item to the array
  items.push(item)

  // redirect res
  res.redirect('/')
})

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', newListItems: workItems })
})

app.post('/work', function (req, res) {
  let item = req.body.newItem
  workItems.push(item)
  res.redirect('/work')
})

app.listen(3000, function () {
  console.log('Server running on port 3000')
})
