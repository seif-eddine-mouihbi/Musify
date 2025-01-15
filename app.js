/**
 * @license Apache-2.0
 * @copyright Seif Eddine Mouihbi 2024
 */

'use strict';

/**
 * node modules
 */
const cors = require('cors');
const cookieParser = require('cookie-parser');

/**
 * custom modules
 */
const login = require('./src/routes/login.route');
const auth = require('./src/routes/auth.route')
const authenticatedUser = require('./src/middlewares/auth_user.middleware')
const home = require('./src/routes/home.route')

//Initial express app
const express = require('express');
const app = express();

/**
 * EJS Setting
 */
app.set('view engine', 'ejs');


/**
 * Setting static directory
 */
app.use(express.static(`${__dirname}/public`));

/**
 * Enable cors & cookie parser
 */
app.use(cors()).use(cookieParser());


/**
 * Login Page
 */
app.use('/login', login);

/**
 * Auth page
 */
app.use('/auth',auth)

/**
 * check user is authenticated
 */
app.use(authenticatedUser)

/**
 * Home page
 */
app.use('/', home)


app.listen(8080, () => {
    console.log(`Server Listening at http://localhost:8080`);
});