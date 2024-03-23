import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PMemberWelcomeCard = () => {
  const [firstName, setFirstName] = useState("Loading");

  // Retrieve first name from cookies on component mount
  useState(() => {
    setFirstName(Cookies.get("firstName") || "Backend eken Badu ennaha:(");
  }, []);

  return (
      <div className="bg-yellow-100 mb-3 rounded-xl p-3">
        <h6 className="font-bold">
          Welcome {firstName}! to Project Member Dashboard 😍
        </h6>
      </div>
  );
};

export default PMemberWelcomeCard;
