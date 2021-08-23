//this file will handle connection logic to mongoDB database

//load mongoose
const mongoose = require("mongoose");

/**
 * 
/////////////////////////////
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully: ");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB")
    console.log(e);
})
 */
const uri = "mongodb+srv://mongodbps:mongodbps@cluster0.4wumf.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB successfully: ");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB")
    console.log(e);
})

module.exports = {
    mongoose
}