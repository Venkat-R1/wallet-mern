const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
// app.use(express.static(path.join(__dirname, 'wallet/public')));
//app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/wallet/public/index.html'));})
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect("mongodb+srv://venkat:Just4fun@cluster0.hhwpl.mongodb.net/Wallet?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersSchema = mongoose.Schema({
  Image:String,
  name:String,
  id:Number
});

const transSchema = mongoose.Schema({
  recipient:String,
  Sender:String,
  Amount:Number,
  Date:String,
})
  
const Users = mongoose.model('Users', usersSchema)


app.get('/users',(req, res)=>{
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
