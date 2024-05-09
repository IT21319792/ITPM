import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function OTP() {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const navigate = useNavigate();
  
    const handleSendOTP = async () => {
        try {
            const response = await fetch(`http://localhost:510/student/sendOTP?email=${email}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:510/student/verifyOTP?email=${email}&otp=${otp}`);
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                navigate('/dashboard/studentDash');
            } else {
                console.log(response.errorMessage);
            
                alert("OTP verification failed: " + response.errorMessage);
            
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
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
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl mb-4">OTP Verification</h2>
                <div className="mb-4">
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendOTP}
                >
                    Send OTP
                </Button>
                <form onSubmit={handleVerifyOTP}>
                    <div className="mb-4 mt-4">
                        <TextField
                            label="OTP"
                            variant="outlined"
                            type="text"
                            value={otp}
                            onChange={handleOTPChange}
                            required
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Verify OTP
                    </Button>
                </form>
            </div>
        </div>
    );
}
