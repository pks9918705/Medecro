import axios from "axios";
import {ref, push, set} from "./firebase";
import { db } from "./firebase";
import React, {useCallback, useEffect, useState} from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,

    AreaChart,

    Area

} from 'recharts';
import {useMetaMask} from "../../context/MetaMaskContext";
import { useNavigate } from "react-router-dom";


const data = [
    {
        time: '2024-09-01',
        cognitiveFunction: 75,
        moodBehaviorChange: 20
    },
    {
        time: '2024-09-02',
        cognitiveFunction: 80,
        moodBehaviorChange: 25
    },
    {
        time: '2024-09-03',
        cognitiveFunction: 65,
        moodBehaviorChange: 30
    },
    {
        time: '2024-09-04',
        cognitiveFunction: 70,
        moodBehaviorChange: 35
    }, {
        time: '2024-09-05',
        cognitiveFunction: 85,
        moodBehaviorChange: 40
    }
];


const Doctor = ({patient}) => {
    const [patData, setPatData] = useState(patient); // Initialize state with patient prop
    const {contract, account, user} = useMetaMask(); // MetaMask hook for contract

    const [file, setFile] = useState(null); // State to store the selected file
    const [fileName, setFileName] = useState("No image selected"); // State to store the file name

    const [files, setFiles] = useState([])
    const [prescription, setPrescription] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setPatData(patient);
            // Ensure state updates when component mounts or patient prop changes

            // Fetch files and update the state
            const fetchedFiles = await getdata();
            setFiles(fetchedFiles);

            // Log patient data after updating state
            console.log("Patient data:", patData.accountAddress);
        };

        fetchData(); // Call the async function

    }, [patient]);

     

    // Sharing
    const sharing = async () => {
        try { // Validate if the required data exists before proceeding
            if (!patData || !patData.accountAddress) {
                throw new Error("Account address not available in patData.");
            }

            if (!contract) {
                throw new Error("Smart contract instance not initialized.");
            }

            console.log("Sharing access to account:", patData.accountAddress);

            // Call the contract's allow function
            const result = await contract.allow(patData.accountAddress);

             
            const userId = patData._id;
            // Generate a new key for each shared access entry
            const newShareRef = push(ref(db, `sharedAccess/${userId}`));

            // Store recipient's account address and doctor's ID
            await set(newShareRef, {
                doctorAccountAddress: user.accountAddress,
                patientAccountAddress: patData.accountAddress,
                timestamp: Date.now() // Optional: you can also add a timestamp
            });

            console.log("Shared access data stored in Firebase.");

            console.log("Contract allow result:", result);
            alert(`Access successfully granted to ${
                patData.accountAddress
            }`);
        } catch (error) { // Handle any error that might occur and log it for debugging
            console.error("Error in sharing function:", error);
            alert(`Failed to share access: ${
                error.message
            }`);
        }
    };

    // Function to handle file upload
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (file) {
            try {
                const formData = new FormData(); // Create a FormData object to send the file
                formData.append("file", file);
                // Append the file to FormData

                // Upload the file to Pinata
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `f4ef1d813a6bc451c3e1`, // Replace with your Pinata API key
                        pinata_secret_api_key: `61f1c2fbe98544f08f96ecc08e3ccbdbd7b873a8410b508f3f0c3a55fceeeb56`, // Replace with your Pinata secret API key
                        "Content-Type": "multipart/form-data"
                    }
                });

                const ImgHash = `https://gateway.pinata.cloud/ipfs/${
                    resFile.data.IpfsHash
                }`;
                try { // Call the smart contract method and wait for the transaction to complete
                    const tx = await contract.add(account, ImgHash);
                    await tx.wait();
                    // Wait for the transaction to be mined

                    // Once the transaction is successful, proceed with sharing and then fetching data
                    await sharing();
                    // Call sharing function and wait for it to complete

                    // Fetch data after sharing
                    const fetchedFiles = await getdata();

                    setFiles(fetchedFiles);

                    // Show the alert after successful operations
                    alert("File uploaded and access granted successfully!");

                    // Reset the file and file name state after the successful transaction
                    setFileName("No file selected");
                    setFile(null);
                } catch (error) { // Handle any errors that may occur during the contract interaction
                    console.error("Error adding file to the contract:", error);
                    alert("Failed to upload the file. Please try again.");
                }
            } catch (e) {
                console.error("Error uploading file:", e);
                alert("File upload failed!");
            }
        } else {
            alert("Please select a file first.");
        }
    };

    // Function to handle file selection
    const retrieveFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Update file state
            setFileName(selectedFile.name); // Update file name state
        }
    };


    const getdata = async () => {
        let dataArray = [];
        try { // Retrieve data using the account address directly
            dataArray = await contract.display(account);
        } catch (e) {
            alert("You don't have access");
            return []; // Return an empty array in case of error
        }

        const isEmpty = Object.keys(dataArray).length === 0;

        if (! isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");

            // Create the files array with name and url properties
            const files = str_array.map((item, i) => ({
                    name: `Report_${
                    i + 1
                }`, // You might want to derive the name from the actual file data if available
                url: item
            }));

            // Sort files by name in descending order
            files.sort((a, b) => b.name.localeCompare(a.name));

            return files;
        } else {
            alert("No files to display");
            return []; // Return an empty array if no files are available
        }
    };

    const handleSend = async () => {
        if (prescription.trim() === '') {
            alert('Prescription cannot be empty.');
            return;
        }

        try {
            const userId = patData._id; // Replace with the actual user ID
            const doctorName = user.userName;
            // Replace with dynamic doctor name

            // Prepare data with doctor's name and prescription
            const data = {
                Doctor_Name: doctorName, // Or use: user.userName
                prescription: prescription,
                Date: Date.now()
            };

            console.log("Data for Firebase:", data);

            // Store the data in Firebase Realtime Database
            await push(ref(db, `prescriptions/${userId}`), data);

            alert('Prescription sent successfully!');
            setPrescription(''); // Clear the text area
        } catch (error) {
            console.error('Error sending prescription:', error);
            alert('Failed to send prescription. Please try again.');
        }
    };



    

    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${patient._id}`)
    }, [navigate])


    return (
        <div className="grid grid-rows-3 sm:grid-cols-1 md:grid-cols-2 h-screen gap-4">
            <div className="  p-4 col-span-2 h-auto overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Image */}
                    <div></div>
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sample Image" className="h-48 w-48 object-cover rounded-full shadow-lg"/> {/* Information */}
                    <div className="  w-full sm:w-2/3 p-3 pb-6">
                        <h3>
                            <span className="font-bold mr-[6px]">Patient Name:
                            </span>
                            {
                            patient.userName.charAt(0).toUpperCase() + patient.userName.slice(1)
                        }</h3>

                        <p>
                            <span className="font-bold mr-[6px]">ID:
                            </span>
                            {
                            patient._id.substring(0, 6)
                        }</p>
                        <h2>
                            <span className="font-bold mr-[6px]">D.O.B:
                            </span>
                            {
                            patient.dateOfBirth.substring(0, 10)
                        }</h2>
                        <h2>
                            <span className="font-bold mr-[6px]">Phone Number:
                            </span>
                            {
                            patient.contactInfo
                        }</h2>
                        <h2>
                            <span className="font-bold mr-[6px]">Email:
                            </span>
                            {
                            patient.email
                        }</h2>

                    </div>
                    <div>
                        <img src="https://thumbs.dreamstime.com/b/golden-caduceus-medical-symbol-20046376.jpg" className="h-50 w-40" alt=""/>
                    </div>


                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-5xl font-bold mr-[6px] text-M10 ">Medecro.ai</h1>
                        <div className="flex flex-col items-center justify-center">

                            <h3>Doctor Dashboard</h3>
                            <div className="flex   items-center justify-center">

                                <img src="https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-doctor-symbol-color-png-image_11614936.png" className="h-10 w-10" alt=""/>
                                Doc. ID: DOC_{
                                user?._id.substring(0, 6)
                            } </div>
                            <div>
                                <span className="font-bold mr-[6px]">
                                    {
                                    user?.userName.charAt(0).toUpperCase() + user?.userName.slice(1)
                                } </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Row 2, Column 1 with 3 sub-columns */}
            <div className="   p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Sub-column 1: Line Chart */}
                    <div className="bg-white p-2 overflow-hidden">
                        <h3 className="text-lg font-semibold mb-2">Congnitive
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Function
                        </h3>
                        <div className="w-full h-48">
                            <LineChart width={300}
                                height={200}
                                data={data}
                                className="w-full h-full">
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="time"
                                    tickFormatter={
                                        (tick) => new Date(tick).toLocaleDateString()
                                    }/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="cognitiveFunction" stroke="#624E88"
                                    strokeWidth={2}/>
                            </LineChart>
                        </div>
                    </div>


                    {/* Sub-column 3: Area Chart */}
                    <div className="  p-2 overflow-hidden">
                        <h3 className="text-lg font-semibold mb-2">Mood & Behavioural Change</h3>
                        <div className="w-full h-48">
                            <AreaChart width={300}
                                height={200}
                                data={data}
                                className="w-full h-full">
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="time"
                                    tickFormatter={
                                        (tick) => new Date(tick).toLocaleDateString()
                                    }/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Area type="monotone" dataKey="moodBehaviorChange" stroke="#624E88"
                                    fillOpacity={0.9}
                                    fill="#624E88"/>
                            </AreaChart>
                        </div>
                    </div>
                </div>
            </div>

            {/* Combined Row 2, Column 2 and Row 3, Column 2 */}
            <div className="border border-gray-600 bg-M9  mr-[24px] rounded-lg shadow-md  pb-4 row-span-2 overflow-y-auto flex justify-center">
                <div className="relative  p-4 row-span-2 w-full ">

                    <div className="bg-M9 py-4 sticky top-0 left-0 right-0 flex justify-center items-center">
                        {/* Header text */}
                        <h1 className="text-3xl font-bold text-M7">
                            Medical Records</h1>

                        {/* File upload section */}
                        <div className="flex flex-col items-center ml-[20px]">
                            {/* Icon to trigger file upload */}
                            <img src="https://www.freeiconspng.com/thumbs/upload-icon/upload-icon-31.png" alt="Upload Icon" className="h-10 w-15 object-cover cursor-pointer"
                                onClick={
                                    () => document.getElementById("file-upload").click()
                                }/>
                            <p onClick={
                                    () => document.getElementById("file-upload").click()
                                }
                                className="text-[10px] text-M7 cursor-pointer">
                                Upload New Record
                            </p>

                            {/* Hidden file input */}
                            <input type="file" id="file-upload" className="hidden"
                                onChange={retrieveFile}/> {/* Display file name */}
                            <span className="textArea text-xs">Selected File: {fileName}</span>

                            {/* Upload button */}
                            <button type="button" className="upload mt-2 bg-blue-500 text-white p-2 rounded"
                                onClick={handleSubmit}
                                disabled={
                                    !file
                            }>
                                Upload File
                            </button>
                        </div>
                    </div>


                    <ul className="space-y-2 p-4 w-full ">
                        {
                        files.map((file, index) => (
                            <li key={index}
                                className="flex items-center w-full  justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                                <span>{
                                    file.name
                                }</span>
                                <a href={
                                        file.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                    Open
                                </a>
                            </li>
                        ))
                    } </ul>
                </div>
            </div>

            {/* Row 3, Column 1 */}
            <div className="border border-gray-600 ml-[24px] bg-M9 rounded-lg shadow-md p-4 overflow-hidden h-full flex flex-col">
                <div className="flex-1 relative flex flex-col">
                    <h1 className="text-center sticky top-0 left-0 right-0 text-3xl font-bold text-M7 bg-M9">Prescription</h1>
                    <textarea className="w-full h-full p-2 border border-gray-300 rounded-lg resize-none" placeholder="Enter your prescription here..."
                        value={prescription}
                        onChange={
                            (e) => setPrescription(e.target.value)
                        }/>
                </div>
                <div className="flex justify-between sticky bottom-0 left-0 right-0 bg-M9 p-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={handleJoinRoom}>
                        Video Call
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={handleSend}>
                        Send
                    </button>

                </div>
            </div>


        </div>
    );
};

export default Doctor;
