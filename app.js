var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();
var express = require('express'); 
var session = require('express-session');
var app = express();
var morgan = require('morgan');
var qstring = require('querystring');

//student name and number information
var stuInfo = [];

//questions and correct answers information
var questions = [];
//stores the already completed test results
var testResults = [];

//connects to the mongo data base
mongo.connect("mongodb://localhost:27017/", function(err, db){
  if(err) console.log('FAILED TO CONNECT TO DATABASE: ' + err);
  else{
    //gets the student info from the stuInfo collection
    var dataBase = db.db("dbExam");
    console.log('CONNECTED TO DATABASE');
    dataBase.collection("stuInfo", function(err, collection){
      if (err) console.log("FAILED TO CONNECT TO stuInfo: " + err);
      else {
        var cursor = collection.find();
        cursor.each(function(err, data){
          if (err) console.log("stuInfo traversal error: " + err);
          else {
            if (data !== null) stuInfo.push(data);
          }
        });
      }
	  });

    //gets the questions from the questions collection
    dataBase.collection("questions", function(err, collection){
      if (err) console.log("FAILED TO CONNECT TO questions: " + err);
      else {
        var cursor = collection.find();
        cursor.each(function(err, data){
          if (err) console.log("questions traversal error: " + err);
          else {
            if (data !== null) questions.push(data);
          }
        });
      }
	  });

    //gets the test results from the restResults collection
    dataBase.collection("testResults", function(err, collection){
      if (err) console.log("FAILED TO CONNECT TO testResults: " + err);
      else {
        var cursor = collection.find();
        cursor.each(function(err, data){
          if (err) console.log("testResults traversal error: " + err);
          else {
            if (data !== null) testResults.push(data);
          }
        });
      }
	  });


    //renders the login page
    function login(req, res, next){
      var sess = req.session;
      loginPage(res, false);
    }

    //student authentication
    function authenticate(req, res, next){
      var sess = req.session;
      var authorization = false;
      //checks if the student name and number entered by the user match the ones in the data base
      for (var i in stuInfo){
        if (sess.data.name === stuInfo[i].name && sess.data.stuNum === stuInfo[i].stuNum){ 
          console.log("Student: " + sess.data.name + " - " + sess.data.stuNum + ", has loged in");
          authorization = true;
        }
      } 

      if (authorization) next();
      //if the name of number don't match rerenders the login page (with invalid name or number)
      else{
        console.log("Student: " + sess.data.name + " - " + sess.data.stuNum + ", tried to login");

        loginPage(res, true);
      }
    }

    //writes the login page
    function loginPage(res, incorrect){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<!DOCTYPE html>');
      res.write('<html>');
      res.write('<head><title>Mid Term</title></head>');
      res.write('<body>');
      res.write('<h1>Online Exam Services</h1>');
      res.write('<hr>');
      res.write('<form action="login" method="post">');
      res.write('<fieldset>');
      res.write('<legend>Login Information:</legend>');
      res.write('Student Name:<br>');
      res.write('<input type="text" name="name">');
      res.write('<br>');
      res.write('Student Number:<br>');
      res.write('<input type="password" name="stuNum">');
      res.write('<br>');
      if (incorrect) res.write('Invalid Student name or Student number');
      res.write('<br>');
      res.write('<input type="submit" value="Login">');
      res.write('</fieldset>');
      res.write('</form>');
      res.write('</body>');
      res.write('<hr>');
      res.write('<h1>Carleton University</h1>');
      res.write('<hr>');
      res.write('<h4>Author: Alex Patel, Company: Patel Brothers, Copywrite@2015</h4>');
      res.write('</html>');
      res.end();
    }

    //creates the header for the pages
    function header(req, res, next){
      var sess = req.session;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<!DOCTYPE html>');
      res.write('<html>');
      res.write('<head><title>Mid Term</title></head>');
      res.write('<h1>Online Exam Services</h1>');
      res.write('<hr>');
      next();
    }

    //creates the exam introduction page
    function introPage(req, res, next){
      var sess = req.session;
      //if the page should be displayed
      if (sess.data.index === -1){
        res.write('<body>');
        res.write('<h4>Welcome to the Universities Online test servers</h4>');
        res.write('<h4>Choose the option that best applies the situation</h4>');
        res.write('<h4>Take your time and read the questions thoroughly</h4>');
        res.write('<h4>Click the start button to start the exam</h4>');
        res.write('<h4>Good Luck!</h4>');
        res.write('<form action="next" method="post">');
        res.write('<input type="submit" value="Start">');
        res.write('</form>');
        res.write('</body>');
      }
      next();
    }

    //creates the questions page
    function body(req, res, next){
      var sess = req.session;
      // the page should be displayed
      if (sess.data.index > -1 && sess.data.index < questions.length){
        res.write('<body>');
        res.write('<h4>' + questions[sess.data.index].question + '</h4>');
        res.write('<form id="form" action="selectAnswer" method="post">');
        res.write('<fieldset>');
        res.write('<legend>Select an answer:</legend>');
        res.write('<br>');
        //remembers the radio buttons clicked
        if (sess.data.answers[sess.data.index] !== undefined && sess.data.answers[sess.data.index] === "A") res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="A"checked>' + questions[sess.data.index].answers[0] + '<br>');
        else res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="A">' + questions[sess.data.index].answers[0] + '<br>');
        if (sess.data.answers[sess.data.index] !== undefined && sess.data.answers[sess.data.index] === "B") res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="B"checked>' + questions[sess.data.index].answers[1] + '<br>');
        else res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="B">' + questions[sess.data.index].answers[1] + '<br>');
        if (sess.data.answers[sess.data.index] !== undefined && sess.data.answers[sess.data.index] === "C") res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="C"checked>' + questions[sess.data.index].answers[2] + '<br>');
        else res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="C">' + questions[sess.data.index].answers[2] + '<br>');
        if (sess.data.answers[sess.data.index] !== undefined && sess.data.answers[sess.data.index] === "D") res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="D"checked>' + questions[sess.data.index].answers[3] + '<br>');
        else res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="D">' + questions[sess.data.index].answers[3] + '<br>');
        if (sess.data.answers[sess.data.index] !== undefined && sess.data.answers[sess.data.index] === "E") res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="E"checked>' + questions[sess.data.index].answers[4] + '<br>');
        else res.write('<input onChange="this.form.submit();" type="radio" name="answers" value="E">' + questions[sess.data.index].answers[4] + '<br>');
        res.write('<br>');
        res.write('</fieldset>');

        //if the user asked for a hint
        if (sess.data.hint){
          //checks if the user has any hints available
          if (sess.data.numOfHints > 0){
            sess.data.numOfHints--;
            //tells the user if his selection is correct or not
            if (sess.data.answers[sess.data.index] === questions[sess.data.index].answer) res.write('Option: ' + sess.data.answers[sess.data.index] + ' is correct (you have ' + sess.data.numOfHints + ' hints remaining)');
            else res.write('Option: ' + sess.data.answers[sess.data.index] + ' is incorrect (you have ' + sess.data.numOfHints + ' hints remaining)');
          } else res.write('You have run out of hints!');
          sess.data.hint = false;
        }
        res.write('<br>');
        res.write('</form>');
        //next button
        if (sess.data.index === questions.length - 1) res.write('<form action="finish" method="post">');
        else res.write('<form action="next" method="post">');
        if (sess.data.index === questions.length - 1) res.write('<input type="submit" value="Finish">');
        else res.write('<input type="submit" value="Next">');

        //previous button
        res.write('<br>');
        res.write('<br>');
        res.write('</form>');
        res.write('<form action="prev" method="post">');
        res.write('<input type="submit" value="Previous">');
        res.write('</form>');

        //hint button
        res.write('<br>');
        res.write('</form>');
        res.write('<form action="hint" method="post">');
        res.write('<input type="submit" value="Hint">');
        res.write('</form>');
        res.write('</body>');
      }
      next();
    }

    //displays once the user has completed the exam
    function finishPage(req, res, next){
      var sess = req.session;
      //if the page should be displayed
      if (sess.data.index === questions.length){
        res.write('<body>');
        res.write('<h4>Well done you have completed the exam!</h4>');
        res.write('<h4>Hope you had a plesent experience with the online exam services!</h4>');
        res.write('</body>');
      }
      next();
    }

    //creates the footer for the pages
    function footer(req, res, next){
      var sess = req.session;
      res.write('<hr>');
      res.write('<h1>Carleton University</h1>');
      res.write('<hr>');
      res.write('<h4>Author: Alex Patel, Company: Patel Brothers, Copywrite@2015</h4>');
      res.write('</html>');
      res.end();
    }
    
    //use static middleware to implement static server
    //uses the morgan logger tiny version, to not clutter the console
    app.use(morgan('tiny'));
    //uses expression-session, to handle different students
    app.use(session({
      secret: 'test session',
      resave: false,
      saveUninitialized: true
    }));

    //if the users tries to login in (login button is clicked)
    app.post("/login", function(req, res, next){
      var sess = req.session;
      var reqData = "";
      req.on('data', function(chuck){
        reqData += chuck;
      });

      req.on('end', function(){
        //parses the form data
        var postParams = qstring.parse(reqData);

        //creates the user session
        sess.data = {};
        sess.data.name = postParams.name;
        sess.data.stuNum = postParams.stuNum;
        sess.data.index = -1;
        sess.data.hint = false;
        sess.data.numOfHints = 3;
        sess.data.answers = [questions.length];

        var studentExam = {name: sess.data.name, stuNum: sess.data.stuNum, answers: sess.data.answers};

        //checks if the user has already written a test
        //if true, then the newest test is not inserted (user cannot take the test multiple times)
        var insertTest = true;
        for (var j in testResults){
          if (sess.data.stuNum === testResults[j].stuNum) insertTest = false;
        }

        if (insertTest){
          //inserts the test results into the database
          dataBase.collection("testResults", function(err, collection){
            if (err){
              console.log("FAILED TO CONNECT TO testResults: " + err);
            }
            else {
              collection.insert(studentExam, function(err){
                if (err) console.log("Inserting studentExam error: " + err);
              });
            }
          });
        } else {
          sess.data.index = questions.length;
        }
        
        next();
      });
    });

    //if the user selected an answer (clicked on a radio button)
    app.post("/selectAnswer", function(req, res, next){
      var sess = req.session;
      var reqData = "";
      req.on('data', function(chuck){
        reqData += chuck;
      });

      req.on('end', function(){
        var ans = qstring.parse(reqData);
        console.log("Answer: " + ans.answers);
        sess.data.answers[sess.data.index] = ans.answers;

        //updates the testResults on the database
        dataBase.collection("testResults", function(err, collection){
          if (err){
            console.log("FAILED TO CONNECT TO testResults: " + err);
          }
          else {
            collection.update({stuNum: sess.data.stuNum}, {$set: {answers: sess.data.answers}}, function(err){
              if (err) console.log("Inserting studentExam error: " + err);
            });
          }
        });

        next();
      });
    });

    //if the user clicked the next button
    app.post("/next", function(req, res, next){
      var sess = req.session;
        if (sess.data.index < questions.length - 1) sess.data.index++;
        next();
    });

    //if the user clicked the previous button
    app.post("/prev", function(req, res, next){
      var sess = req.session;
        if (sess.data.index > 0) sess.data.index--;
        next();
    });
    
    //if the user clicked the finish button
    app.post("/finish", function(req, res, next){
      var sess = req.session;
      var reqData = "";
      req.on('data', function(chuck){
        reqData += chuck;
      });

      req.on('end', function(){
        for (var i in sess.data.answers){
          console.log("Answer " + i + ": " + sess.data.answers[i]);
        }

        var studentExam = {name: sess.data.name, stuNum: sess.data.stuNum, answers: sess.data.answers};
        testResults.push(studentExam);

        sess.data.index++;
        next();
      });
    });

    //if the user clicked the hint button
    app.post("/hint", function(req, res, next){
      var sess = req.session;
      sess.data.hint = true;
      next();
    });

    app.use("/index.html", login);
    app.use(authenticate);
    app.use(header);
    app.use(introPage);
    app.use(body);
    app.use(finishPage);
    app.use(footer);

    //specifies the port the server should be listening on
    app.listen(3000);

    console.log("Static Express Server Running at http://127.0.0.1:3000  CNTL-C to quit");
    //dataBase.close();
  }
});
