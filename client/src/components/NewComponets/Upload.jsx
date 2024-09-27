import { useState } from "react";
import axios from "axios";
import { useMetaMask } from "../../context/MetaMaskContext";

const patientAccount="0x71bE63f3384f5fb98995898A86B02Fb2426c5788";
const doctorAccount="0xFABB0ac9d68B0B445fB7357272Ff202C5651694a";

const FileUpload = ( ) => {
  const [file, setFile] = useState(null); // State to store the selected file
  const [fileName, setFileName] = useState("No image selected"); // State to store the file name

  const {contract}=useMetaMask();

 

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (file) { // Check if a file is selected
      try {
        const formData = new FormData(); // Create a FormData object to send the file
        formData.append("file", file); // Append the file to FormData

        // Send the file to Pinata
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `f4ef1d813a6bc451c3e1`, // Replace with your Pinata API key
            pinata_secret_api_key: `61f1c2fbe98544f08f96ecc08e3ccbdbd7b873a8410b508f3f0c3a55fceeeb56`, // Replace with your Pinata secret API key
            "Content-Type": "multipart/form-data",
          },
        });

        // Log the response to the console
        // console.log();

        const ImgHash = resFile.data.IpfsHash;
        console.log("Image_hash", ImgHash); // Log the IPFS hash of the image

        // Call the smart contract method with the patient's account
        await contract.add(patientAccount, ImgHash);

        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        console.error("Error uploading image to Pinata:", e); // Log the full error object
        alert("Unable to upload image to Pinata. Check console for details.");
      }
    }
  };

  // Function to handle file selection
  const retrieveFile = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      console.log("File details:"); // Log file details to the console
      console.log("Name:", selectedFile.name); // File name
      console.log("Size:", selectedFile.size); // File size in bytes
      console.log("Type:", selectedFile.type); // File type (MIME type)

      const reader = new window.FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onloadend = () => {
        setFile(selectedFile); // Update the state with the selected file
      };
      setFileName(selectedFile.name); // Update the file name state
    }
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!doctorAccount} // Disable file input if doctor account is not connected
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile} // Call retrieveFile function on file selection
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
