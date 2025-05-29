import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <section className="bg-gray-100 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
        Have questions or need assistance? Our team is here to help! Fill out the form or reach out via the details below.
      </p>
  
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
          
          <form action="#" method="POST">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800" placeholder="Your Name" required/>
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800" placeholder="Your Email" required/>
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800" placeholder="Your Message" required></textarea>
            </div>
  
            <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition">
              Send Message
            </button>
          </form>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
          
          <p className="text-gray-600 mb-4">
            Our team is available Monday to Friday, 9 AM - 6 PM.
          </p>
  
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium w-28">📍 Address:</span>
              <p className="text-gray-600">123 Fashion Street, New York, NY</p>
            </div>
  
            <div className="flex items-center">
              <span className="text-gray-700 font-medium w-28">📞 Phone:</span>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
  
            <div className="flex items-center">
              <span className="text-gray-700 font-medium w-28">✉️ Email:</span>
              <p className="text-gray-600">support@mycart.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  

  );
}
export default Contact;