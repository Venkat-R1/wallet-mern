const mongoose  = require('mongoose');
const router = require('express').Router();



const transSchema = mongoose.Schema({
    recipientID:Number,
    senderID:Number,
    senderBalance:Number,
    transAmount:Number,
    Date:String
  });
const Trans = mongoose.model('Trans', transSchema);

router.route('/').get((res,req) =>{
    Trans.find({})
});