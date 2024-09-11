// src/pages/Faq.js
import React, { useState } from 'react';
import './Faq.css'; // Import the CSS file for styling

function Faq() {
    const [activeIndex, setActiveIndex] = useState(0); // Set the first question open by default

    const faqs = [
        {
            question: 'What is the purpose of our platform?',
            answer: 'Our website provides a platform where hotels and stores can sell their excess or surplus food at a low price or for free, while individuals and organizations can buy it, Which helps to reduce food waste and help those in need.'
        },
        {
            question: 'How can I sell food through your platform?',
            answer: 'Hotels and stores can register as a hotel or store on our platform and log in to list their excess food products. You can sell products directly through the website.'
        },
        {
            question: 'How do I buy food on your platform?',
            answer: 'Individuals and organizations can register as an individual or NGO/organization. Once registered, you can browse and purchase available food products directly through our platform.'
        },
        {
            question: 'How do I contact support?',
            answer: 'For any queries or support, please visit our Contact Us page for more details and contact information.'
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h1>FAQ</h1>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <div className="faq-question" onClick={() => toggleAccordion(index)}>
                        <h2>{faq.question}</h2>
                        <span className="toggle-icon">{activeIndex === index ? '-' : '+'}</span>
                    </div>
                    {activeIndex === index && (
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
            <a href="/contact" className="contact-link">Contact Us</a>
        </div>
    );
}

export default Faq;
