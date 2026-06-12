
// UPDATE USER CART-DATA API ENDPOINT WILL BE      /api/cart/update

import User from "../Models/User.js"

export const updatecart = async (req,res)=>{
    try {
        // in the body we will not send the userId .this user id will be added using the middleware that we have created for user Auth
        const userId = req.userId
        const { cartItems } = req.body

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            })
        }

        await User.findByIdAndUpdate(
            userId,
            { $set: { cartItems } }
        )

        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}