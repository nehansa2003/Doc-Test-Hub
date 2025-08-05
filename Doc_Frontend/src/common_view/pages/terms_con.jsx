import React from "react";
import Head from '../components/Logo _title';
import FootSection from '../components/footer';
function TermsAndConditions() {
  return (
    <>
    <Head/>
    <div
      className="position-relative min-vh-100 d-flex align-items-center justify-content-center px-3 py-5"
      style={{
        background: "linear-gradient(135deg, #dcedc8, #a5d6a7, #81c784)",
        overflow: "hidden",
      }}
    >
      {/* Decorative green bubbles */}
      {[
        bubbleStyle("#a5d6a7", 120, "8%", "10%"),
        bubbleStyle("#c8e6c9", 90, "80%", "8%"),
        bubbleStyle("#b9f6ca", 110, "50%", "85%"),
        bubbleStyle("#dcedc8", 100, "25%", "75%"),
        bubbleStyle("#b2fab4", 95, "65%", "70%"),
        bubbleStyle("#c5e1a5", 80, "35%", "20%"),
        bubbleStyle("#aed581", 60, "90%", "60%"),
      ]}

      {/* Main content card */}
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          maxWidth: "950px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "1rem",
          zIndex: 1,
        }}
      >
        <div className="card-body text-dark">
          <h1 className="text-center text-success fw-bold mb-2">Terms and Conditions</h1>
          <p className="text-center text-muted mb-4">Effective Date: 01/01/2025</p>

          <p>
            Welcome to <strong>Doc & Test Hub</strong>. By accessing or using our services, you agree to the
            following terms and conditions. Please read and understand them carefully.
          </p>

          <h5 className="text-success fw-bold mt-4">1. Acceptance of Terms</h5>
          <p>
            By registering, booking, or using any features on Doc & Test Hub, you agree to comply with
            and be bound by these Terms and Conditions. If you do not agree, please do not use our platform.
          </p>

          <h5 className="text-success fw-bold mt-4">2. Eligibility</h5>
          <p>
            Our services are available only to individuals who can form legally binding contracts under
            applicable law. By using this site, you represent that you are at least 18 years old or using
            it under the supervision of a legal guardian.
          </p>

          <h5 className="text-success fw-bold mt-4">3. Services Provided</h5>
          <ul>
            <li>Booking doctor appointments</li>
            <li>Scheduling medical tests</li>
          </ul>
          <p>
            We are not a healthcare provider, but a platform connecting users with healthcare
            professionals and diagnostic services.
          </p>

          <h5 className="text-success fw-bold mt-4">4. Booking Policy</h5>
          <p>
            Appointments can be scheduled up to 7 days in advance for doctors and 90 days for medical tests.
            Booking is confirmed only after receiving a confirmation message or email.
          </p>

          <h5 className="text-success fw-bold mt-4">5. Cancellation and Refunds</h5>
          <p>
            Appointments can be canceled through the "My Bookings" page. Refunds are subject to individual
            clinic or test center policies and may not be processed by Doc & Test Hub directly.
          </p>

          <h5 className="text-success fw-bold mt-4">6. Document and Requirement Compliance</h5>
          <p>
            Medical tests may require supporting documents (e.g., doctor’s approval chit). Failure to provide
            required documents may result in denial of service at the test center.
          </p>

          <h5 className="text-success fw-bold mt-4">7. User Responsibilities</h5>
          <ul>
            <li>Ensure all provided information is accurate and up-to-date.</li>
            <li>Attend scheduled appointments/tests on time.</li>
            <li>Do not share your login credentials.</li>
          </ul>

          <h5 className="text-success fw-bold mt-4">8. Communications</h5>
          <p>
            By registering, you agree to receive appointment confirmations, reminders (email/SMS), and
            other service-related messages.
          </p>

          <h5 className="text-success fw-bold mt-4">9. Data Privacy</h5>
          <p>
            We value your privacy. Please review our <strong>Privacy Notice</strong> to understand how your
            data is collected, stored, and used.
          </p>

          <h5 className="text-success fw-bold mt-4">10. Limitation of Liability</h5>
          <p><strong>Doc & Test Hub</strong> is not liable for:</p>
          <ul>
            <li>Issues between users and healthcare providers.</li>
            <li>Cancellations or rescheduling by doctors/test centers.</li>
            <li>Damages resulting from inaccurate user information.</li>
          </ul>

          <h5 className="text-success fw-bold mt-4">11. Modifications</h5>
          <p>
            We reserve the right to modify these terms at any time. Updates will be posted with the
            effective date.
          </p>

          <h5 className="text-success fw-bold mt-4">12. Governing Law</h5>
          <p>
            These Terms are governed by the laws of Sri Lanka and comply with the Personal Data Protection
            Act No.9 of 2022 (PDPA).
          </p>

          <h5 className="text-success fw-bold mt-4">Contact</h5>
          <p>
            If you have questions about these terms, please contact us at:<br />
            <strong>Phone:</strong> 011-1234567<br />
            <strong>Email:</strong> support@docandtesthub.com
          </p>
        </div>
      </div>
    </div>
    <FootSection/>
    </>
  );
}

// ✅ FIXED bubbleStyle function
function bubbleStyle(color, size, left, top) {
  return (
    <div
      key={`${color}-${left}-${top}`}
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: color,
        opacity: 0.25,
        boxShadow: `0 0 20px ${color}`,
        left,
        top,
        zIndex: 0,
        filter: "blur(2px)",
      }}
    />
  );
}

export default TermsAndConditions;
