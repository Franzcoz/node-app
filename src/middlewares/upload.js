const multer = require('multer');
const path = require('path');

const fecha = new Date;
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const unique = path.basename(file.originalname, '.txt') + '-' + fecha.toLocaleDateString('es-Cl') + path.extname(file.originalname);
        cb(null, unique);
    },
});

const upload = multer({ storage });

module.exports = upload;