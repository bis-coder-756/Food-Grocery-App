import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contactus = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();

        if (data.success) {
            alert("Message sent successfully!");
            setName("");
            setEmail("");
            setMessage("");
        } else {
            alert("Something went wrong");
        }
    };

    return (
        <div className="mx-4 sm:mx-[10%] py-12">

            {/* ================= HERO SECTION ================= */}
            <div className="text-center mb-14">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Contact <span className="text-primary">FreshMart</span>
                </h1>
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                    Have questions about your order, delivery, or products?
                    We’re here to help you 24/7.
                </p>
            </div>

            {/* ================= CONTACT CONTENT ================= */}
            <div className="grid lg:grid-cols-2 gap-10">

                {/* ================= CONTACT FORM ================= */}
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                        Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-gray-600">Full Name</label>
                            <input onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter your name"
                                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/40" name="name"
                                value={name}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Email Address</label>
                            <input onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/40" name="email"
                                value={email}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Message</label>
                            <textarea onChange={(e) => setMessage(e.target.value)}
                                rows="4"
                                placeholder="Write your message..."
                                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" name="messsage"
                                value={message}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-dull transition text-white py-3 rounded-lg font-medium"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* ================= CONTACT INFO ================= */}
                <div className="space-y-6">

                    <div className="flex items-start gap-4 bg-white shadow-md p-6 rounded-xl border border-gray-100">
                        <Mail className="text-primary" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Email</h3>
                            <p className="text-gray-500 text-sm">support@freshmart.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white shadow-md p-6 rounded-xl border border-gray-100">
                        <Phone className="text-primary" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Phone</h3>
                            <p className="text-gray-500 text-sm">+92 300 1234567</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white shadow-md p-6 rounded-xl border border-gray-100">
                        <MapPin className="text-primary" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Address</h3>
                            <p className="text-gray-500 text-sm">
                                Main Market Road, Lahore, Pakistan
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white shadow-md p-6 rounded-xl border border-gray-100">
                        <Clock className="text-primary" />
                        <div>
                            <h3 className="font-semibold text-gray-800">Working Hours</h3>
                            <p className="text-gray-500 text-sm">
                                Mon - Sun : 8:00 AM - 11:00 PM
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ================= MAP SECTION ================= */}
            <div className="mt-16">
                <h2 className="text-3xl font-semibold mb-11 text-gray-700 text-center">
                    Our <span className="text-primary">Location</span>
                </h2>
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <iframe
                        title="map"
                        src="https://maps.google.com/maps?q=Lahore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

        </div>
    );
};

export default Contactus;
