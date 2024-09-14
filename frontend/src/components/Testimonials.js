import React from "react";
import "../components/Testimonials.css"; // Ensure this path is correct
import user from '../assets/images/user.png';
import ngo from '../assets/images/ngo.png';
import store from '../assets/images/store.png';
import hotel from '../assets/images/hotel.png';
import owner from '../assets/images/owner.png';

const testimonials = [
  {
    name: "Amit Patil",
    role: "Individual",
    feedback:
      "Good2Give helped me find affordable food for my family. I'm grateful for this platform!",
    image: user, // Use imported image
  },
  {
    name: "Aakansha Foundation",
    role: "NGO",
    feedback:
      "Thanks to Good2Give, we were able to get food for our charity events at a low cost.",
    image: ngo, // Use imported image
  },
  {
    name: "Prabhu Niketan",
    role: "Hotel",
    feedback:
      "We love how we can sell our surplus food quickly and prevent food waste!",
    image: hotel, // Use imported image
  },
  {
    name: "Shivam Store",
    role: "Store",
    feedback:
      "Good2Give has been a game-changer for us. We can now manage our surplus food efficiently.",
    image: store, // Use imported image
  },
  {
    name: "Radhika Sawant",
    role: "Store Owner",
    feedback:
      "An amazing platform that helps us reduce waste and reach more people in need.",
    image: owner, // Use imported image
  },
];

function Testimonials() {
  return (
    <div className="testimonials-section">
      <h2 className="testimonials-title">What People Are Saying</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-image"
            />
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>
            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
