const express =  require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');


const app =express();

//decalre which folder to see in jade
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));


app.get('/',function(req,res){
     // console.log('hello world');
     res.render('index',{'title':'Welcome'});
});


app.get('/about',function(req,res){
     // console.log('hello world');
     res.render('about');
});
app.get('/contact',function(req,res){
     // console.log('hello world');
     res.render('contact');
});


//send contact form 
app.post('/contact/send', function(req, res){
	console.log('ahmedthabet1234',req.body)
	var transporter = nodeMailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'thabeta532@gmail.com',
			pass: 'ahmedthabet1234'
		}
	});

	var mailOptions = {
		from: 'Ahmed Thabet <thabeta532@gmail.com>',
		to: 'thabeta532@gmail.com',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response,req.body);
			res.redirect('/');
		}
	});
});

app.listen(3000);

console.log('Server Is Running or Port 3000');