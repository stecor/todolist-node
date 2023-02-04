const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//const date = require(__dirname + '/date.js')

// setup for ejs
app.set('view engine', 'ejs')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

// const items = ['Buy Food', 'Cook Food', 'Eat Food']
// const workItems = []


// create new database - connection
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true })

// create schema database

const itemsSchema = {
  name:String
}

const Item = mongoose.model('Item', itemsSchema)

// create new records







// show the current date
app.get('/', function (req, res) {
 // const day = date.getDay()
  // render all res
  res.render('list', { listTitle: 'Today', newListItems: items })
})

// add Items to the list
app.post('/', function (req, res) {
  console.log(req.body)
  //add item value from input to the variable
  const item = req.body.newItem
  if (req.body.list === 'Work List' && item !== '') {
    // add item to the workItems array
    workItems.push(item)
    // redirect res to work
    res.redirect('/work')
  } else if (item !== '') {
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
