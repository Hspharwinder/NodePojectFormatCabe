const multer = require('multer');
const userUpload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/user')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + `.${file.originalname.split('.').pop()}`)
    }
});
const driverUpload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/driver')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + `.${file.originalname.split('.').pop()}`)
    }
});
const adminUpload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/admin')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + `.${file.originalname.split('.').pop()}`)
    }
});
const documentUpload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/document')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + `.${file.originalname.split('.').pop()}`)
    }
});
const admin = multer({ storage: adminUpload });
const user = multer({ storage: userUpload });
const driver = multer({ storage: driverUpload });
const document = multer({ storage: documentUpload });
module.exports = {
    admin: admin,
    user: user,
    driver: driver,
    document:document
};
