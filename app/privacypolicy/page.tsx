import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | Kaleem Sons",
  description: "How we collect, use, and protect your personal information.",
}

const sections = [
  {
    id: "01",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you place an order or create an account, we collect your full name, email address, phone number, shipping and billing address, and payment details. Payment card data is processed exclusively through our secure payment partners and is never stored on our servers.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our website — including your IP address, browser type, pages visited, time spent on pages, referring URLs, and device identifiers. This data helps us improve your experience and the performance of our platform.",
      },
      {
        subtitle: "Cookies & Tracking",
        text: "We use cookies, web beacons, and similar technologies to keep your shopping session active, remember your preferences, and measure the effectiveness of our marketing campaigns. You may disable cookies in your browser settings, though some features of the site may not function as intended.",
      },
    ],
  },
  {
    id: "02",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Order Fulfillment",
        text: "Your personal data is used to process and deliver your orders, send order confirmations and shipping updates, handle returns and exchanges, and respond to customer support inquiries.",
      },
      {
        subtitle: "Communications",
        text: "With your consent, we may send promotional emails about new collections, exclusive offers, and sportswear updates. You can unsubscribe at any time using the link at the bottom of any marketing email or by contacting us directly.",
      },
      {
        subtitle: "Service Improvement",
        text: "Aggregated and anonymized usage data helps us analyze site performance, identify technical issues, and make informed decisions about product offerings and website design.",
      },
    ],
  },
  {
    id: "03",
    title: "Sharing Your Information",
    content: [
      {
        subtitle: "Third-Party Service Providers",
        text: "We share data with trusted partners who assist in operating our business — including shipping carriers, payment processors, email marketing platforms, and analytics providers. These parties are contractually obligated to protect your information and use it only for the services they provide to us.",
      },
      {
        subtitle: "Legal Obligations",
        text: "We may disclose your information if required to do so by law, court order, or governmental authority, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
      },
      {
        subtitle: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of company assets, your personal data may be transferred as part of that transaction. We will notify you via email or a prominent notice on our website before your information becomes subject to a different privacy policy.",
      },
    ],
  },
  {
    id: "04",
    title: "Data Security",
    content: [
      {
        subtitle: "Our Measures",
        text: "We implement industry-standard security measures including SSL/TLS encryption, secure server infrastructure, and access controls to protect your personal information from unauthorized access, disclosure, or misuse.",
      },
      {
        subtitle: "Your Responsibility",
        text: "While we take every precaution on our end, no method of data transmission over the internet is 100% secure. You are responsible for maintaining the confidentiality of your account credentials and for any activity that occurs under your account.",
      },
    ],
  },
  {
    id: "05",
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You have the right to request access to the personal data we hold about you and to request corrections to any inaccurate or incomplete information. You may update most account information directly in your profile settings.",
      },
      {
        subtitle: "Deletion",
        text: "You may request that we delete your personal data from our systems. We will honor such requests to the extent permitted by law — for example, we may be required to retain certain transaction records for legal or accounting purposes.",
      },
      {
        subtitle: "Data Portability",
        text: "You have the right to receive your personal data in a structured, machine-readable format. Contact us to request a copy of the data associated with your account.",
      },
    ],
  },
  {
    id: "06",
    title: "Children's Privacy",
    content: [
      {
        subtitle: "Age Restriction",
        text: "Our website and services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a minor, please contact us immediately so we can delete it promptly.",
      },
    ],
  },
  {
    id: "07",
    title: "Changes to This Policy",
    content: [
      {
        subtitle: "Updates",
        text: "We may revise this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will update the effective date at the top of this page and, where appropriate, notify you by email. Continued use of our services after changes take effect constitutes your acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "08",
    title: "Contact Us",
    content: [
      {
        subtitle: "Get In Touch",
        text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, you may contact our team at privacy@kaleemssons.com or write to us at our registered business address. We aim to respond to all inquiries within 5 business days.",
      },
    ],
  },
]

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 26, 2026"

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pp-root {
          background: #fff;
          color: #111;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          margin-top: 30px;
        }

        .pp-hero {
          border-bottom: 1px solid #111;
          padding: 4rem 6% 3rem;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 2rem;
        }
        .pp-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 1.2rem;
        }
        .pp-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 9vw, 8rem);
          line-height: 0.9;
          letter-spacing: 0.01em;
          color: #111;
        }
        .pp-headline span {
          display: block;
          color: black;
          -webkit-text-stroke: 1.5px #111;
        }
        .pp-meta {
          text-align: right;
          font-size: 0.75rem;
          color: #888;
          line-height: 1.8;
        }
        .pp-meta strong {
          display: block;
          color: #111;
          font-weight: 500;
          font-size: 0.8rem;
        }

        .pp-intro {
          border-bottom: 1px solid #e0e0e0;
          padding: 2.5rem 6%;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: center;
        }
        .pp-intro-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
          color: #black;
        }
        .pp-intro-text {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #333;
          max-width: 640px;
        }

        .pp-toc {
          border-bottom: 1px solid #e0e0e0;
          padding: 2rem 6%;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 2rem;
        }
        .pp-toc-item {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #555;
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .pp-toc-item:hover { color: #111; }
        .pp-toc-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          color: #ccc;
        }

        .pp-body {
          padding: 0 6% 6rem;
        }
        .pp-section {
          border-bottom: 1px solid #e0e0e0;
          padding: 3.5rem 0;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 3rem;
        }
        .pp-section:last-child { border-bottom: none; }

        .pp-section-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4.5rem;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px #ddd;
          display: block;
          margin-bottom: 0.6rem;
        }
        .pp-section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          font-weight: 400;
          line-height: 1.3;
          color: #111;
        }

        .pp-section-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .pp-entry-subtitle {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #111;
          margin-bottom: 0.6rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #111;
          display: inline-block;
        }
        .pp-entry-text {
          font-size: 0.93rem;
          line-height: 1.85;
          color: #444;
          font-weight: 300;
        }

        .pp-footer {
          background: #111;
          color: #fff;
          padding: 2.5rem 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .pp-footer-brand {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.05em;
        }
        .pp-footer-links {
          display: flex;
          gap: 2rem;
        }
        .pp-footer-link {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #888;
          text-decoration: none;
          transition: color 0.2s;
        }
        .pp-footer-link:hover { color: #fff; }
        .pp-footer-copy {
          font-size: 0.7rem;
          color: #555;
        }

        @media (max-width: 768px) {
          .pp-hero { grid-template-columns: 1fr; padding: 3rem 5% 2rem; }
          .pp-meta { text-align: left; }
          .pp-intro { grid-template-columns: 1fr; gap: 1rem; padding: 2rem 5%; }
          .pp-toc { padding: 1.5rem 5%; }
          .pp-body { padding: 0 5% 4rem; }
          .pp-section { grid-template-columns: 1fr; gap: 1.2rem; padding: 2.5rem 0; }
          .pp-section-num { font-size: 3rem; }
          .pp-footer { flex-direction: column; align-items: flex-start; gap: 1.2rem; }
          .pp-footer-links { flex-wrap: wrap; gap: 1rem; }
        }
      `}</style>

      <div className="pp-root">

        <section className="pp-hero">
          <div>
            <p className="pp-eyebrow">Legal · Data Practices</p>
            <h1 className="pp-headline">
              Privacy
              <span>Policy</span>
            </h1>
          </div>
          <div className="pp-meta">
            <strong>Effective Date</strong>
            {lastUpdated}
            <br /><br />
            <strong>Version</strong>
            1.0
          </div>
        </section>

        <section className="pp-intro">
          <p className="pp-intro-label">Our Commitment</p>
          <p className="pp-intro-text">
            At Kaleem Sons, your privacy is not an afterthought — it is foundational to how we operate.
            This policy explains plainly what data we collect, why we collect it, and how we protect it.
          </p>
        </section>

        <nav className="pp-toc" aria-label="Contents">
          {sections.map(s => (
            <a key={s.id} href={`#section-${s.id}`} className="pp-toc-item">
              <span className="pp-toc-num">{s.id}</span>
              {s.title}
            </a>
          ))}
        </nav>

        <main className="pp-body">
          {sections.map(s => (
            <section key={s.id} id={`section-${s.id}`} className="pp-section">
              <div>
                <span className="pp-section-num">{s.id}</span>
                <h2 className="pp-section-title">{s.title}</h2>
              </div>
              <div className="pp-section-right">
                {s.content.map((entry, i) => (
                  <div key={i}>
                    <p className="pp-entry-subtitle">{entry.subtitle}</p>
                    <p className="pp-entry-text">{entry.text}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

      </div>
    </>
  )
}