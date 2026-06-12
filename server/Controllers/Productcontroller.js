import { v2 as cloudinary } from "cloudinary";

//here we will create different controller functions for adding for displaying the list of products and for modifying the stock

import product from "../Models/Product.js";

// Add product : API ENDPOINT = /api/product/add
export const addProduct = async (req, res) => {
    try {

        let productData = JSON.parse(req.body.productData)
        if (!req.files || req.files.length === 0) {
            return res.json({ success: false, message: "No images uploaded" });
        }

        const images = req.files;
    

        let imagesUrl = await Promise.all(
            images.map(async (item) => {

                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        await product.create({ ...productData, image: imagesUrl })

        res.json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}



// Get Product : API ENDPOINT = /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await product.find({})
        //  send this products in the response 
        res.json({ success: true, products })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
// it will return the product list from the database



// Get Single Product : API ENDPOINT = /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundProduct = await product.findById(id)
        res.json({ success: true, product: foundProduct })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


// change Product inStock : API ENDPOINT = /api/product/stock
export const changeStock = async (req, res) => {
    try {
        // 1st we need the product data from the body so we need the id 
        const { id, inStock } = req.body;
        //with that we will get the instock property also whether it will be true or false 
        //after that we have to find this product
        await product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message: "Stock Updated" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
// so this function will be change the instock value in database

