import React, { useState } from "react";
import "./PartnerFaq.css";

const faqs = [
  {
    question: "How much does it cost to join and how much commission will I pay?",
    answer: "The cost depends on your business size and FastBite's pricing policy. Commission is usually a percentage of each order."
  },
  {
    question: "Do I need to have my FSA food hygiene rating in place to join FastBite?",
    answer: "Yes, a valid food hygiene rating is typically required to join FastBite."
  },
  {
    question: "My business is a van/unit. Can I still join FastBite?",
    answer: "Yes, mobile units can join FastBite as long as they meet the hygiene and trading requirements."
  },
  {
    question: "I want to join FastBite but I don't have any drivers. Can you help?",
    answer: "Yes, FastBite often provides delivery support in certain areas. You may also hire your own drivers."
  },
  {
    question: "How long will it take for me to get online?",
    answer: "Once your documents are verified, you can usually go online within 1–2 weeks."
  },
  {
    question: "I'm trading from a residential address, can I join FastBite?",
    answer: "Yes, as long as you comply with hygiene, safety, and licensing rules."
  },
  {
    question: "I am buying/selling a business which is already with FastBite. Can I change the ownership into my name or report a Change of Ownership?",
    answer: "Yes, ownership can be transferred by contacting FastBite’s support with the right documents."
  }
];

const PartnerFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Still have questions?</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <span className="faq-icon">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </div>
            <div
              className={`faq-answer ${openIndex === index ? "open" : ""}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnerFaq;
