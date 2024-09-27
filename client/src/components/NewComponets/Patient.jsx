import React, {useEffect, useState} from "react";
import DoctorSearch from "./VideoCall";
import {FaSearch} from 'react-icons/fa';
import {useMetaMask} from "../../context/MetaMaskContext";
import Lottie from 'react-lottie-player';
import { db, ref, onValue } from './firebase';
import { MapPinIcon } from '@heroicons/react/24/outline';


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000
    }, {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181
    }, {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500
    }, {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100
    },
];

const dataAccess = [
    {
        id: 1,
        name: 'Item 1'
    },
    {
        id: 2,
        name: 'Item 2'
    },
    {
        id: 3,
        name: 'Item 3'
    },
    {
        id: 4,
        name: 'Item 4'
    },
    // Add more items as needed
];

// Sample data for filenames
const files = [
    {
        name: 'File1.pdf',
        url: '#'
    },
    {
        name: 'File2.docx',
        url: '#'
    },
    {
        name: 'File3.pptx',
        url: '#'
    },
    {
        name: 'File4.xlsx',
        url: '#'
    }, {
        name: 'File1.pdf',
        url: '#'
    }, {
        name: 'File2.docx',
        url: '#'
    }, {
        name: 'File3.pptx',
        url: '#'
    }, {
        name: 'File4.xlsx',
        url: '#'
    }, {
        name: 'File1.pdf',
        url: '#'
    }, {
        name: 'File2.docx',
        url: '#'
    }, {
        name: 'File3.pptx',
        url: '#'
    }, {
        name: 'File4.xlsx',
        url: '#'
    },
    // Add more files as needed
];

const friends = [
    {
        name: "John Doe",
        image: "https://images.unsplash.com/photo-1608193882486-3af78815f450?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Jane Smith",
        image: "https://images.unsplash.com/photo-1622925930212-b5b1606f0aab?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Alice Johnson",
        image: "https://images.unsplash.com/photo-1630694892664-99ec5225361a?q=80&w=2624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        name: "Bob Brown",
        image: "https://images.unsplash.com/photo-1515191107209-c28698631303?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }, {
        name: "Bob Brown",
        image: "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }, {
        name: "Alice Johnson",
        image: "https://plus.unsplash.com/premium_photo-1676376103597-b58721a58858?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }, {
        name: "Dj Snake",
        image: "https://images.unsplash.com/photo-1596245195341-b33a7f275fdb?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }, {
        name: "Roshani",
        image: "https://plus.unsplash.com/premium_photo-1668319915384-3cccf7689bef?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }, {
        name: "Ram Bhagat",
        image: "https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=2816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }, {
        name: "Bob Peter",
        image: "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];


const data2 = [
    {
        image: 'https://plus.unsplash.com/premium_photo-1679656159946-f62c9f79f92d?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'New York',
        date: '2023-02-15',
        name: 'John Doe',
        description: 'A breathtaking view of the New York skyline, captured during a serene sunset. The vibrant colors reflect off the buildings, making the city look magical and lively.'
    },
    {
        image: 'https://plus.unsplash.com/premium_photo-1666184130709-f3709060899a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'Los Angeles',
        date: '2022-12-25',
        name: 'Jane Smith',
        description: 'A sunny day in Los Angeles, with palm trees swaying gently in the breeze. The clear blue sky and warm weather make it a perfect day to enjoy the outdoors.'
    },
    {
        image: 'https://plus.unsplash.com/premium_photo-1683121126477-17ef068309bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'Chicago',
        date: '2023-06-18',
        name: 'Alice Johnson',
        description: 'The Chicago skyline with its iconic skyscrapers towering against the sky. The vibrant city lights reflect on the lake, creating a mesmerizing view of this urban landscape.'
    },
    {
        image: 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'Houston',
        date: '2023-05-10',
        name: 'Bob Brown',
        description: 'A bustling street in Houston filled with activity. The blend of modern buildings and green spaces offers a glimpse into the vibrant life of this diverse city.'
    },
    {
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'Phoenix',
        date: '2023-03-30',
        name: 'Charlie Davis',
        description: 'The desert landscape of Phoenix with its stunning rock formations and clear skies. The colors of the sunset paint the desert in a warm, golden hue, creating a tranquil scene.'
    },
    {
        image: 'https://plus.unsplash.com/premium_photo-1683134240084-ba074973f75e?q=80&w=2795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'Philadelphia',
        date: '2022-11-12',
        name: 'Diana Wilson',
        description: 'A historic view of Philadelphia with its classic architecture and cobblestone streets. The rich history and vibrant culture of the city are beautifully captured in this image.'
    },
    {
        image: 'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'San Antonio',
        date: '2023-01-04',
        name: 'Edward Clark',
        description: 'A vibrant street scene in San Antonio, showcasing the blend of modernity and tradition. The lively atmosphere and colorful surroundings make it a captivating cityscape.'
    },
    {
        image: 'https://plus.unsplash.com/premium_photo-1671580671733-92d038f1ea97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'San Diego',
        date: '2023-08-22',
        name: 'Fiona Lewis',
        description: 'The beautiful coastline of San Diego, with its sandy beaches and clear blue water. The calm waves and sunny weather create an ideal setting for relaxation and enjoyment.'
    },
    {
        image: 'https://images.unsplash.com/photo-1459603677915-a62079ffd002?q=80&w=2734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'Dallas',
        date: '2023-09-05',
        name: 'George Harris',
        description: 'A dynamic view of Dallas, with its impressive skyline and bustling streets. The blend of modern skyscrapers and historic buildings offers a glimpse into the city’s rich urban life.'
    },
    {
        image: 'https://images.unsplash.com/photo-1556293451-dfa6c3a860f2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        place: 'San Jose',
        date: '2023-07-15',
        name: 'Hannah White',
        description: 'The vibrant tech hub of San Jose, with its innovative architecture and dynamic environment. The image captures the essence of a city at the forefront of technology and creativity.'
    }
];



const hideScrollbarStyle = {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // Internet Explorer and Edge
};

const hideScrollbarWebkit = {
    '&::-webkit-scrollbar': {
        display: 'none', // Safari and Chrome
    }
};

const Patient = () => {

    const {user,contract} = useMetaMask();
    const [patient, setPatient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableArea, setTable] = useState(false)
    const [prescriptions,setPrescriptions]=useState([])
    const [doctorAccountAddress, setDoctorAccountAddress] = useState(null);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [healthRecords, setHealthRecords] = useState([]);
    const [isVibrating, setIsVibrating] = useState(false);
    const [callLink, setCallLink] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (patient) {
          // Reference to the Firebase Realtime Database for video calls
          const callRef = ref(db, `videoCalls/${patient?._id}`);
    
          // Listen for changes in the `start` value and link
          unsubscribe = onValue(callRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setIsVibrating(data.start || false);
              setCallLink(data.link || '');
            } else {
              setIsVibrating(false);
              setCallLink('');
            }
          });
        }
    
        // Cleanup listener on unmount
        return () => unsubscribe && unsubscribe();
      }, [patient]);

    useEffect(() => {
        if (user) {
            console.log("User in Patient", user);
            setPatient(user);
        }
    }, [user]);

// Fetch prescription data in real-time
useEffect(() => {
    if (!user?._id) {
        // If user is not logged in or user ID is missing, do nothing
        console.log("User is not logged in or user ID is missing.");
        return;
    }

    const userId = user._id; // Use the user ID only if it exists
    const prescriptionsRef = ref(db, `prescriptions/${userId}`);

    // Listen for changes in the prescription data
    const unsubscribe = onValue(prescriptionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Convert the object of prescriptions to an array
            const prescriptionsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key]
            }));
            console.log(prescriptionsArray);
            setPrescriptions(prescriptionsArray);
        } else {
            setPrescriptions([]); // Handle empty case
        }
    });

    // Cleanup the listener
    return () => unsubscribe();
}, [user, db]); // Add user and db to dependency array

// useEffect to connect with firebase and get the docotor address 
useEffect(() => {
    if (!patient?._id) {
        // Handle missing patient ID
        setError("Patient ID is not available.");
        return;
    }

    const userId = patient._id;
    const sharedAccessRef = ref(db, `sharedAccess/${userId}`);

    const unsubscribe = onValue(sharedAccessRef, async (snapshot) => {
        try {
            const data = snapshot.val();
            if (data) {
                const latestEntry = Object.values(data).pop(); // Get the latest entry
                setDoctorAccountAddress(latestEntry.doctorAccountAddress);

                // Fetch health records from the smart contract
                if (latestEntry.doctorAccountAddress) {
                    const records = await getdata(latestEntry.doctorAccountAddress);
                    setHealthRecords(records);
                }
            } else {
                setDoctorAccountAddress(null); // No data found
                setHealthRecords([]);
            }
        } catch (err) {
            // Catch any error that occurred during data retrieval
            console.error("Error fetching shared access data:", err);
            setError("Failed to fetch shared access data.");
            setHealthRecords([]);
        }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
}, [patient]);

const getdata = async (doctorAddress) => {
    let dataArray = [];
    try {
        dataArray = await contract.display(doctorAddress);
    } catch (e) {
        alert("You don't have access");
        return []; // Return an empty array in case of error
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
        const str = dataArray.toString();
        const str_array = str.split(",");

        // Create the files array with name and url properties
        const files = str_array.map((item, i) => ({
            name: `Report_${i + 1}`, // You might want to derive the name from the actual file data if available
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


const openModal = (imageData) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
};

    const handleTableClick = () => {
        setTable(!tableArea)
        console.log(tableArea)
    }

    const handleClick = () => {
        if (isVibrating && callLink) {
          window.open(callLink, '_blank');
        }
      };

    return(
        patient ? (<div className="grid grid-rows-3 sm:grid-cols-1 md:grid-cols-2 h-screen gap-4">
        <div className="     p-4 col-span-2 h-auto overflow-hidden">
            <div className="    flex flex-col sm:flex-row items-center gap-4">
                {/* Image */}
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sample Image" className="h-48 w-48 object-cover rounded-full shadow-lg"/> {/* Information */}
                <div className="   lg:w-2/3  sm:w-2/3 p-3 pb-6">

                    <h3>
                        <span className="font-bold mr-[6px]">Name:
                        </span>
                        {
                        patient.userName.charAt(0).toUpperCase() + patient.userName.slice(1)
                    }</h3>
                    <h1>
                        <span className="font-bold mr-[6px]">
                            {
                            patient.userType.charAt(0).toUpperCase() + patient.userType.slice(1)
                        }
                            ID
                        </span>:{
                        patient._id.substring(0, 7)
                    } </h1>

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
                    <h2>
                        <span className="font-bold mr-[6px]">Account Address:
                        </span>
                        {
                        patient.accountAddress.substring(1, 8)
                    }</h2>


                </div>

                


                <div className="  p-6 ml-[100px] flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold mr-[6px] text-M10">Medecro.ai</h1>
                    <div className="flex flex-col items-center justify-center">

                        <h3>Patient Dashboard</h3>

                    </div>
                </div>
            </div>


        </div>
 

        {/* Row 2, Column 1 with 3 sub-columns */}
        <div className="  p-1 flex items-center overflow-hidden">
            <div style={hideScrollbarStyle}
                className="flex overflow-x-auto space-x-6 scrollbar-hide p-5">
                {/* Increased space-x */}
                {
                friends.map((user, index) => (<div key={index}
                    className="flex flex-col items-center min-w-[150px]">
                    {/* Increased min-w */}
                    <img src={
                            user.image
                        }
                        alt={
                            user.name
                        }
                        // className="w-28 h-28 rounded-full object-cover mb-3"/>
                        className="w-28 h-28 rounded-full object-cover mb-3 transition-transform duration-300 ease-in-out transform hover:scale-110   hover:border-4 hover:border-blue-500"
                    />
                    <p className="text-lg font-semibold">
                        {
                        user.name
                    }</p>
                </div>))
                }
            
                
            </div>


        </div>


        


        {/* Combined Row 2, Column 2 and Row 3, Column 2 */}
        <div className="border border-gray-600 bg-M9 mr-[24px] rounded-lg shadow-md p-4 row-span-2 overflow-y-auto flex justify-center">
    <div className="relative p-4 row-span-2 w-full" >
        <h1 className="text-3xl sticky top-0 left-0 right-0 font-bold text-M7 text-center" onClick={() => handleTableClick()}>
            {tableArea ? "Medical Health Records" : "Prescription"}
        </h1>

        {tableArea ? (
            // Display medical health records
            <ul className="space-y-2 p-4 w-full ">
                        {
                        healthRecords?.map((file, index) => (
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
        ) : (
            // Display prescriptions
            <ul className="space-y-4 p-4 w-full">
  {prescriptions?.map((prescription, index) => (
    <li
      key={index}
      className="flex flex-col w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md space-y-2"
    >
      <div className="flex justify-between items-center">
        {/* Date */}
        <span className="text-gray-400 text-sm">
          {new Date(prescription.Date).toLocaleDateString()}
        </span>
        {/* Doctor Name */}
        <span className="text-blue-600 font-medium">
          Doctor: {prescription.Doctor_Name}
        </span>
      </div>

      {/* Prescription Text */}
      <p className="text-gray-700">
        {prescription.prescription}
      </p>

      {/* Optional Footer */}
      <div className="flex justify-end">
        <span className="text-gray-400 text-xs">Prescription ID: {prescription.id}</span>
      </div>
    </li>
  ))}
</ul>

        )}
    </div>
</div>


     
<div>
            <div style={hideScrollbarStyle} className="flex items-center overflow-x-auto bg-M9 space-x-1 scrollbar-hide p-5">
                {/* Increased space-x */}
                <h1 className="text-center text-2xl font-bold text-M7 bg-M10 p-2 rounded-md">Memories</h1>
                {
                    data2.map((item, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[200px] hover:mx-2">
                            {/* Increased min-w */}
                            <img 
                                src={item.image}
                                alt={item.name}
                                className="w-full h-[195px] rounded-md object-cover mb-3 transition-transform duration-300 ease-in-out transform hover:scale-110 hover:rounded-xl hover:border-4 hover:border-white"
                                onClick={() => openModal(item)}  // Pass image data to the function
                            />
                        </div>
                    ))
                }
            </div>

            {isModalOpen && selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Background blur effect */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        style={{ backdropFilter: 'blur(8px)' }}
                        onClick={closeModal}
                    ></div>
                    <div className="bg-white p-6 border-2 rounded-lg shadow-lg relative w-full max-w-3xl h-[80vh] overflow-y-auto z-50">
                        {/* Close button positioned absolutely */}
                        {/* <button
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full z-50"
                            onClick={closeModal}
                        >
                            
                        </button> */}
                        <div className="flex flex-col items-start">
                            {/* Display selected image data */}
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.name}
                                className="w-full h-[60vh] object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">{selectedImage.name}</h3>
                            <p className="mb-1 flex items-center">
                                <MapPinIcon className="w-5 h-5 mr-2 text-gray-500" /> {/* Map icon */}
                                Place: {selectedImage.place}
                            </p>
                            <p className="mb-1">Date: {selectedImage.date}</p>
                            <p className="mb-1 italic">{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>




         
        <div
        className={`fixed top-44 right-5 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer ${isVibrating ? 'animate-vibrate' : 'bg-gray-500 cursor-not-allowed'}`}
        style={{
          backgroundImage: `url('https://cdn-icons-png.freepik.com/512/8224/8224096.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isVibrating ? 1 : 0.6, // Change opacity to indicate disabled state
        }}
        onClick={handleClick}
      >
        <span className="sr-only">Video Call</span>
      </div>

        

    </div>

        )

    :

    (
        <div>Loading....</div>
    )
);
};             
                
 export default Patient;


 



                  