export default function ContactForm() {
  return (
    <form
      className="contact-form card reveal"
      action="https://formspree.io/f/xdkjbpja"
      method="POST"
    >
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="John Doe" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="_replyto" placeholder="john@example.com" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Your Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Tell me about your project..."
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-full">
        <span>Send Message</span>
      </button>
    </form>
  );
}
