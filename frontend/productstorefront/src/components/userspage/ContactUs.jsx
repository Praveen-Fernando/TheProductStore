import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send the data to an API
    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-12">
      {/* Part 1: Contact Details and Map */}
      <div className="flex flex-col w-full max-w-6xl lg:flex-row lg:space-x-8">
        {/* Contact Details */}
        <div className="flex-1 mb-8 lg:mb-0">
          <h2 className="mb-4 text-2xl font-bold text-center">
            Contact Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <FaMapMarkerAlt className="mr-4 text-2xl text-blue-500" />
              <p className="text-lg text-center">
                123 Main St, San Francisco, CA 94101
              </p>
            </div>
            <div className="flex items-center justify-center">
              <FaPhoneAlt className="mr-4 text-2xl text-blue-500" />
              <p className="text-lg text-center">+1 (123) 456-7890</p>
            </div>
            <div className="flex items-center justify-center">
              <FaEnvelope className="mr-4 text-2xl text-blue-500" />
              <p className="text-lg text-center">contact@example.com</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-bold text-center">Our Location</h2>
          <div className="w-full h-64">
            <iframe
              className="w-full h-full rounded-lg"
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6607987260245!2d-122.40166678468199!3d37.78379997975888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808e2d4e5e73%3A0x62dbbd56d788e1a7!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094101!5e0!3m2!1sen!2sus!4v1628770921257!5m2!1sen!2sus"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Part 2: Contact Form */}
      <div className="w-full max-w-4xl p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">Contact Us</h2>
        {submitted ? (
          <p className="text-center text-green-500">
            Thank you for your message! We will get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full h-32 p-2 border border-gray-300 rounded-lg resize-none"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
