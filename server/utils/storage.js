// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       if (file.mimetype.indexOf('image') > -1) cb(null, imageDirectory);
//       else if (file.mimetype.indexOf('video') > -1) cb(null, videoDirectory);
//       else cb(null, documentDirectory);
//   },
//   filename: (req, file, cb) => {
//       const fileName = file.originalname.toLowerCase().split(' ').join('-');
//       cb(null, `${uuidv4()}-${fileName}`);
//   },
// });

// const upload = multer({
//   storage: s3Storage,
//   fileFilter: function (req, file, cb) {
//       const supportedFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
//       if (!supportedFileTypes.includes(file.mimetype)) {
//           return cb(
//               new BadRequestError(
//                   `Unsupported file type, supported files are ${supportedFileTypes}`
//               )
//           );
//       }
//       cb(null, true);
//   },
// });