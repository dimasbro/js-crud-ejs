const mongoose = require('mongoose');
const mongoDb = 'mongodb://localhost/First_App';

mongoose.connect(
    // mongoDb, { useNewUrlParser: true }
    mongoDb, { }
).then(()=>console.log('Mongodb connected'));

mongoose.Promise = global.Promise;

module.exports = mongoose;