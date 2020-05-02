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
const db = require("./config/dbConnection");
const mySqlStore = require("express-mysql-session");
const passport = require("passport");
const moment = require("moment");

const mainRoute = require('./routes/main');
const user = require("./routes/user");
const video = require("./routes/video");

const app = express();

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	handlebars: allowInsecurePrototypeAccess(handlebars),
	helpers: {
		formatDate: (date, targetFormat) => {
			return moment(date).format(targetFormat);
		},
		radioCheck: (val, radio) => {
			if(val == radio) return "checked";
		},
		displaySubLang: (list) => {
			if(list == "") return "None";
			return list.replace(/,/g, " | ");
		}
	}
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
	store: new mySqlStore({
		host: "localhost",
		port: 3306,
		user: "itp211",
		password: "itp211",
		database: "vidjot",
		clearExpired: true,
		checkExpirationLevel: 900000,
		expiration: 900000
	}),
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(FlashMessenger.middleware);
app.use((req, res, next) => {
	res.locals.successMsg = req.flash('successMsg');
	res.locals.errorMsg = req.flash('errorMsg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

db.setUpDb(false);

const authenticate = require("./config/passport");
authenticate.localStrategy(passport);

app.use('/', mainRoute); 
app.use("/user", user);
app.use("/video", video);

const port = 5000;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});