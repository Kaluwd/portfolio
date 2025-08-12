import { useRef, useState } from "react";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!form.name.trim()) {
      alert("Please enter your name");
      setLoading(false);
      return;
    }
    
    if (!validateEmail(form.email)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }
    
    if (!form.message.trim()) {
      alert("Please enter your message");
      setLoading(false);
      return;
    }

    // Prepare FormSubmit request
    formRef.current.action = "https://formsubmit.co/ajax/kalu97721@gmail.com";
    formRef.current.method = "POST";
    
    // Add FormSubmit hidden fields
    const formData = new FormData(formRef.current);
    formData.append("_subject", `New message from ${form.name}`);
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    formData.append("_autoresponse", `Thank you for your message, ${form.name}! I'll get back to you soon.`);

    try {
      const response = await fetch("https://formsubmit.co/ajax/kalu97721@gmail.com", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok && data.success === "true") {
        resetForm();
        alert("✅ Your message has been sent successfully!");
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`❌ ${error.message}\n\nPlease try again or contact me directly at kalu97721@gmail.com`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="Have questions or ideas? Let's talk!"
        />

        <div className="grid-12-cols mt-16">
          {/* Contact Form */}
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
                aria-label="Contact form"
              >
                <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />
                <input type="hidden" name="_subject" value="New message from your website" />
                
                <div>
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="cta-button group"
                  disabled={loading}
                  aria-busy={loading}
                >
                  <div className="bg-circle" />
                  <p className="text">
                    {loading ? "Sending..." : "Send Message"}
                  </p>
                  <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow icon" />
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Visual Experience */}
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;