import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import socket from "socket.io";

var io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});

var db = mongoose.connect('mongodb://localhost/userAPI');

var User = require('./models/user');

const app = express();

// var userRouter = require('./routes/routes')(User);
var userRouter = express.Router();

    app.post('/send', function(req, res){
        var message = {
            nickname: req.param('nickname', 'Anonymous'),
            text: req.param('text', '')
        };
        appendMessage(message);
        res.json({status: 'ok'});
})
    .get('/receive', function(req, res){
        callbacks.push(function(message){
        res.json(message);
  });
});

    app.post(function(req, res){
        User.findOne({ login: req.body.login })
        .then((user) => {
          user.comparePassword(password)
          .then(() => {
            res.send({
                user: user.getToken()
            })
          }).catch(()=> res.send('password not valid'))
        })
        .catch((err) => res.status(500))
        // var user = new User(req.body);
        // user.comparePassword(req.body.password).then(() => {
        //    user.save();
        //    res.send(user);
        // }).catch(() => res.status(500))
        
    })
    .get(function(req, res){

      var query = {};

      if(req.query.login){
        query.login = req.query.login;
      }
      User.find(query, function(err, users){
        if(err)
            res.status(500).send(err);
        else
            res.json(users);    
      })
    });
userRouter.route('/:userId')
    .get(function(req, res){

      User.findById(req.params.userId, function(err, user){
        if(err)
            res.status(500).send(err);
        else
            res.json(user);
      })
    });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', userRouter);

export default app;