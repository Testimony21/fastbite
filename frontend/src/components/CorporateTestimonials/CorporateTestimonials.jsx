import React from 'react';
import './CorporateTestimonials.css';

const CorporateTestimonials = () => {
    
    const testimonials = [
        {
            name: "Sarah Johnson",
            position: "Office Manager, GreenTech Ltd",
            text: "FastBite takes so much stress away from my role. No matter the number of people or the amount of dietary requirements, they always make sure we get the perfect quality of food we need!"
        },
        {
            name: "David Okoro",
            position: "HR Director, PrimeBank",
            text: "The food is delicious and always has an amazing service team! So many options to choose from on the FastBite website and our Account Manager always helps us book in and organise them!",
        },
        {
            name: "Jane Smith",
            position: "CEO, Bright Ideas Inc.",
            text: "Our account manager organises our weekly lunch and is always helpful when putting together events or any last minute orders. Ordering all food and drink from one place has made life easier.",
        }
    ];

    return (
        <section className="corporate-testimonials">
            <h2>But don't just take our word for it</h2>
            <p>Find out how good food has made our customers working lives better.</p>
            <div className="testimonial-grid">
                {testimonials.map((t, index) => (
                    <div className="testimonial-card" key={index}>
                        <p className="testimonial-text">"{t.text}"</p>
                        <h4 className="testimonial-name">{t.name}</h4>
                        <p className="testimonial-position">{t.position}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CorporateTestimonials;
