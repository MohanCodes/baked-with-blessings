import React from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TrustAndSafety() {
  return (
    <>
      <Navbar showOrderButton={false} />
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6">Trust and Safety</h1>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">1. Our Commitment</h3>
          <p>
            At Baked with Blessings, your trust and safety are our top priorities. We are dedicated to providing delicious cookies in a manner that is safe, transparent, and respectful to our customers and community.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">2. Food Safety Practices</h3>
          <ul className="list-disc ml-6">
            <li>We follow strict hygiene and food safety protocols in our home kitchen.</li>
            <li>All baking surfaces and utensils are cleaned and sanitized before use.</li>
            <li>Cookies are packaged to minimize handling and exposure.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">3. Ingredient Transparency</h3>
          <ul className="list-disc ml-6">
            <li>We list all major ingredients and allergens for each cookie flavor on our website.</li>
            <li>If you have questions about ingredients or potential allergens, please contact us before ordering.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">4. Customer Communication</h3>
          <ul className="list-disc ml-6">
            <li>We strive to respond promptly to all customer inquiries and concerns.</li>
            <li>If you need to change or cancel an order, please reach out as soon as possible.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">5. Reporting Concerns</h3>
          <p>
            If you experience any issues with your order or have safety concerns, please contact us immediately. We take all reports seriously and will work with you to resolve any problems.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">6. Community Standards</h3>
          <ul className="list-disc ml-6">
            <li>We are committed to treating all customers with respect and courtesy.</li>
            <li>We reserve the right to refuse service to anyone who engages in abusive or unsafe behavior.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">7. Updates to This Policy</h3>
          <p>
            We may update this Trust and Safety policy from time to time. Changes will be posted on this page and are effective immediately upon posting.
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-semibold mb-2">8. Contact Information</h3>
          <p>
            If you have any questions or concerns about trust and safety, please contact us at <a href="mailto:bakedwithblessings@gmail.com" className="underline text-blue-600">bakedwithblessings@gmail.com</a>.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
} 