const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
let file;
const Book = require('../models/Book');
const Owner = require('../models/Owner');

//   Set diskStorage
const storage = multer.diskStorage({
  destination: path.join(__dirname) + '../../../qwickbook/src/Components/uploads/',
  filename: function(res, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

//   Set uploader
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFile(file, cb);
  }
}).single('file')

//  Check fileType
function checkFile(file, cb){
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if(mimetype && extName){
    return cb(null, true);
  } else {
    return cb('Error! Only for images')
  }
}

router.get('/', (req, res) => {
  Book.find({})
    .populate('owner')
    .then(books => {
      if(books.length >= 1){
        return res.status(201).json({
          data: books
        })
      }
    })
    .catch(err => console.log(err))  
})

router.post('/', (req, res) => {
  const { title, author, edition, publisher, pages, language, isbn, description, condition, price } = req.body.book;
  const owner = req.body.owner;
  const imageUrl = file.path;
  Owner.find({ email: owner.email })
    .then(owner => {
        const book = new Book({
          title,
          edition,
          language,
          publisher,
          isbn,
          description,
          pages,
          condition,
          author,
          price,
          imageUrl,
          owner: owner[0]._id
        });
        book.save()
    })
    .then(book => console.log('Book Created'))
    .catch(err => console.log(err))
})


router.post('/file', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }

  file = req.file;
  return res.status(200).send(req.file)
  })

})

module.exports = router;