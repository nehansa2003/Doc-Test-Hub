import React from "react";
import Nav_bar_1 from "../../Admin_view/components/ad_nav_bar";
import Nav_bar_2 from "../../Doctor_view/components/doc_nav_bar";
import Nav_bar_3 from "../../PatientView/Components/Pa_nav_bar";
import Nav_bar_4 from "../../staff_view/components/st_nav_bar";
import Front_nav from "../components/front_navbar";
import Header from "../components/Logo _title";
import FootSection from "../components/footer";

function AboutUs() {
  //const role=localStorage.getItem("userRole");
  // const renderNavbar=()=>{
  //   switch('Role'){
  //     case "Admin":
  //       return <Nav_bar_1/>;
  //     case "Doctor":
  //       return <Nav_bar_2/>
  //     case "Patient":
  //       return<Nav_bar_3/>
  //     case "Staff":
  //       return <Nav_bar_4/>
  //     default:
  //       return <Front_nav/>
  //   }
  // }
  return (

    <>
     <Header/>



     <div
      className="position-relative min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{
        background: "linear-gradient(135deg, #dcedc8, #a5d6a7, #81c784)",
        overflow: "hidden",
      }}
    >
      {/* Decorative green bubbles */}
      {[
        { color: "#a5d6a7", size: 120, left: "10%", top: "15%" },
        { color: "#81c784", size: 100, left: "80%", top: "10%" },
        { color: "#c8e6c9", size: 140, left: "50%", top: "85%" },
        { color: "#aed581", size: 90, left: "20%", top: "70%" },
        { color: "#dcedc8", size: 110, left: "70%", top: "75%" },
        { color: "#c5e1a5", size: 80, left: "30%", top: "25%" },
        { color: "#b9f6ca", size: 100, left: "60%", top: "30%" },
        { color: "#c8facc", size: 70, left: "15%", top: "85%" },
        { color: "#e0f7fa", size: 60, left: "85%", top: "60%" },
        { color: "#b2fab4", size: 90, left: "40%", top: "10%" },
      ].map(({ color, size, left, top }, index) =>
        bubbleStyle(color, size, left, top, index)
      )}

      {/* Main Content Card */}
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          maxWidth: "900px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "1rem",
          zIndex: 1,
        }}
      >
        <div className="card-body text-dark">
          <h1 className="text-center fw-bold text-success mb-3">About Us</h1>
          <p className="text-center fs-5 text-muted mb-4">
            Your trusted platform for Doctor Appointments & Medical Tests
          </p>

          <p>
            At <strong>Doc & Test Hub</strong>, our mission is to make your healthcare experience{" "}
            <strong>easier, faster, and more comfortable</strong>. We know how stressful it can be to
            find the right doctor or schedule medical tests, so we built a platform where you can do
            both in one place. Whether you need to book a doctor's appointment or schedule a test,
            everything can be done quickly from your phone or computer—no more long lines or confusing
            paperwork.
          </p>

          <p>
            We are here to support you every step of the way. Our system is easy to use and helps you
            stay updated with reminders and important information. We believe everyone deserves easy
            access to quality healthcare, and our goal is to give you more control, comfort, and peace
            of mind when managing your health.
          </p>

          <hr className="my-4" />

          <h4 className="text-success fw-bold mb-3">Why We Differ from Others</h4>
          <ul className="list-unstyled ps-3">
            <li className="mb-2">✔ Quick appointments for doctor consultations and medical tests</li>
            <li className="mb-2">✔ See available (green) and booked (red) time slots before booking</li>
            <li className="mb-2">✔ Email/SMS reminders before your appointment or test</li>
            <li className="mb-2">✔ View test requirements, documents, or items needed clearly</li>
            <li className="mb-2">✔ Easily manage your appointments from your dashboard</li>
            <li className="mb-2">✔ Search doctors by name or specialty; search tests by name</li>
          </ul>

          <hr className="my-4" />

          <p>
            We warmly invite you to join <strong>Doc & Test Hub</strong> and take the first step toward
            easier, stress-free healthcare.
          </p>
          <p>
            Our platform is open to everyone who wants quick access to trusted doctors and reliable
            medical tests—all in one place. Let us take care of the process so you can focus on what
            matters most: <strong>your health and well-being</strong>.
          </p>
        </div>
      </div>
    </div>

    <FootSection/>
    </>
  );
}

// ✅ Bubble style function
function bubbleStyle(color, size, left, top, key) {
  return (
    <div
      key={key}
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

export default AboutUs;
