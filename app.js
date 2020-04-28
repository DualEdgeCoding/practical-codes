/*
* 'require' is similar to import used in Java and Python. It brings in the libraries required to be used
* in this JS file.
* */
const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const FlashMessenger = require('flash-messenger');
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const handlebars = require("handlebars");

const mainRoute = require('./routes/main');
const user = require("./routes/user")

const app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(cookieParser());

app.use(session({
	key: 'vidjot_session',
	secret: 'tojiv',
	resave: false,
	saveUninitialized: false,
}));

app.use(flash());

app.use(FlashMessenger.middleware);

app.use((req, res, next) => {
	next();
});

app.use('/', mainRoute); 
app.use("/user", user);

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});