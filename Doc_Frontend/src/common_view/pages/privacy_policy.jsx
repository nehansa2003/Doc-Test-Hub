import React from "react";
import Head from "../components/Logo _title";
import FootSection from "../components/footer";
function PrivacyPolicy() {
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
        ["#a5d6a7", 120, "8%", "10%"],
        ["#c8e6c9", 90, "80%", "8%"],
        ["#b9f6ca", 110, "50%", "85%"],
        ["#dcedc8", 100, "25%", "75%"],
        ["#b2fab4", 95, "65%", "70%"],
        ["#c5e1a5", 80, "35%", "20%"],
        ["#aed581", 60, "90%", "60%"],
      ].map(([color, size, left, top], index) =>
        bubbleStyle(color, size, left, top, index)
      )}

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
          <h1 className="text-center text-success fw-bold mb-2">Privacy Policy</h1>
          <p className="text-center text-muted">Version: 1.0 &nbsp; | &nbsp; Updated On: 13 May 2025</p>
          <hr className="mb-4" />

          <p>
            <strong>Doc & Test Hub</strong>: Easy Appointments for Care, operated by Doc & Test Health Solutions (Private) Limited, its subsidiaries, and affiliates (hereinafter collectively referred to as “Doc & Test Hub”, “we”, “us” or “our”), is committed to protecting the personal data of our patients, doctors, staff, partners, visitors, and others interacting with our platform (collectively referred to as “data subjects”). We take privacy seriously and our data practices are aligned with our core values of <strong>T.R.U.S.T</strong>: being <strong>Transparent</strong>, respecting your <strong>Rights</strong>, ensuring ethical <strong>Use</strong> of personal data, maintaining robust <strong>Security</strong>, and handling <strong>Transfer</strong> of data with utmost care.
          </p>

          <h5 className="text-success fw-bold mt-4">Personal Data We Collect and Process</h5>
          <p>We may collect and process the following categories of personal data:</p>
          <ul>
            <li><strong>Patients:</strong> Name, age, gender, address, email, phone number, username, password, medical history (if applicable), doctor appointment details, medical test details, uploaded documents.</li>
            <li><strong>Doctors:</strong> Name, specialization, availability, registration/license number, contact details.</li>
            <li><strong>Staff:</strong> Contact details, roles, and access permissions.</li>
            <li>In some cases, data may be collected from public sources, partners, or authorities.</li>
          </ul>

          <h5 className="text-success fw-bold mt-4">Purposes for Data Collection</h5>
          <ul>
            <li>To manage registration and login on the platform.</li>
            <li>To facilitate scheduling of doctor consultations and medical tests.</li>
            <li>To validate documents and referrals.</li>
            <li>To send reminders (email/SMS) before appointments/tests.</li>
            <li>To verify identities and provide secure access.</li>
            <li>To comply with legal and regulatory obligations.</li>
            <li>To improve services and perform research or audits (anonymized).</li>
          </ul>

          <h5 className="text-success fw-bold mt-4">Legal Basis for Processing</h5>
          <p>We process your personal data based on:</p>
          <ul>
            <li><strong>Consent</strong> — given at registration or during service use.</li>
            <li><strong>Contractual necessity</strong> — to provide services.</li>
            <li><strong>Legal obligations</strong> — to comply with laws.</li>
            <li><strong>Legitimate interests</strong> — like security or service improvement.</li>
          </ul>

          <h5 className="text-success fw-bold mt-4">Data Disclosure and Sharing</h5>
          <p>We may share your data with:</p>
          <ul>
            <li>Licensed doctors and medical test providers.</li>
            <li>Diagnostic centers you select via our system.</li>
            <li>Service providers for notifications, hosting, or maintenance.</li>
            <li>Regulators or authorities if legally required.</li>
            <li><strong>Note:</strong> We do not sell your personal data under any circumstances.</li>
          </ul>

          <h5 className="text-success fw-bold mt-4">Data Security and Retention</h5>
          <p>We use encryption, secure login protocols, and access control to protect your data. We retain personal data:</p>
          <ul>
            <li>Only as long as needed for listed purposes.</li>
            <li>In compliance with laws or until deletion is requested (if permitted).</li>
          </ul>

          <h5 className="text-success fw-bold mt-4">Your Rights as a Data Subject</h5>
          <ul>
            <li>Access, update, or correct your personal data.</li>
            <li>Withdraw consent at any time (if applicable).</li>
            <li>Request deletion or restriction of processing.</li>
            <li>Object to certain uses (e.g., marketing).</li>
            <li>File a complaint with a data authority.</li>
          </ul>

          <h5 className="text-success fw-bold mt-4">Providing Third Party Data</h5>
          <p>
            If you provide another individual’s data (e.g., booking a test for family), you confirm their consent for us to process that data according to this notice.
          </p>

          <h5 className="text-success fw-bold mt-4">Updates to This Notice</h5>
          <p>
            We may revise this policy periodically. Any changes will be posted here and/or in-app. Continued use means you accept the updated notice.
          </p>

          <h5 className="text-success fw-bold mt-4">Contact Us</h5>
          <p>
            <strong>Privacy Officer</strong><br />
            Doc & Test Hub – Privacy Division<br />
            Email: <a href="mailto:privacy@docandtesthub.com">privacy@docandtesthub.com</a><br />
            Phone: +94-123-456789
          </p>
        </div>
      </div>
    </div>
    <FootSection/>
    </>
  );
}
import Header from "../components/Logo _title";

// ✅ Corrected bubble style function
function bubbleStyle(color, size, left, top, index) {
  return (
    <div
      key={`bubble-${index}`}
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: color,
        opacity: 0.25,
        boxShadow: `0 0 20px ${color}`,
        left: left,
        top: top,
        zIndex: 0,
        filter: "blur(2px)",
      }}
    />
  );
}

export default PrivacyPolicy;
