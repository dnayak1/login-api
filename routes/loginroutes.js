var dbconnection = require('../dbconnection');
var connection = dbconnection.connection;
var jwt = require('jsonwebtoken');
var message;

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;

  connection.query('SELECT * FROM User WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    message = "error occured";
    res.send({
      "code":400,
      "message":message
    })
  }else{
    console.log(results);
    if(results.length > 0){
      if(results[0].password == password){
        var user = {
          "email":results[0].email,
          "firstName":results[0].firstName,
          "lastName":results[0].lastName
        };
        console.log(user);
        message = "login sucessfull";
        var token = jwt.sign(user, 'superSecret');
        res.send({
          "code":200,
          "message":message,
          "token":token
            });
      }
      else{
        message = "email and password does not match";
        res.send({
          "code":400,
          "message":message
            });
      }
    }
    else{
      message="email does not exits";
      res.send({
        "code":400,
        "message":message
          });
    }
  }
  });
};
