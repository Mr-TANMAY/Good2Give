import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send('service_by0cn4r', 'template_8ykq3kn', formData, 'bq4kb6gYgT-G2tyng')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert("Message sent successfully!");
            }, (err) => {
                console.error('FAILED...', err);
                alert("Failed to send message, please try again later.");
            });

        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="contact">
            <h2>Contact Us</h2>
            <p>Have questions or need assistance? Reach out to us, and we will get back to you as soon as possible.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Your Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Your Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Subject:</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required />
                </div>
                <div>
                    <button type="submit">Send Message</button>
                    <button type="reset" onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}>Clear</button>
                </div>
            </form>
            <p>Or email us directly at: <a href="mailto:good2give.food@gmail.com">good2give.food@gmail.com</a></p>
            <div className="contact-info">
                <h3>Our Contact Information</h3>
                <p><strong>Address:</strong> Chikitsak Samuha's Sir Sitaram & Lady Shantabai PATKAR VARDE COLLEGE, Swami Vivekananda Rd, Piramal Nagar, Goregaon West, Mumbai, Maharashtra 400061</p>
                <p><strong>Phone:</strong> 7208165693 / 8828179972</p>
                <p><strong>Email:</strong> <a href="mailto:good2give.food@gmail.com">good2give.food@gmail.com</a></p>
            </div>
            <div className="map-embed">
                <h3>Find us here</h3>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4481.678100372243!2d72.84305318911225!3d19.167795821993543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b78f43408a6b%3A0xa387a49687e89612!2sChikitsak%20Samuha&#39;s%20Sir%20Sitaram%20%26%20Lady%20Shantabai!5e0!3m2!1sen!2sin!4v1725110382623!5m2!1sen!2sin"
                    title="Google Maps Location"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

export default Contact;
