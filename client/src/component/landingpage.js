import { Link, useNavigate } from "react-router-dom";
import "./css/landingpage.css";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import React, { useEffect, useState } from "react";
import { useName } from "./NameContext";

export default function Landingpage() {
  const { name, setName } = useName();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const gotopost = () => {
    if (name.trim() === "") {
      alert("Please enter your name before logging in.");
    } else {
      nav(`/postview`); 
    }
  };

  

  return (
    <>
      <div className="p-3">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div style={{ marginTop: "32%" }}>
              <div className="rounded w-75 w-lg-50 align-items-center m-auto my-3">
                <h3 className="text-center mb-2 font-weight-bold">Welcome Back</h3>
                <p className="text-center mb-3 fs-13 text-dark font-weight-bold">
                  The faster you fill up, the faster you get a ticket
                </p>

                <FormLabel className="font-weight-bold">Name*</FormLabel>
                <Input
                  placeholder="Enter your Name"
                  variant="outlined"
                  color="white"
                  className="border"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Update the name state
                />

                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="solid"
                  className="mb-3 mt-3"
                  onClick={gotopost}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>

          <div className="col p-0">
            <div className="">
              <img
                className=""
                src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?w=740&t=st=1695736547~exp=1695737147~hmac=e823012cbd742f7b48cfddfb5a4284457a80ad398cbb7ac722ff56040e62ca22"
                alt="logo"
                style={{ height: "100%", width: "100%", borderRadius: "5px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
