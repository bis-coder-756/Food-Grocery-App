
import { request, response } from "express";
import Order from "../Models/Order.js"
import Product from "../Models/Product.js";
import Stripe from 'stripe';
import User from "../Models/User.js"


// place order with COD(cash on delivery) API ENDPOINT : /api/order/cod

export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;
         //  const { userId, items, address } = req.body
        if (!address || items.length === 0) {
            return res.json({
                success: false, message: "invalid data"
            })
        }
        // address available and items lenght also gretaer then 0 so now calculate amount using items
        // acc means anitial count of amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)
        // Add tax Charges (2%)
        amount += Math.floor(amount * 0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });
        return res.json({ success: true, message: "Order placed successfully" })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: "false", message: error.message })
    }
}

//         ONLINE PAYMENT  place order stripe: API ENDPOINT : /api/order/stripe

export const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;
        //  const { userId, items, address } = req.body
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({
                success: false, message: "invalid data"
            })
        }
        // address available and items lenght also gretaer then 0 so now calculate amount using items
        // acc means anitial count of amount

        const productdata = [];
        // calculate amount using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            // here we are getting all the products 1 by 1 . so after getting this product we ahve to add it in product data
            productdata.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)
        // Add tax Charges (2%)
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });
        // now we have to create stripe instance that that 1st we import stripe npm package
        // STRIPE GETWAY INITIALIZE
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        // create line items for stripe
        // and in this line items we have to provide the product data,currency,price & quantity

        const lineItems = productdata.map((item) => {
            return {
                price_data: {
                    // use the currency according to your stripe acccount
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity,
            }
        })


        // create session 
        const session = await stripeInstance.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            // in this url we have to add the success url which we will get from req header
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            // so whenever the payment will be cancel user will be redirect to the cart page

            // next we provide some metadata
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({ success: true, url: session.url })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: "false", message: error.message })
    }
}
//      STRIPE WEBHOOKs to verify payments action :    /stripe
// export const stripeWebhooks = async (req, res) => {
//       const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

//       const sig = req.headers["stripe-signature"];
//       let event;

//       try {
//         event = stripeInstance.webhooks.constructEvent(
//             req.body,
//             sig,
//             process.env.STRIPE_WEBHOOKS_SECRET
//         );

//       } catch (error) {
//         res.status(400).send(`Webhook Error: ${error.message}`)
//       }
// // so in this function we have to handle this event 
//     //   HANDLE THE EVENT
//     // we have basically 2 events while setting up the webhooks in  stripe account "payment_intent.succeeded" , 
//     switch (event.type) {
//         case checkout.session.completed: {
//             const paymentIntent = event.data.object;
//             // from this payment intent we will find the id  so add
//             const paymentIntentId = paymentIntent.id;

//             // getting session metadata
//             const session = await stripeInstance.checkout.sessions.list({
//             payment_intent : paymentIntentId,
//             })
//             // so we will get session for this payment intent Id . now from this session we will go to metadata and from the metadata we will find the orderId & userId
//             const { orderId ,userId } =session.data[0].metadata;
//             // update the isPaid status in order model 
//             // mark payment as paid
//            await Order.findByIdAndUpdate(orderId, {isPaid: true})
//         //    after that we have to clear the cart data for this user
//      await User.findByIdAndUpdate(userId, {cartItems : {}});
//      break;

//         }
//             case "payment_intent.payment_failed" : {
//                 const paymentIntent = event.data.object;
//             // from this payment intent we will find the id  so add
//             const paymentIntentId = paymentIntent.id;

//             // getting session metadata
//             const session = await stripeInstance.checkout.sessions.list({
//             payment_intent : paymentIntentId,
//             })
//             // so we will get session for this payment intent Id . now from this session we will go to metadata and from the metadata we will find the orderId & userId
//             const { orderId } =session.data[0].metadata;
//             await Order.findByIdAndDelete(orderId)
//             break;
//             }

//         default: 
//         console.error(`Unhandled event type ${event.type}`)
//             break;
//     }
//     res.json({ received : true });
// }
export const stripeWebhooks = async (req, res) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOKS_SECRET
        );
    } catch (error) {
        console.log("Webhook signature verification failed:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        switch (event.type) {

            case "checkout.session.completed": {

                const session = event.data.object;


                const { orderId, userId } = session.metadata;

                // Mark order as paid
                await Order.findByIdAndUpdate(orderId, {
                    isPaid: true,
                });

                // Clear user's cart
                await User.findByIdAndUpdate(userId, {
                    cartItems: {},
                });



                break;
            }

            case "checkout.session.expired": {

                const session = event.data.object;

                const { orderId } = session.metadata;

                await Order.findByIdAndDelete(orderId);


                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
                break;
        }

        return res.json({ received: true });

    } catch (error) {
        console.log("Webhook processing error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//  GET ALL ORDER DETAILS FOR SELLER BUT BEFORE IT WE CREATE ANOTHER FUNCTION TO GET ORDER DETAIL OF INDIVIDUAL USER

// GET ORDERS BY USER ID :APIENDPOINT : /api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
            .populate('items.product')
            .populate('address')
            .sort({ createdAt: -1 })
        // whenever the payment type is "COD" so it will display to user 
        //         // whenever pamentType is online and isPaid is false so not show to user .sort method return the data when the order was created
        //         // so newly created orders will show at the top


        res.json({ success: true, orders })
    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}



//NEXT CREATE A FUN FOR  GIVE ALL ORDERS DATA TO THE SELLER/ADMIN
// GET ALL ORDERS (for seller) : /api/order/seller

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 })
        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, meassage: error.message })
    }
}

