import React from "react";
import "./PartnerWhyFastBite.css";
import image1 from '../../../assets/Images/fastbite-image7.jpg';
import image2 from '../../../assets/Images/fastbite-image8.jpg';
import image3 from '../../../assets/Images/fastbite-image10.jpg';


const PartnerWhyFastBite = () => {
    return (
        <section className="partner-why-fastbite">
            <h2>Why Partner with FastBite?</h2>

            <div className="benefits">
                <div className="benefit-item item-one">
                    <img src={image1} alt="Delivery, your way" className="benefit-image" />
                    <h3>Delivery, your way</h3>
                    <p>Connect with customers in the way that suits your business best. Either through your own drivers or with our extensive delivery network.</p>
                </div>
                <div className="benefit-item">
                    <img src={image2} alt="Grow your customer base" />
                    <h3>Grow your customer base</h3>
                    <p>Millions of users visit our site every day, so your business can reach more customers than ever. </p>
                </div>
                <div className="benefit-item">
                    <img src={image3} alt="Value for your business" />
                    <h3>Value for your business</h3>
                    <p>We’ll promote your business on the app, provide free branding and save your business money on daily essentials and premium brands.</p>
                </div>
            </div>
        </section>
    );
}

export default PartnerWhyFastBite;