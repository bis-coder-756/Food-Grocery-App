import mongoose from "mongoose";

import Address from "../Models/Address.js"

//  Add a new Adress  : API end point will be  /api/address/add

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;

        const userId = new mongoose.Types.ObjectId(req.userId);

        await Address.create({ ...address, userId });

        res.json({ success: true, message: "Address Added Successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//  get address 

export const getAddress = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);

        const addresses = await Address.find({ userId });

        res.json({ success: true, addresses });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};