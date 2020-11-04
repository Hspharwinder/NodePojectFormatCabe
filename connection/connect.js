var mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('config');

var mongoDbconnection = async function() {
    return new Promise((resolve, reject) => {
        var url = config.get("mongoDbConnectionUrl")
        mongoose.connect(url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true}, (error, result) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
            return resolve('Db successfully connected!');
        });
    });
};

autoIncrement.initialize(mongoose);

module.exports = {
    mongoDbconnection: mongoDbconnection
};
