const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,   // 👈 IMPORTANT
  collectionName: 'sessions',          // optional
});

app.use(session({
  secret: process.env.SESSION_SECRET,  // 👈 IMPORTANT
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,      // 1 day
  },
}));