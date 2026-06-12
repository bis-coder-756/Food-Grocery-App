import express from "express";
import { upload } from "../Configs/Multer.js";

import { addProduct, changeStock, productById, productList } from "../Controllers/Productcontroller.js";
import authSeller from "../Middlewares/authSeller.js";

const productRouter = express.Router();

// first route for add product in database 
// in this first we run upload function that we have created in multer file use .array( method here in it make an [in this array add images ]) ,after it add amiddleware which authenticatethe sellerthen  the run fun addproduct
// so it will add the product in database
productRouter.post('/add', authSeller, upload.array('images', 4), addProduct)

productRouter.get('/list', productList)
productRouter.get('/:id', productById)
productRouter.post('/stock', authSeller, changeStock)

export default productRouter; 