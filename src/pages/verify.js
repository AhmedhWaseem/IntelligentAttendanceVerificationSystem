import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Swal from 'sweetalert2';
import Link from 'next/link';
import NavBar from '../components/NavBar';

const Home = () => {
  const webcamRef = useRef(null);
  const [studentId, setStudentId] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    } else {
      console.error("Webcam reference is null.");
    }
  };

  const handleSubmit = async () => {
    if (!studentId) {
      // Show an error message if the student ID is missing
      alert('Please enter a valid Student ID.');
      return;
    }
  
    if (!capturedImage) {
      // Show an error message if no image is captured
      alert('Please capture an image before submitting.');
      return;
    }

    const loadingModal = document.getElementById('loadingModal');
    loadingModal.style.display = 'flex';
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        body: JSON.stringify({ studentId, image:capturedImage }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
  
        let ress = await response.json();
  
        console.log(ress);
  
        if(ress.content == 'True')
        {
          Swal.fire({
            title: 'Success!',
            text: 'Verification success.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
        else{
          Swal.fire({
            title: 'Failed!',
            text: 'Verification failed.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
           // Show a success message using SweetAlert2
          
      
            // Optionally, reset the form or perform other actions
            setStudentId('');
            setCapturedImage(null);
      } else {
        console.error('Error sending data to the server.');
      }
     
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Hide loading modal after the response is received
      loadingModal.style.display = 'none';
    }
  
    
  };
    

  return (
    <div className="min-h-screen bg-gray-100">
        <div class="loading-modal" id="loadingModal">
    <div class="loading-spinner"></div>
  </div>
  <NavBar className="bg-blue-500 p-4 text-white font-bold text-xl text-center">
      Smart Attendy
      </NavBar>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg mt-4">
          <div className="mb-8 text-center">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-96 h-96 object-contain mx-auto"
              />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-96 h-96 mx-auto"
              />
            )}
          </div>
          <div className="mb-4 text-center">
            <input
              type="text"
              placeholder="Enter Student ID"
              name="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="border p-4 rounded-md w-96 mx-auto text-black"
            />
          </div>
          <div className="text-center">          
          <button
              onClick={captureImage}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mr-4"
            >
              Capture Image
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
