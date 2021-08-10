import asyncHandler from 'express-async-handler';
import pool from '../config/db.js';
//import Product from '../models/productModel.js';

// @desc    Fetch all products
// @routes  GET /api/products
// @access  Public
const getProducts = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query('SELECT * FROM products', (err, rows) => {
      connection.release();

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
};

// @desc    Fetch single product
// @routes  GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});

// // @desc    Delete a product
// // @routes  DELETE /api/products/:id
// // @access  Private / Admin
// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product && product._id == req.params.id) {
//     await product.remove();
//     res.json({ message: 'Product removed' });
//   } else {
//     res.status(404);
//     throw new Error('Product Not Found');
//   }
// });

// // @desc    Create a product
// // @routes  POST /api/products
// // @access  Private / Admin
// const createProduct = asyncHandler(async (req, res) => {
//   const product = new Product({
//     name: 'Sample name',
//     price: 0,
//     user: req.user._id,
//     image: '/images/sample.jpg',
//     brand: 'Sample brand',
//     category: 'sample category',
//     countInStock: 0,
//     numReviews: 0,
//     description: 'Sample description',
//   });

//   const createdProduct = await product.save();
//   res.status(200).json(createdProduct);
// });

// // @desc    Update a product
// // @routes  PUT /api/products/:id
// // @access  Private / Admin
// const updateProduct = asyncHandler(async (req, res) => {
//   const {
//     name,
//     price,
//     description,
//     image,
//     brand,
//     category,
//     countInStock,
//   } = req.body;

//   const product = await Product.findById(req.params.id);

//   if (product) {
//     product.name = name;
//     product.price = price;
//     product.description = description;
//     product.image = image;
//     product.brand = brand;
//     product.category = category;
//     product.countInStock = countInStock;

//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } else {
//     res.status(404);
//     throw new Error('Product not found');
//   }
// });

// // @desc    Create new review
// // @routes  POST /api/products/:id/reviews
// // @access  Private
// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;

//   const product = await Product.findById(req.params.id);

//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     );

//     if (alreadyReviewed) {
//       res.status(400);
//       throw new Error('Product already reviewed');
//     }

//     // add new review
//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     };

//     // add review in array under products
//     product.reviews.push(review);

//     // total number of all reviews for that product
//     product.numReviews = product.reviews.length;

//     // total average ratings for that product (number of stars)
//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();
//     res.status(201).json({ message: 'Review added' });
//   } else {
//     res.status(404);
//     throw new Error('Product not found');
//   }
// });

// // @desc    Get top rated products
// // @routes  GET /api/products/top
// // @access  Public
// const getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({}).sort({ rating: -1 }).limit(3);

//   res.json(products);
// });

export {
  getProducts,
  getProductById,
  // deleteProduct,
  // createProduct,
  // updateProduct,
  // createProductReview,
  // getTopProducts,
};
