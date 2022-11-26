const mongoose = require('mongoose');

dbConnection = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log('DB Connection established...');
    }catch(error){
        console.log('DB Error: ', error);
    }
}

module.exports = dbConnection;