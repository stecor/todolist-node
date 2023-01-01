const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')

const app = express()
let items = ['Buy Food', 'Cook Food', 'Eat Food']
let workItems = []

// setup for ejs
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

// show the current date
app.get('/', function (req, res) {
  let day = date.getDay()
  // render all res
  res.render('list', { listTitle: day, newListItems: items })
})

// add Items to the list
app.post('/', function (req, res) {
  console.log(req.body)
  //add item value from input to the variable
  let item = req.body.newItem
  if (req.body.list === 'Work List') {
    // add item to the workItems array
    workItems.push(item)
    // redirect res to work
    res.redirect('/work')
  } else {
    // add item to the items array
    items.push(item)
    // redirect res to root
    res.redirect('/')
  }
})

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', newListItems: workItems })
})

app.get('/about', function (req, res) {
  res.render('about')
})

app.listen(3000, function () {
  console.log('Server running on port 3000')
})
