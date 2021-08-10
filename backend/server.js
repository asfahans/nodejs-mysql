import express from 'express';
import mysql from 'mysql';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';

import productRoutes from './routes/productRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';
//import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//
// app.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}`);

//     connection.query('SELECT * FROM products', (err, rows) => {
//       connection.release();

//       if (!err) {
//         res.send(rows);
//       } else {
//         console.log(err);
//       }
//     });
//   });
// });

app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/upload', uploadRoutes);

// Error Not found Middleware
//app.use(notFound);

// Error Middleware
//app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.inverse
  )
);
