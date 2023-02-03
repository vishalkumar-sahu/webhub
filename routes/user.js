const express = require("express");
const app = express();
const router = express.Router();

const mongoose = require('mongoose');

const requirelogin = require('../middleware/requirelogin')
const Post = mongoose.model('Post')
const User = mongoose.model('Users')

router.get('/user/:id', requirelogin, (req, res)=>{
    User.findOne({_id : req.params.id})
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy", "_id name username pic")
        .exec((err, posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user, posts})
        })
    })
    .catch(err=>{
        return res.status(404).json({error:"User not found !!"})
    })
})

router.post('/profile/profilePic', requirelogin, (req, res)=>{
    const {url} = req.body
    // console.log(req.user)
    if(!url){
        return res.status(422).json({error:"Please add the Profile pic"})
    }

    // req.user.password = undefined
    User.findByIdAndUpdate(req.user._id,{
        $set:{pic : url}
    }, {new : true}).select("-password")
    .then(result =>{
        res.json(result)
    })
    .catch(err =>{
        return res.status(422).json({error : err})
    })
})



module.exports = router