const router = require('express').Router();
const mongoose = require('mongoose');

const transSchema = mongoose.Schema({
    recipientID:Number,
    senderID:Number,
    senderBalance:Number,
    transAmount:Number,
    Date:String,
    dateOnly:String
  });

const usersSchema = mongoose.Schema({
    Image:String,
    name:String,
    id:Number,
    balance:Number
  });

const requestSchema = mongoose.Schema({
  from:Number,
  to:Number,
  amount:Number,
  Date:String,
  dateOnly:String
})
const Trans = mongoose.model('Trans', transSchema);
const Users = mongoose.model('Users', usersSchema);
const Request = mongoose.model('Request', requestSchema);

router.route('/').get((req, res)=>{
    
    Users.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
    
  });

router.route('/:id').get((req,res) => {
    
    Trans.find({$or:[{senderID:req.params.id},{recipientID:req.params.id}]}).sort({dateOnly:-1,Date:-1})
       .then(transaction => {
         data1 = transaction
        Users.findOne({id:req.params.id})
          .then(data => {
            Request.find({from:req.params.id}).sort({dateOnly:-1,Date:-1})
            .then(request =>{
              res.json({user:data,trans:data1,requests:request});
            })
            .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));})
       .catch(err => res.status(400).json('Error: ' + err));
       
});

router.route('/pay').post((req,res) => {
  
  Users.findOne({id:Number(req.body.recipientID)},function(err,found){
    if(!err){
      const recipientBalance = Number(req.body.transAmount) + found.balance
      Users.findOneAndUpdate({id:req.body.recipientID},{$set:{balance:recipientBalance}},{
        returnOriginal: false
      },function(err){
        if(err){
          console.log("unsuccessful");
        }
        
      });
    }else{
      console.log(err)
    }
  })
  const balance = Number(req.body.senderBalance) - Number(req.body.transAmount);
  const trans = new Trans({
    recipientID:Number(req.body.recipientID),
    senderID:Number(req.body.senderID),
    senderBalance:balance,
    transAmount:Number(req.body.transAmount),
    Date:req.body.Date,
    dateOnly:req.body.dateOnly
  })
  trans.save();
  Users.findOneAndUpdate({id:trans.senderID},{$set:{balance:balance}},{
    returnOriginal: false
  },function(err){
    if(err){
      console.log("unsuccessful1");
    }
    
  });
})

router.route('/request').post((req,res)=>{
  const request = new Request({
    from:Number(req.body.from),
    to:Number(req.body.to),
    amount:Number(req.body.amount),
    Date:req.body.Date,
    dateOnly:req.body.dateOnly,
    
  });
  request.save();
  console.log(request)
});



  
  


module.exports = router