const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
// const sessions = require('express-session');
// const cookieParser = require("cookie-parser");

require('dotenv').config(data => data.parsed);
mongoose.set('strictQuery', false);

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const historyRoutes = require('./routes/history');
const tagRoutes = require('./routes/tag');

const app = express();

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(sessions({
//     secret: process.env.SECRET,
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false 
// }));
// app.use(cookieParser());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/epub+zip' ||
    file.mimetype === 'application/gzip' ||
    file.mimetype === 'application/pdf' ||    
    file.mimetype === 'application/vnd.ms-powerpoint' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    file.mimetype === 'application/vnd.rar' ||    
    file.mimetype === 'application/rtf' ||    
    file.mimetype === 'image/svg+xml' ||    
    file.mimetype === 'image/tiff' ||    
    file.mimetype === 'text/plain' ||    
    file.mimetype === 'image/webp' ||    
    file.mimetype === 'application/vnd.ms-excel' ||    
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||    
    file.mimetype === 'application/xml' ||    
    file.mimetype === 'application/zip' ||    
    file.mimetype === 'application/x-7z-compressed'    
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter, limits: { fileSize: 10000000 } }).single('image')
);
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/history', historyRoutes);
app.use('/tags', tagRoutes);


app.use((error, req, res, next) => {
  console.error("[ERROR]", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}...`);
    });
  })
  .catch(err => console.log(err));
