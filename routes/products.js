const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const catchAsync = require('../utils/catchAsync');


const { isLoggedIn } = require('../middleware');


const Product = require('../models/products');

router.route('/')
    .get(isLoggedIn, catchAsync(products.index));


// router.get('/new', isLoggedIn, products.renderNewForm)

// router.route('/:id')
//     .get(catchAsync(products.showCampground))
//     .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(products.updateCampground))
//     .delete(isLoggedIn, isAuthor, catchAsync(products.deleteCampground));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(products.renderEditForm))



module.exports = router;