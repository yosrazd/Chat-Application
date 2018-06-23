import express from 'express';

var routes = function(User){
  var userRouter = express.Router();

userRouter.route('/')
    .post(function(req, res){
        var user = new User(req.body);

        user.save();
        res.send(user);
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
return userRouter;
};

export default routes;
    