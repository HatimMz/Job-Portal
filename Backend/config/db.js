const mongoose=require("mongoose");

async function connectdb() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/jobportal");
        console.log("MONGODB CONNECTED");
    } catch(err) {
        console.error(err);
    }
}
module.exports = connectdb;