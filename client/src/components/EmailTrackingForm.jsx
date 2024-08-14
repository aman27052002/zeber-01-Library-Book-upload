import React, { useState } from "react";
import axios from "axios";

export default function EmailTrackingForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:3000/submit-email', { email });
      setSubmitted(true);
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="p-8 rounded-3xl shadow-lg w-full max-w-lg mx-auto space-y-6 border border-gray-200 bg-gray-50">
      {submitted ? (
        <p className="text-center text-lg text-gray-700 mt-4">
          Thank you! We've received your email. You will be notified about your book's status.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Enter email to track your book confirmation
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition-transform duration-300 ease-in-out focus:outline-blue-500 hover:shadow-xl bg-gray-50"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit
          </button>
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}
