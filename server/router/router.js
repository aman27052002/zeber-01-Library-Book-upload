const express = require('express')
const filedata = require('../model/filedata')
const router = express.Router()
const {handleUpload,handleSendMail} = require('../controller/handlefunction')
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

router.post('/upload', upload.fields(
[
  { name: 'bookImage', maxCount: 1 },
  { name: 'bookPDF', maxCount: 1 }
]), handleUpload)

router.get("/submit-email", (req, res) => {
  return res.render('email')
})
router.post('/submit-email',handleSendMail)

module.exports = router
