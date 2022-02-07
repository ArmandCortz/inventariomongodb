const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("./database");
const flash = require("connect-flash");
const passport = require("passport");

//Muter import
const multer = require('multer');

//Ininialixation
const app = express();

require("./config/passport");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views")); //Carpeta de vistas
app.engine(
	".hbs",
	exphbs({
		defaultLayout: "main",
		layoutsDir: path.join(app.get("views"), "layouts"),
		partialsDir: path.join(app.get("views"), "partials"),
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");

//Middleware
app.use(multer({dest:path.join(__dirname,'./public/upload')}).single('imagen'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 60000 },
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	res.locals.user = req.user || null;
	next();
});

//Routes
app.use(require("./routes/index.js"));
app.use(require("./routes/users.js"));
app.use(require("./routes/productos.js"));

//Static files

app.use(express.static(path.join(__dirname, "public")));
//Patch file
app.set('patchImge',__filename);
//Server is Listening
app.listen(app.get("port"), () => {
	console.log("Server on port ", app.get("port"));
});
