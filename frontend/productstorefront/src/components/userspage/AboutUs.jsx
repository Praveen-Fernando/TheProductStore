import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "What is your mission?",
    answer:
      "Our mission is to deliver high-quality products that improve the lives of our customers.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact our support team via email at support@example.com or call us at 123-456-7890.",
  },
  {
    question: "Where are you located?",
    answer:
      "We are located in San Francisco, CA, but we ship products worldwide.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unused products. Please visit our returns page for more details.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to most countries. Shipping costs will vary based on location.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      {isOpen && (
        <div className="p-4 rounded-lg bg-gray-50">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <section className="w-full max-w-4xl mb-12">
        <h1 className="mb-4 text-3xl font-bold">About Us</h1>
        <p className="text-lg text-gray-700">
          Welcome to our company! We are dedicated to providing exceptional
          products and services. Our team is passionate about creating solutions
          that make a difference. We believe in innovation, quality, and
          customer satisfaction. Thank you for choosing us and being part of our
          journey!
        </p>
      </section>

      <section className="w-full max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </section>
    </div>
  );
};

export default AboutUs;
