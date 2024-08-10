const express = require('express')
const filedata = require('../model/filedata')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
      if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        
        return cb(null,'./uploads/images')
      }
      else if(file.mimetype === 'application/pdf'){
        return cb(null,'./uploads/pdfs')
      }
    },
    filename:function(req,file,cb){
      return cb(null,`${Date.now()}-${file.originalname}`)
    },
  })

const upload = multer({storage})

router.get("/", (req, res) => {
    return res.render('homepage')
})

router.post('/upload', upload.fields([
  { name: 'bookImage', maxCount: 1 },
  { name: 'bookPDF', maxCount: 1 }
]), async (req, res) => {

  const { name, author, description, genre } = req.body
  const { bookImage, bookPDF } = req.files

  // console.log(bookImage)
  // console.log(req.files)

  if (!name || !author || !description || !genre || !bookImage || !bookPDF) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const existingBookInfo = await filedata.findOne({ name })
    if (existingBookInfo) {
      return res.status(400).json({ message: "Book already exists" })
    } else {
      const newBookInfo = new filedata({
        name,
        author,
        description,
        genre,
        imageFilePath: bookImage[0].path,
        pdfFilePath: bookPDF[0].path
      })
      await newBookInfo.save()
      
      return res.status(201).json({ message: "Book uploaded successfully" });
    }
  } 
  catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }

})

module.exports = router
