import React, { useState } from "react";
import "./BecomeQuestions.css";

const faqs = [
  {
    question: "What are the requirements to deliver with FastBite?",
    answer: (
      <>
        <p>To deliver with us, you’ll need:</p>
        <ul>
          <li> To be aged +18.</li>
          <li> An Apple or Android smartphone with data.</li>
          <li> A moped, bike or car - plus licence and the correct insurance.</li>
          <li> A bank account, so you can receive your money.</li>
        </ul>
        <p>When signing up, we may also ask for:</p>
        <ul>
          <li>A copy of your passport.</li>
          <li>Proof of your right to work in Nigeria.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I make money?",
    answer: (
      <>
        <p>
          Delivering with FastBite means you’ll make money for each delivery. The
          courier app sends you delivery ‘offers’, and you can decide whether to
          accept them.
        </p>
        <p>
          Payment goes directly into your bank account every week. You also keep 100%
          of your tips!
        </p>
      </>
    ),
  },
  {
    question: "Do I need to submit my availability every week?",
    answer: (
      <>
        <p>
          Yes — in most regions we operate a closed network, so you’ll need to submit
          your availability by Wednesday midnight for the following week.
        </p>
        <p>
          Occasionally you might see “open runs” in the app, but they’re not
          guaranteed.
        </p>
      </>
    ),
  },
  {
    question: "Can I use my own equipment?",
    answer: (
      <>
        <p>
          Yes, you can use your own delivery bag, as long as it meets our safety
          standards. If you have commercial-grade equipment, you can submit it for
          approval during sign-up.
        </p>
      </>
    ),
  },
  {
    question: "My preferred delivery zone is closed so I applied in a different one. Can I change?",
    answer: (
      <>
        <p>
          Please only apply in the zone you wish to deliver in. If your preferred zone is closed, we’re not able to transfer your account.
        </p>
      </>
    ),
  },
  {
    question: "Background check",
    answer: (
      <>
        <p>
          Safety is always our priority. Everyone must complete a criminal background
          and right to work (RTW) check with Sterling.
        </p>
        <ul>
          <li>Address history (5 years)</li>
          <li>Proof of address (3 months)</li>
          <li>Passport</li>
          <li>Driving licence</li>
          <li>Nigeria Right to Work document</li>
        </ul>
      </>
    ),
  },
];

const FAQSection = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2>Common questions?</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div key={index} className="faq-item">
                <div
                  className="faq-header"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className={`faq-icon ${isOpen ? "active-icon" : ""}`}>&gt;</span>
                  <h4 className={`faq-question ${isOpen ? "active-question" : ""}`}>
                    {faq.question}
                  </h4>
                </div>
                <div
                  className={`faq-answer ${isOpen ? "show" : ""}`}
                  style={{ maxHeight: isOpen ? "1000px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}
                >
                  <div style={{ paddingTop: isOpen ? "0.5rem" : "0" }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;