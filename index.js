const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config()


//file routes
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const app = express();

const pdb = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.post('/register', (req, res) => register.handleRegister(req, res, pdb, bcrypt));

app.post('/signin', signin.handleSignin(pdb, bcrypt));

app.put('/image', (req, res) => image.handleImage(req, res, pdb));

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, pdb));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

