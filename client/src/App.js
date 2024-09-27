import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';

import { Home } from './Home'; // Import Home component

function App() {
  return (
    <>
      {/* Render the Home component */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      >

       <Home />

      </Toaster>
      {/* <FileUpload/> */}
    </>
  );
}

export default App;
