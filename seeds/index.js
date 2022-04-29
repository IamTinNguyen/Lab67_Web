const mongoose = require('mongoose');
const products = require('./products');
const Product = require('../models/products');

const dbUrl = 'mongodb://localhost:27017/lab34';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async() => {
    await Product.deleteMany({});
    for (let i of products) {
        const p = new Product({
            //YOUR USER ID
            productName: i.name,
            productPrice: i.price,
            productImg: i.img,
            productDesc: i.description
        })
        await p.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})