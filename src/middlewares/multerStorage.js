const multer = require('multer');
const path = require('path');

module.exports = multer.diskStorage({
  destination: (_req, _image, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _image, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
