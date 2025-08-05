import React, { useEffect, useState } from "react";
import Header from "../../common_view/components/Logo _title";
import FootSection from "../../common_view/components/footer";

function RemovePanel() {
  const [search, setSearch] = useState({
    admins: "",
    doctors: "",
    staff: "",
    tests: "",
  });

  const [records, setRecords] = useState({
    admins: [],
    doctors: [],
    staff: [],
    tests: [],
  });

  const IDFieldMap = {
    admins: "Ad_ID",
    doctors: "Doc_ID",
    staff: "St_ID",
    tests: "Test_ID",
  };

  // Fetch all data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [admins, doctors, staff, tests] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/admins/").then((res) => res.json()),
          fetch("http://127.0.0.1:8000/api/doctors/").then((res) => res.json()),
          fetch("http://127.0.0.1:8000/api/staff/").then((res) => res.json()),
          fetch("http://127.0.0.1:8000/api/tests/").then((res) => res.json()),
        ]);
        setRecords({ admins, doctors, staff, tests });
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRemove = async (type, record) => {
    if (!window.confirm("Are you sure you want to remove this record?")) return;

    const idKey = IDFieldMap[type];
    const id = record[idKey];

    let url = "";
    switch (type) {
      case "admins":
        url = `http://127.0.0.1:8000/api/admins/${id}/delete/`;
        break;
      case "doctors":
        url = `http://127.0.0.1:8000/api/doctors/${id}/delete/`;
        break;
      case "staff":
        url = `http://127.0.0.1:8000/api/staff/${id}/delete/`;
        break;
      case "tests":
        url =  `http://127.0.0.1:8000/api/tests/${id}/delete/`; 
        break;
      default:
        alert("Invalid type");
        return;
    }

    try {
      const response = await fetch(url, { method: "DELETE" });

      if (response.ok) {
        alert(`${type.slice(0, -1)} removed successfully`);
        setRecords((prev) => ({
          ...prev,
          [type]: prev[type].filter((item) => item[idKey] !== id),
        }));
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server error");
    }
  };

  const filtered = (type) =>
    records[type].filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search[type].toLowerCase())
    );

  const sectionStyle = {
    background: "#f5f5f5",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginBottom: "2rem",
    boxShadow: "0 0 15px rgba(0, 128, 0, 0.1)",
  };

  const renderTable = (type, columns) => {
    const idKey = IDFieldMap[type];
    return (
      <div style={sectionStyle} key={type}>
        <h4 className="text-success text-center text-capitalize mb-3">{type}</h4>
        <input
          type="text"
          className="form-control mb-3"
          placeholder={`Search ${type}`}
          value={search[type]}
          onChange={(e) => setSearch({ ...search, [type]: e.target.value })}
        />
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-success">
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filtered(type).map((item) => (
                <tr key={item[idKey]}>
                  {columns.map((col) => (
                    <td key={`${item[idKey]}-${col.key}`}>{item[col.key]}</td>
                  ))}
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(type, item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div
        className="container py-5"
        style={{
          background: "linear-gradient(to right, #e8f5e9, #f5f5f5)",
          minHeight: "100vh",
        }}
      >
        <h2 className="text-center text-success fw-bold mb-4">
          Remove Admins, Doctors, Staff, and Tests
        </h2>

        {renderTable("admins", [
          { key: "Ad_ID", label: "ID" },
          { key: "Name", label: "Name" },
        ])}

        {renderTable("doctors", [
          { key: "Doc_ID", label: "ID" },
          { key: "Name", label: "Name" },
          { key: "Specialization", label: "Specialized In" },
        ])}

        {renderTable("staff", [
          { key: "St_ID", label: "ID" },
          { key: "Name", label: "Name" },
          { key: "Role", label: "Role" },
        ])}

        {renderTable("tests", [
          { key: "Test_ID", label: "ID" },
          { key: "Name", label: "Name" },
        ])}
      </div>
      <FootSection />
    </>
  );
}

export default RemovePanel;
