'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API call or Toast notification)
        console.log('Form Submitted:', formData);
        alert('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[#0B0F17] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E5BA73]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-[#E5BA73] font-semibold text-sm uppercase tracking-widest bg-[#E5BA73]/10 px-4 py-1.5 rounded-full border border-[#E5BA73]/20">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-4 tracking-tight">
                        We would Love to Hear From You
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Have questions about <span className="text-[#E5BA73]">Fable</span>, publishing your ebook, or payment issues? Drop us a line and our support team will reply promptly.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Contact Details Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 lg:col-span-1"
                    >
                        {/* Info Card 1 */}
                        <div className="p-6 rounded-2xl bg-[#131927]/80 border border-gray-800/80 backdrop-blur-md hover:border-[#E5BA73]/40 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-[#E5BA73]/10 text-[#E5BA73] flex items-center justify-center mb-4 border border-[#E5BA73]/20">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                            <p className="text-gray-400 text-sm mb-3">Send your query anytime!</p>
                            <a href="mailto:support@fable.com" className="text-[#E5BA73] hover:underline font-medium text-sm">
                                support@fable.com
                            </a>
                        </div>

                        {/* Info Card 2 */}
                        <div className="p-6 rounded-2xl bg-[#131927]/80 border border-gray-800/80 backdrop-blur-md hover:border-[#E5BA73]/40 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-[#E5BA73]/10 text-[#E5BA73] flex items-center justify-center mb-4 border border-[#E5BA73]/20">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-1">Visit Office</h3>
                            <p className="text-gray-400 text-sm mb-3">Come say hello at our HQ.</p>
                            <p className="text-gray-300 text-sm font-medium">
                                123 Digital Library St, Tech City, NY 10001
                            </p>
                        </div>

                        {/* Info Card 3 */}
                        <div className="p-6 rounded-2xl bg-[#131927]/80 border border-gray-800/80 backdrop-blur-md hover:border-[#E5BA73]/40 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-[#E5BA73]/10 text-[#E5BA73] flex items-center justify-center mb-4 border border-[#E5BA73]/20">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-1">Support Hours</h3>
                            <p className="text-gray-400 text-sm mb-2">Mon - Fri: 9:00 AM - 8:00 PM</p>
                            <p className="text-gray-400 text-sm">Sat - Sun: 10:00 AM - 4:00 PM</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-2 p-8 sm:p-10 rounded-2xl bg-[#131927]/80 border border-gray-800/80 backdrop-blur-md shadow-2xl relative"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="text-[#E5BA73] w-6 h-6" />
                            <h2 className="text-2xl font-bold">Send a Message</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Full Name Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5BA73] transition-colors"
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5BA73] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Subject Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Writer Inquiry / Payment Support / General Question"
                                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5BA73] transition-colors"
                                />
                            </div>

                            {/* Message Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#E5BA73] transition-colors resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E5BA73] text-[#0B0F17] font-semibold flex items-center justify-center gap-2 hover:bg-[#d4a862] transition-colors shadow-lg shadow-[#E5BA73]/10"
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;