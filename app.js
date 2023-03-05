const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {connectToDb,getDb}=require('./db')
//const date = require(__dirname + '/date.js')



const app = express()

// setup for ejs
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

// const items = ['Buy Food', 'Cook Food', 'Eat Food']
// const workItems = []


// create new database - connection
mongoose.connect('mongodb://localhost:27017/todolistDB'{useNewUrlParser:true},  (err) => {
  if(err) console.log(err) 
  else console.log("mongdb is connected");
 })



// create schema database

const itemsSchema = {
  name: String
}

const Item = mongoose.model('Item', itemsSchema)

// create new records

// const item1 = new Item({
//   name: 'Welcome to your todo list!'
//   })

// const item2 = new Item({
//   name: 'Hit the + button!'
// })

// const item3 = new Item({
//   name: 'Hit the delete button!' 
//     })

const defaultItems = [{name: 'Welcome to your todo list!'},{name: 'Hit the + button!'},{name: 'Hit the delete button!'}]


// insert records into database



Item.bulkWrite([
  {
    insertOne: {
      document: {
        name: 'Welcome to your todo list!',    
      }
    }
  }]).then(res => {
    // Prints "1 1 1"
    console.log(res.insertedCount);
   });






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
