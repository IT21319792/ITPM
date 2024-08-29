import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

// Assuming you have a toast library like react-toastify installed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OTP() {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
  
    const handleSendOTP = async () => {
        try {
            const response = await fetch(`http://localhost:510/student/sendOTP?email=${searchParams.get('email')}`);
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                toast.success('OTP sent successfully');
            } else {
                toast.error('Error sending OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Error sending OTP. Please try again.');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:510/student/verifyOTP?email=${searchParams.get('email')}&otp=${otp}`);
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                navigate('/dashboard/studentDash');
                toast.success('OTP verified successfully');
            } else {
                console.log(response.errorMessage);
                toast.error("OTP verification failed: " + response.errorMessage);
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Error verifying OTP. Please try again.');
        }
    };

    const handleOTPChange = (e) => {
        setOTP(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <h2 className="text-xl mb-4">OTP Verification</h2>
                <div className="mb-4">
                    <input
                        className="border border-gray-300 p-2 w-full rounded"
                        placeholder="Type Your Account Email"
                        type="email"
                        value={searchParams.get('email')}	
                        onChange={handleEmailChange}
                        disabled
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSendOTP}
                >
                    Send OTP
                </button>
                <form onSubmit={handleVerifyOTP}>
                    <div className="mb-4 mt-4">
                        <input
                            className="border border-gray-300 p-2 w-full rounded"
                            placeholder="Type the OTP you recieved"
                            type="text"
                            value={otp}
                            onChange={handleOTPChange}
                            required
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
}
