import { useRef } from "react";
import {
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_matqcfw",
        form.current,
        "plRcS1k5uo0Ak-iNc"
      )
      .then(
        (result) => {
          toast.success("message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>

        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card>
              <div className={styles.card}>
                <label>Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Full Name"
                  required
                />
                <label>Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your active email"
                  required
                />
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
                <label>Message</label>
                <textarea name="message" cols="30" rows="10"></textarea>

                <button className="--btn --btn-primary">Send Message</button>
              </div>
            </Card>
          </form>

          <div className={styles.details}>
            <Card>
              <div className={styles.card2}>
                <h3>Our Contact Information</h3>
                <p>
                  Fill the form or contact us via otehr channels listed below
                </p>
                <div className={styles.icons}>
                  <span>
                    <FaPhoneAlt />
                    <p>+995 599 883 700</p>
                  </span>

                  <span>
                    <FaEnvelope />
                    <p>Support@mshop.com</p>
                  </span>
                  <span>
                    <FaLocationArrow />
                    <p>Tbilisi, Georgia</p>
                  </span>
                  <span>
                    <FaTwitter />
                    <p>@its_Seyistrings</p>
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
