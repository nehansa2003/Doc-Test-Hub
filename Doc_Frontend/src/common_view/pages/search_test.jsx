import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import "./search_test.css";
import Header from '../components/Logo _title';
import FootSection from '../components/footer';

function SearchTests() {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [details, setDetails] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (name.trim().length > 0) {
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/search-tests/?name=${encodeURIComponent(name)}`);
          const data = await res.json();

          if (data.search_results.length === 0 && data.suggestions?.length > 0) {
            setSuggestions(data.suggestions);
            setShowSuggestions(true);
            setDetails(null);
            setResults([]);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }

        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setResults([]);
        setDetails(null);
      }
    };

    fetchSuggestions();
  }, [name]);

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion);
    setShowSuggestions(false);
  };
  

  const search = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/search-tests/?name=${encodeURIComponent(name)}`);
      const data = await res.json();

      if (data.form_valid) {
        setResults(data.search_results || []);
        setSuggestions(data.suggestions || []);
        setDetails(data.selected_test_details || null);
        setShowSuggestions(false);
      } else {
        setResults([]);
        setSuggestions([]);
        setDetails(null);
      }

    } catch (error) {
      console.error('Error searching tests:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="search-container">
        <h2 className="heading">Search Medical Tests</h2>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter test name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="search-input"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((s, idx) => (
                <li key={idx} onClick={() => handleSuggestionClick(s)}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        <button className="search-button" onClick={search}>
          <FaSearch /> Search
        </button>

        {/* Display basic matched test names */}
        <ul className="results-list">
          {results.map(test => (
            <li key={test.id} className="result-item">
              <strong>{test.name}</strong>
            </li>
          ))}
        </ul>

        {/* Display test details */}
        {/* Display test details */}
{details && (() => {
  const precautionsObj = details.precautions || {};
  const requirementsObj = details.requirements || {};

  return (
    <div className="result-details">
      <strong>Test Name:</strong> {details.Name || 'Name'} <br />

      <strong>Requirements:</strong>
      <ul>
        {Object.entries(requirementsObj).map(([key, val]) => (
          <li key={key}>{val}</li>
        ))}
      </ul>

      <strong>Available:</strong> Yes<br />

      <strong>Precautions:</strong>
      <ul>
        {Object.entries(precautionsObj).map(([key, val]) => (
          <li key={key}>{val}</li>
        ))}
      </ul>

      <strong>Time for One Person:</strong> {details.time_for_one_person} minutes<br />
      <strong>Payment:</strong> Rs {details.payment}
    </div>
  );
})()}


        {/* If no results, show suggestions */}
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

export default SearchTests;
