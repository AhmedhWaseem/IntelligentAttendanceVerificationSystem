import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Swal from 'sweetalert2';
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
  
     const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ studentId, image:capturedImage }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Data sent successfully.');
         // Show a success message using SweetAlert2
         Swal.fire({
            title: 'Success!',
            text: 'Registration success.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
    
          // Optionally, reset the form or perform other actions
          setStudentId('');
          setCapturedImage(null);
    } else {
      console.error('Error sending data to the server.');
    }
   
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100">
    
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
          <div className="mb-4 text-center">
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
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
