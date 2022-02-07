const express = require('express');
const routes = require('./controllers');
const sequalize = require('./config/connection.js');
const path = require('path');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = require('handlebars');

const session = require('express-session');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: '',
    cookie: {
        //session will automatically expire in 10 minutes
        expires: 100 * 60 *1000
    },
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);


sequalize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`API server now on port ${PORT}!`));
  });