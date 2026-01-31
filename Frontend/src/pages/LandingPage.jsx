import React, { useState, useEffect } from "react";
import "./LandingPage.css";

const TESTIMONIALS = [
  {
    text: "MeetUp made our online classes super simple. No lag, no confusion – just click and connect.",
    name: "Amit Kumar",
    role: "Computer Science Student",
    avatar: "👨‍🎓",
  },
  {
    text: "We switched to ApnaMeet for our team standups and client calls. The quality is excellent and it's so easy to use!",
    name: "Priya Sharma",
    role: "Product Manager",
    avatar: "👩‍💼",
  },
  {
    text: "Hosting webinars has never been easier. Screen sharing works flawlessly and participants love the interface.",
    name: "Rahul Verma",
    role: "Marketing Director",
    avatar: "👨‍💻",
  },
];

const FAQS = [
  {
    question: "Is MeetUp free to use?",
    answer:
      "Yes! We offer a free tier with up to 100 participants and 40-minute meetings.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation required. MeetUp works directly in your browser using WebRTC technology.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. All meetings are protected with end-to-end encryption and secure signaling.",
  },
];

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [paused, setPaused] = useState(false);

  // Auto slide testimonials
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentTestimonial(
        (p) => (p + 1) % TESTIMONIALS.length
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="landing-wrapper">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <span>MeetUp</span>
        </div>
        <div className="nav-actions">
          <button className="btn btn-ghost">Join as Guest</button>
          <button className="btn btn-primary">Login</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Seamless <span>Video Meetings</span> for Everyone
          </h1>
          <p>
            Secure, fast, and high-quality video calls for teams, students, and professionals.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-lg">Start Meeting</button>
            <button className="btn btn-outline">Join Meeting</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="mockup">
            <div className="mock-dots">
              <span className="red" />
              <span className="yellow" />
              <span className="green" />
            </div>
            <div className="mock-grid">
              <div className="user-tile" />
              <div className="user-tile" />
              <div className="user-tile" />
              <div className="user-tile" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <span className="f-icon">🚀</span>
          <h3>Fast & Reliable</h3>
          <p>Low-latency streaming even on slower networks.</p>
        </div>

        <div className="feature-card">
          <span className="f-icon">🔒</span>
          <h3>Secure Calls</h3>
          <p>Every meeting is protected with end-to-end encryption.</p>
        </div>

        <div className="feature-card">
          <span className="f-icon">💻</span>
          <h3>Cross Platform</h3>
          <p>No downloads required. Works in any modern browser.</p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">10k+</span>
          <span className="stat-label">Meetings Hosted</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">99.9%</span>
          <span className="stat-label">Uptime</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">256-bit</span>
          <span className="stat-label">Encryption</span>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="testimonials"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <h2>Trusted by thousands</h2>

        <div className="t-card">
          <p className="t-text">
            “{TESTIMONIALS[currentTestimonial].text}”
          </p>
          <div className="t-user">
            <span className="avatar">
              {TESTIMONIALS[currentTestimonial].avatar}
            </span>
            <div>
              <strong>{TESTIMONIALS[currentTestimonial].name}</strong>
              <small>{TESTIMONIALS[currentTestimonial].role}</small>
            </div>
          </div>
        </div>

        <div className="dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentTestimonial ? "active" : ""}`}
              onClick={() => setCurrentTestimonial(i)}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-container">
        <h2>Common Questions</h2>
        {FAQS.map((f, i) => (
          <div key={i} className="faq-item">
            <button
              className="faq-trigger"
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
            >
              {f.question}
              <span className={openFAQ === i ? "rotate" : ""}>+</span>
            </button>
            <div className={`faq-content ${openFAQ === i ? "open" : ""}`}>
              <p>{f.answer}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer">
  <div className="footer-top">
    {/* BRAND */}
    <div className="footer-brand">
      <h3 className="footer-logo">
        Apna<span>Meet</span>
      </h3>
      <p>
        Seamless, secure, and high-quality video meetings built for teams,
        students, and professionals.
      </p>
    </div>

    {/* PRODUCT */}
    <div className="footer-col">
      <h4>Product</h4>
      <ul>
        <li><a href="#">Features</a></li>
        <li><a href="#">Security</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Roadmap</a></li>
      </ul>
    </div>

    {/* COMPANY */}
    <div className="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Press</a></li>
      </ul>
    </div>

    {/* SUPPORT */}
    <div className="footer-col">
      <h4>Support</h4>
      <ul>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Status</a></li>
        <li><a href="#">API Docs</a></li>
      </ul>
    </div>
  </div>

  {/* BOTTOM BAR */}
  <div className="footer-bottom">
    <span>
      © {new Date().getFullYear()} ApnaMeet. All rights reserved.
    </span>

    <div className="footer-social">
      <a href="#" aria-label="LinkedIn">💼</a>
      <a href="#" aria-label="Twitter">🐦</a>
      <a href="#" aria-label="GitHub">🐙</a>
    </div>
  </div>
</footer>

    </div>
  );
}
