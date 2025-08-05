import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./search_doctor.css";
import Header from '../components/Logo _title';
import FootSection from '../components/footer';

function SearchDoctors() {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (name.length > 0) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/search-doctors/?Name=${encodeURIComponent(name)}&Specialization=${encodeURIComponent(specialty)}`
          );
          const data = await response.json();
          if (!data.results?.length && data.suggestions?.length) {
            setSuggestions(data.suggestions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [name, specialty]);

  const handleSuggestionClick = (suggestedName) => {
    setName(suggestedName);
    setShowSuggestions(false);
  };

  const search = async () => {
    try {
      const query = `?Name=${name}&Specialization=${specialty}`;
      const response = await fetch(`http://localhost:8000/api/search-doctors/${query}`);
      const data = await response.json();
      if (data.form_valid) {
        setResults(Array.isArray(data.search_results) ? data.search_results : []);
        setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
        setSelectedDoctorDetails(data.selected_doctor_details || null);
        setShowSuggestions(false);
      } else {
        setResults([]);
        setSuggestions([]);
        setSelectedDoctorDetails(null);
        console.error("Invalid input.");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="search-doctors-container">
        <h2 className="title">Search Doctors</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter doctor's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestion-box">
              {suggestions.map((s, idx) => (
                <li key={idx} onClick={() => handleSuggestionClick(s)}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          placeholder="Specialty (optional)"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="input-field"
        />

        <button onClick={search} className="search-button">
          <FaSearch /> Search
        </button>

        <ul className="results-list">
          {results.map(doc => (
            <li key={doc.Doc_ID} className="result-item">
              <strong>{doc.Name}</strong><br />
              Specialty: {doc.Specialization}<br />
              Payment: {doc.Payment}<br />
              Channeling Date & Time:&nbsp;
              {typeof doc.Ch_date_time === 'object' && doc.Ch_date_time !== null
                ? Object.entries(doc.Ch_date_time).map(
                    ([day, time]) =>
                      `${day}: ${time.start} - ${time.end}`
                  ).join(', ')
                : (doc.Ch_date_time || 'Not Available')}
            </li>
          ))}
        </ul>

        {results.length === 0 && suggestions.length > 0 && (
          <div className="no-results">
            <p>No exact match found. Did you mean:</p>
            <ul>
              {suggestions.map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
          </div>
        )}
      </div>
      <FootSection />
    </>
  );
}

export default SearchDoctors;
