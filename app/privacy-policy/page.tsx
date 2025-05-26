import React from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar showOrderButton={false} />
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">1. Introduction</h3>
          <p>
            Baked with Blessings values your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">2. Information We Collect</h3>
          <ul className="list-disc ml-6">
            <li>Information you provide when placing an order, such as your name, email address, phone number, and order details.</li>
            <li>Information you provide when contacting us for support or inquiries.</li>
            <li>Basic technical information, such as your IP address and browser type, collected automatically for analytics and security.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h3>
          <ul className="list-disc ml-6">
            <li>To process and fulfill your orders.</li>
            <li>To communicate with you about your order or respond to your inquiries.</li>
            <li>To improve our website and services.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">4. Cookies</h3>
          <p>
            Our website may use cookies and similar technologies to enhance your browsing experience. You can adjust your browser settings to refuse cookies, but some features of the site may not function properly.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">5. Data Sharing</h3>
          <ul className="list-disc ml-6">
            <li>We do not sell or rent your personal information to third parties.</li>
            <li>We may share your information with service providers who help us operate our business (such as payment processors), but only as necessary and with appropriate safeguards.</li>
            <li>We may disclose information if required by law or to protect our rights and safety.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">6. Data Security</h3>
          <p>
            We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">7. Your Rights</h3>
          <ul className="list-disc ml-6">
            <li>You may request access to, correction of, or deletion of your personal information by contacting us.</li>
            <li>You may opt out of marketing communications at any time.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page and are effective immediately upon posting.
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-semibold mb-2">9. Contact Information</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:bakedwithblessings@gmail.com" className="underline text-blue-600">bakedwithblessings@gmail.com</a>.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
} 