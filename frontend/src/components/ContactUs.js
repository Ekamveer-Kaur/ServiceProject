import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row">
        {/* Contact Form */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="mb-3">Get in Touch</h3>
            <form
  action="https://formspree.io/f/xqapjloo"
  method="POST"
>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input id="name" name="name"type="text" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" name="email" type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" className="form-control" rows="4" placeholder="Type your message..."></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">Send Message</button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="col-md-6 mt-4 mt-md-0">
          <div className="shadow-sm">

          <iframe
  title="Google Map"
  className="w-100 rounded"
  height="450"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110335.61286016926!2d74.87628457763722!3d30.208892742362554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39173297173abbcd%3A0xa00033c0a58a5ac8!2sBathinda%2C%20Punjab!5e0!3m2!1sen!2sin!4v1742472336261!5m2!1sen!2sin"
  style={{ border: "0" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
