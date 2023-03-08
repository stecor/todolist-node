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
mongoose.connect('mongodb+srv://admin-stefano:120519@cluster0.hjmugum.mongodb.net/todolistDB',{useNewUrlParser:true},  (err) => {
  if(err) console.log(err) 
  else console.log("mongdb is connected");
 })



// create schema database

const itemsSchema = {
  name: String
}

const Item = mongoose.model('Item', itemsSchema)

// create new records

const item1 = new Item({
  name: 'Welcome to your todo list!'
  })

const item2 = new Item({
  name: 'Hit the + button!'
})

const item3 = new Item({
  name: 'Hit the delete button!' 
    })

const defaultItems = [item1,item2,item3]






// show the current date
app.get('/', function (req, res) {
 // const day = date.getDay()
  // render all res
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      // insert records into database

      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      })
      res.redirect('/')
    } else {
      res.render('list', { listTitle: 'Today', newListItems: foundItems })
    }
   
  })
  
})

// add Items to the list
app.post('/', function (req, res) {

  const itemName = req.body.newItem
  const item = new Item({
    name: itemName
  })
  item.save()
  res.redirect('/')
})


//delete Items from list
app.post('/delete', function (req, res) {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
    }
  })
  res.redirect('/')
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
