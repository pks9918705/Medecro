import React, { useState, useEffect } from "react";
import axios from "axios";
import Doctor from "./Doctor";

const DoctorHome = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch patients from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/patients");
        console.log(response.data)
        setPatients(response.data);
         
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };
    fetchPatients();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = patients.filter((patient) =>
      patient.email.toLowerCase().includes(value)
    );
    setFilteredPatients(filtered);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm("");
    setFilteredPatients([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Search bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a Patient using email below will be the Name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 pr-10 text-lg border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
        {/* Icon on the right */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M18.83 10.83a7 7 0 10-1.414 1.414L21 21"
            ></path>
          </svg>
        </div>

        {/* Dropdown */}
        {searchTerm && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg top-full mt-2 max-h-60 overflow-y-auto z-10">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <li
                  key={patient._id}
                  onClick={() => handleSelectPatient(patient)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {patient.userName}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No patients found</li>
            )}
          </ul>
        )}
      </div>

      {/* Show patient details when selected */}
      {selectedPatient && <Doctor patient={selectedPatient} />}
    </div>
  );
};

export default DoctorHome;
