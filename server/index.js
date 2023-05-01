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

const allowedFormats = [
  'image/png',
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/epub+zip',
  'application/gzip',
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.rar',
  'application/rtf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/xml',
  'application/zip',
  'application/x-7z-compressed',
  'audio/mpeg',
  'audio/mp4',
  'audio/vnd.wav',
  'video/3gpp',
  'video/mp4',
  'video/quicktime',
  'video/x-ms-wmv'
]
const fileFilter = (req, file, cb) => {
  if (allowedFormats.includes(file.mimetype)) {
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
