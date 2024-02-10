import express from 'express';
import * as path from "path";
import EnvironmentVars from "./constants/EnvironmentVars";
import routes from "./routes/routes";
import session from "express-session";
import bodyParser from "body-parser";
import favicon from 'serve-favicon';

// **** Variables **** //

const app = express();

// **** Setup **** //

// Setup live reload when running in a development environment.
if(EnvironmentVars.ENVIRONMENT == "DEV") {
    var liveReload = require("livereload");
    const connectLiveReload = require("connect-livereload");

    // Setup live reload server.
    const liveReloadServer = liveReload.createServer();
    liveReloadServer.watch(path.join(__dirname, "views"));
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
}

// Setup session.
if(EnvironmentVars.SESSION.ACTIVE)
{
    app.use(
        session({
            secret: EnvironmentVars.SESSION.SECRET,
            resave: true,
            saveUninitialized: true,
        })
    );
}
else
    console.log("Session not enabled as environment variable USE_SESSION is either not set or false.");

// Setup request parser for JSON.
app.use(express.json());

// ** Front-End Content ** //

// Favicon.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Setup request parser for forms.
app.use(bodyParser.urlencoded({ extended: true }));

// Set location of views directory.
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "/public"));

// Set view engine to ejs.
app.set("view engine", "ejs");

// ** Routing ** //
app.use('/', routes);

// ** Start Server ** //
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening"));