

// export const handleSend = async () => {
//     if (prescription.trim() === '') {
//         alert('Prescription cannot be empty.');
//         return;
//     }

//     try {
//         const userId = patData._id; // Replace with the actual user ID
//         const doctorName = user.userName; // Replace with dynamic doctor name

//         // Prepare data with doctor's name and prescription
//         const data = {
//             Doctor_Name: doctorName, // Or use: user.userName
//             prescription: prescription,
//             Date:Date.now()
//         };

//         console.log("Data for Firebase:", data);

//         // Store the data in Firebase Realtime Database
//         await push(ref(db, `prescriptions/${userId}`), data);
        
//         alert('Prescription sent successfully!');
//         setPrescription(''); // Clear the text area
//     } catch (error) {
//         console.error('Error sending prescription:', error);
//         alert('Failed to send prescription. Please try again.');
//     }
// };