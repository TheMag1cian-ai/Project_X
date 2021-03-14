var express = require('express');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Debu0210#',
	database: 'project_X'
});

db.connect(function(err){
	if(err) {
		throw err;
	}
	console.log('database connected!!');
});

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'kira61102@gmail.com',
		pass: 'thefive%'
	}
});

var app = express();
// var track_id = "";
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
	var data = `SELECT * FROM dustbin_info`;
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err;
		}
		res.render("home", {result:result})
	});
});

app.get('/dustbin/:id', function(req, res) {
	var data = `SELECT * FROM dustbin_info WHERE id = '${req.params.id}'`;
	// track_id = data[39];
	var query = db.query(data, function(err, result) {
		if(err) {
			throw err;
		}
		res.render(`dustbin${req.params.id}`, {result:result});
	});
});

app.get('/post', function(req, res) {
	res.render("post");
});

app.post('/post', function(req, res) {
	var id = req.body.id;
	var height = req.body.height;
	var moisture = req.body.moisture;

	var data1 = "UPDATE dustbin_info SET height = " + height + " WHERE id = '" + id + "'";
	var data2 = "UPDATE dustbin_info SET moisture = " + moisture + " WHERE id = '" + id + "'";
	var data3 = "UPDATE dustbin_info SET ha = 0 WHERE id = '" + id + "'";
	var data4 = "UPDATE dustbin_info SET ma = 0 WHERE id = '" + id + "'";
	var query1 = db.query(data1, function(err1, result1) {
		if(err1) {
			throw err1;
		}
	});
	var query2 = db.query(data2, function(err2, result2) {
		if(err2) {
			throw err2;
		}
	});
	var query3 = db.query(data3, function(err3, result3) {
		if(err3) {
			throw err3;
		}
	});
	var query4 = db.query(data4, function(err4, result4) {
		if(err4) {
			throw err4;
		}
	});
	res.redirect('/');
});

app.get('/mail_type_1/:id', function(req, res) {
	transporter.sendMail({ from: 'kira61102@gmail.com', to: 'ddatt0217@gmail.com', subject: 'Dustbin information', text: `Someone clicked report button to dustbin ${req.params.id}. Kindly check dustbin ${req.params.id}.`}, function(err, info) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Email sent' + info.response);
		}
	});

	transporter.sendMail({ from: 'kira61102@gmail.com', to: 'ddatt2000@gmail.com', subject: 'Dustbin information', text: `Someone clicked report button to dustbin ${req.params.id}. Kindly check dustbin ${req.params.id}.`}, function(err, info) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Email sent' + info.response);
		}
	});
	res.redirect(`/dustbin/${req.params.id}`);
});


app.get('/mail_type_2/:id', function(req, res) {
	transporter.sendMail({ from: 'kira61102@gmail.com', to: 'ddatt0217@gmail.com', subject: 'Dustbin information', text: `Height of garbage of dustbin ${req.params.id} exceeded. Kindly deal with it.`}, function(err, info) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Email sent' + info.response);
		}
	});
	var data = `UPDATE dustbin_info SET ha = '1' WHERE id = '${req.params.id}'`;
	var query = db.query(data, function(err, result) {
		if (err) {
			throw err;
		}
	});
	res.redirect('/');
});

app.get('/mail_type_3/:id', function(req, res) {
	transporter.sendMail({ from: 'kira61102@gmail.com', to: 'ddatt0217@gmail.com', subject: 'Dustbin information', text: `Moisture level of garbage of dustbin '${req.params.id}' exceeded. Kindy deal with it.`}, function(err, info) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Email sent' + info.response);
		}
	});
	var activation = `UPDATE dustbin_info SET ma = '1' WHERE id= '${req.params.id}'`;
	var query = db.query(activation, function(err, result) {
		if (err) {
			throw err;
		}
	});
	res.redirect('/');
});

app.get('/mail_type_4/:id', function(req, res) {
	transporter.sendMail({ from: 'kira61102@gmail.com', to: 'ddatt2000@gmail.com', subject: 'Dustbin information', text: `Height of garbage of dustbin '${req.params.id}' exceeded. Please take necessary action on collection van.`}, function(err, info) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Email sent' + info.response);
		}
	});
	var data = `UPDATE dustbin_info SET ha = '1' WHERE id= '${req.params.id}'`;
	console.log(data);
	var query = db.query(data, function(err, result) {
		if (err) {
			throw err;
		}
	});
	res.redirect('/');
});

app.get('/mail_type_5/:id', function(req, res) {
	transporter.sendMail({ from: 'kira61102@gmail.com', to: 'ddatt2000@gmail.com', subject: 'Dustbin information', text: `Moisture level of garbage of dustbin '${req.params.id}' exceeded. Please take necessary action on collection van.`}, function(err, info) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Email sent' + info.response);
		}
	});
	var activation = `UPDATE dustbin_info SET ma = '1' WHERE id= '${req.params.id}'`;
	var query = db.query(activation, function(err, result) {
		if (err) {
			throw err;
		}
	});
	res.redirect('/');
});

app.listen('3000', function() {
	console.log('Server started!!');
});