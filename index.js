const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/index.html', express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));


// Get and Post Requests

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + "/html/index.html");
// })

app.post('/chatbot', (req, res) => {
    // Process message and get response
    const message = req.body.message;
    const number = message.match(/\d+/);
    
    if (number) {
		// Response is JSON, response.data has the fact from the numbersapi website
		axios.get(`http://numbersapi.com/${number}?type=trivia`).then(response => response.data).then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			console.log(error)
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
		res.json({
			text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
		});
	}
});



const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});