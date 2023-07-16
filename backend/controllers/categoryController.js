const Category = require('../models/category')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

exports.newCategory = catchAsyncErrors(async (req, res, next) => {

    // let images = []
    // if (typeof req.body.images === 'string') {
    //     images.push(req.body.images)
    // } else {
    //     images = req.body.images
    // }

    // let imagesLinks = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: 'category'
    //     });

    //     imagesLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     })
    // }

    // req.body.images = imagesLinks
    req.body.user = req.user.id;

    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        category
    })
})

exports.getCategory = catchAsyncErrors(async (req,res,next) => {
    const category = await Category.find();

    res.status(200).json({
        success: true,
        category
    })
})

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  
    const newCategoryData = {
        name: req.body.name,
        description: req.body.description
    }
    const category = await Category.findByIdAndUpdate(req.params.id, newCategoryData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        category
    })

})