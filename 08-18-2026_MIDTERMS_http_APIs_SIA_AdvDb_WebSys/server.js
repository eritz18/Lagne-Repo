require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

const API_URL = 'https://http.dog';


app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );

});


app.get('/api/dog', (req, res) => {

    const code = req.query.code;


    if (!code) {

        return res.status(400).json({
            error: 'Please provide an HTTP status code.'
        });

    }


    const statusCode = Number(code);



    if (
        !Number.isInteger(statusCode) ||
        statusCode < 100 ||
        statusCode > 599
    ) {

        return res.status(400).json({
            error: 'Please enter a valid HTTP status code between 100 and 599.'
        });

    }



    const imageUrl =
        `${API_URL}/${statusCode}.jpg`;



    res.json({

        code: statusCode,

        image: imageUrl

    });

});


app.listen(PORT, () => {

    console.log(
        `HTTP Status for Dogs → http://localhost:${PORT}`
    );

});