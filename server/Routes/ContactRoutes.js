import express from "express";
import authUser from "../Middlewares/authUser.js";
import { CreateContact } from "../Controllers/ContactController.js";


const ContactRouter = express.Router();

// POST /api/contact
ContactRouter.post("/",CreateContact);

export default ContactRouter;
