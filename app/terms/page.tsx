import React from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    <>
      <Navbar showOrderButton={false} />
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">1. Introduction</h3>
          <p>
            Welcome to Baked with Blessings! By placing an order with us, you agree to the following terms and conditions. Please read them carefully before ordering.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">2. Orders & Payment</h3>
          <ul className="list-disc ml-6">
            <li>Payment is due in person at the time of pickup. We accept cash and other payment methods as listed at pickup.</li>
            <li>Order details, including pickup date and time, must be confirmed at checkout.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">3. Pickup Policy</h3>
          <ul className="list-disc ml-6">
            <li>All orders are for pickup only at West Metro Chinese Church, 6015 Penn Ave S, Minneapolis, MN 55419.</li>
            <li>Pickup is available during the designated time slots selected at checkout.</li>
            <li>If you are unable to pick up your order at the scheduled time, please contact us as soon as possible to make alternate arrangements.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">4. Allergens & Food Safety</h3>
          <ul className="list-disc ml-6">
            <li>Our cookies are made in a home kitchen that processes common allergens, including but not limited to wheat, dairy, eggs, soy, and nuts.</li>
            <li>We do our best to list all major allergens in our product descriptions, but cannot guarantee the absence of cross-contamination.</li>
            <li>If you have a severe allergy, please contact us before ordering.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">5. Refunds & Cancellations</h3>
          <ul className="list-disc ml-6">
            <li>If you need to cancel your order, please notify us at least 24 hours before your scheduled pickup time.</li>
            <li>Refunds are issued at our discretion. No refunds will be given for missed pickups without prior notice.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h3>
          <p>
            Baked with Blessings is not liable for any damages or injuries resulting from the consumption of our products, including allergic reactions. Customers are responsible for reviewing ingredient and allergen information before ordering.
          </p>
        </section>
        <section className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">7. Changes to Terms</h3>
          <p>
            We reserve the right to update these Terms of Service at any time. Changes will be posted on this page and are effective immediately upon posting.
          </p>
        </section>
        <section>
          <h3 className="text-2xl font-semibold mb-2">8. Contact Information</h3>
          <p>
            If you have any questions about these terms, please contact us at <a href="mailto:bakedwithblessings@gmail.com" className="underline text-blue-600">bakedwithblessings@gmail.com</a>.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
} 