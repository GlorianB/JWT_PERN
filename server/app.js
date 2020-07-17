//Modules import
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

//Custom modules import
const generateJWT = require('./utils/generateJWT');


//Routes import
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

// Creating server
const app = express();


// Middlewares setup
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cors());


// Routes definition

app.use('/dashboard', dashboardRoutes);
app.use('/', authRoutes);

app.use('/', (req, res, next) => {
  return res.status(404).send('<h1>Page not found!</h1>')
});


// Starting server
const PORT = process.env.PORT | 8000;

app.listen(PORT, () => {
  console.log(chalk.blue('Server listening on port ') + `${chalk.green(PORT)}`)
});
