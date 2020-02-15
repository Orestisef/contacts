const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = express.Router();
const PORT = 5000;

let Contact = require('./model');



app.use(cors());
app.use(bodyParser.json());

//init db local connection
mongoose.connect('mongodb://127.0.0.1:27017/contacts', { useNewUrlParser: true });
const connection = mongoose.connection;

//callback when connection via mongodb is open
connection.once('open', () => {
  console.log('---> Connection with mongodb was sucesfully');
});

//set configuration route
contactRoutes.route('/').get((req, res) => {
  Contact.find(function(err, contacts){
    if (err) {
      console.log(err);
    } else {
      res.json(contacts);
    }
  }).sort({'contact_name': 1}); //short contacts by name
});

contactRoutes.route('/:id').get((req, res)=>{
  let id = req.params.id;
  Contact.findById(id, (err, contact) =>{
      res.json(contact);
  });
});

contactRoutes.route('/add').post((req, res)=>{
  //create a new object and added to db
  let contact = new Contact(req.body);
  contact.save()
         .then(contact => {
           res.status(200).json({'contact': 'contact added successfully'});
         })
         .catch(err => {
           res.status(400).send('adding new contact faild!');
         })
});
//update single contact
contactRoutes.route('/update/:id').post((req, res)=>{
  Contact.findById(req.params.id, (err, contact)=>{
    if (!contact) {
      res.status(400).send('data is not found!');
    } else {
      contact.contact_name = req.body.contact_name;
      contact.contact_email = req.body.contact_email;
      contact.contact_address = req.body.contact_address;
      contact.contact_phone = req.body.contact_phone;

      contact.save().then((contact) => {
        res.json('Contact updated');
      })
      .catch( (err) => {
        res.status(400).send('Update not posible!');
      })
    }
  });
});

// Defined delete | remove | destroy route
contactRoutes.route('/delete/:id').get((req, res)=>{
    Contact.findOneAndDelete({_id: req.params.id}, (err, contact)=>{
        if (err){
          res.json(err);
        } else {
          res.json('Successfully removed');
        }
    });
});



//router
app.use('/contacts', contactRoutes);

app.listen(PORT, () => {
  console.log('---> Server is running on PORT: ' + PORT);
});
