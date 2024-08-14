require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');
const filedata = require('../model/filedata');
const {google} =require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)
// Handle file upload
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

  
async function handleSendMail(req, res) {
const { email } = req.body;

if (!email) {
    return res.status(400).json({ message: 'Email is required' });
}

try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
    },
    });

    const mailOptions = {
    from: `Book Review <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Book Under Review',
    text: 'Your book is under verification. We will notify you once it has been reviewed.',
    html: '<p>Your book is under verification. We will notify you once it has been reviewed.</p>',
    };

    const result = await transport.sendMail(mailOptions);
    console.log('Message sent:', result.messageId);

    return res.status(200).json({ message: 'Confirmation email sent successfully' });
} catch (error) {
    console.error('Error during email sending:', error.message);
    return res.status(500).json({ message: 'Failed to send email' });
}
}
  

async function handleUpload(req, res) {
  const { name, author, description, genre } = req.body;
  const { bookImage, bookPDF } = req.files;

  // Validation
  if (!name || !author || !description || !genre || !bookImage || !bookPDF) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check for existing book
    const existingBookInfo = await filedata.findOne({ name });
    if (existingBookInfo) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    // Save new book info
    const newBookInfo = new filedata({
      name,
      author,
      description,
      genre,
      imageFilePath: bookImage[0].path,
      pdfFilePath: bookPDF[0].path,
    });
    await newBookInfo.save();

    return res.status(201).json({ message: 'Book uploaded successfully' });
    // return res.status(201).render('email')
  } catch (error) {
    console.error('Error during book upload:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}


module.exports = { handleUpload, handleSendMail };