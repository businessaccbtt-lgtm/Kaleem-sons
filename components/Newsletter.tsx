"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import confetti from "canvas-confetti";

import Image from "next/image";



export default function Newsletter() {

  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [message, setMessage] = useState("");



  const validateEmail = (email: string) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  };



  const triggerGoldenConfetti = () => {

    confetti({

      particleCount: 150,

      spread: 70,

      origin: { y: 0.6 },

      colors: ["#f5c242", "#e8b923", "#ffd700", "#ffed9e"],

    });

  };



  const handleSubscribe = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!email) {

      setStatus("error");

      setMessage("Please enter your email");

      return;

    }

    if (!validateEmail(email)) {

      setStatus("error");

      setMessage("Please enter a valid email");

      return;

    }

    setStatus("loading");

    await new Promise(resolve => setTimeout(resolve, 1000));

    localStorage.setItem("subscribedEmail", email);

    localStorage.setItem("isNewsletterSubscribed", "true");

    setStatus("success");

    setMessage("Thank you! Welcome to Kaleem Sons ✨");

    setEmail("");

    triggerGoldenConfetti();

    window.dispatchEvent(new Event("newsletterSubscribed"));

  };



  return (

    <section

      className="newsletter"

      style={{ background: "#111111", color: "white", position: "relative", overflow: "hidden" }}

    >

     



      {/* Content */}

      <div className="newsletter-content">

        <h2>Join the House of Kaleem Sons</h2>

        <p>Get 10% off your first order + exclusive launches</p>



        <form onSubmit={handleSubscribe}>

          <div className="newsletter-form">

            <input

              type="email"

              placeholder="Your email address"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              disabled={status === "loading" || status === "success"}

            />

            <motion.button

              type="submit"

              disabled={status === "loading" || status === "success"}

              whileHover={{ scale: 1.05 }}

              whileTap={{ scale: 0.96 }}

              style={{

                boxShadow: status === "success"

                  ? "0 0 20px rgba(212, 175, 55, 0.6)"

                  : "0 0 15px rgba(212, 175, 55, 0.3)",

                transition: "all 0.3s",

              }}

            >

              {status === "loading" ? "Subscribing..." :

               status === "success" ? "Subscribed ✓" :

               "Subscribe"}

            </motion.button>

          </div>

        </form>



        {message && (

          <p style={{

            marginTop: "12px",

            color: status === "success" ? "#d4af37" : "#ff6b6b",

            fontSize: "0.95rem",

          }}>

            {message}

          </p>

        )}

      </div>



      

    </section>

  );

}