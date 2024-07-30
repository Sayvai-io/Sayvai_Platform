// src/components/Signup/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient"; // Import the single instance
import Link from "next/link";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Login from "@/components/Login/page";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Chart from "../AgentPage/page";
import AgentPage from "../AgentPage/page";

const Signup: React.FC<{ setShowSignup: (show: boolean) => void }> = ({
  setShowSignup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false); // New state variable

  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);

  useEffect(() => {
    const session = localStorage.getItem("supabaseSession");
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      localStorage.setItem("supabaseSession", JSON.stringify(data.session));
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return (
      <DefaultLayout>
        <AgentPage />
      </DefaultLayout>
    );
  }

  if (showLogin) {
    return <Login setShowSignup={setShowLogin} />;
  }

  return (
    <div className="min-bs-[100dvh] relative flex flex-col items-center justify-center p-6">
      <Card className="sm:is-[450px] flex flex-col">
        <CardContent className="p-6 sm:!p-12">
          <Link href="/" className="mbe-6 flex items-center justify-center">
            {/* <Logo /> */}
          </Link>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="mb-3 text-center text-2xl font-bold text-[#16C3A6] dark:text-[#16C3A6] sm:text-3xl">
                Create your account
              </h1>
              <p className="mb-5 text-center text-base font-medium text-[#6b7170]">
                just a few seconds and get started right away!
              </p>
            </div>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: "#d0d7d6", // Outline color
                  color: "#6b7170", // Text color
                  padding: "10px 10px",
                  "&:hover": {
                    borderColor: "#16C3A6", // Outline color on hover
                    backgroundColor: "#ffffff", // Background color on hover
                    color: "#16C3A6", // Text color on hover
                  },
                }}
              >
                <span className="mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_95:967)">
                      <path
                        d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                        fill="#EB4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_95:967">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Sign in with Google
              </Button>
              <Divider className="gap-3">or</Divider>
              <TextField
                fullWidth
                label="Username"
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#b0bec5", // Default border color
                    },
                    "&:hover fieldset": {
                      orderColor: "#16C3A6", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#16C3A6", // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#b0bec5", // Default label color
                    "&.Mui-focused": {
                      color: "#16C3A6", // Label color when focused
                    },
                    "&.MuiInputLabel-shrink": {
                      color: "#16C3A6", // Label color when shrunk (when user types)
                    },
                    "&:hover": {
                      color: "#16C3A6", // Label color on hover
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#b0bec5", // Default border color
                    },
                    "&:hover fieldset": {
                      orderColor: "#16C3A6", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#16C3A6", // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#b0bec5", // Default label color
                    "&.Mui-focused": {
                      color: "#16C3A6", // Label color when focused
                    },
                    "&.MuiInputLabel-shrink": {
                      color: "#16C3A6", // Label color when shrunk (when user types)
                    },
                    "&:hover": {
                      color: "#16C3A6", // Label color on hover
                    },
                  },
                }}
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <TextField
                fullWidth
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-adornment-password"
                type={isPasswordShown ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {isPasswordShown ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#b0bec5", // Default border color
                    },
                    "&:hover fieldset": {
                      orderColor: "#16C3A6", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#16C3A6", // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#b0bec5", // Default label color
                    "&.Mui-focused": {
                      color: "#16C3A6", // Label color when focused
                    },
                    "&.MuiInputLabel-shrink": {
                      color: "#16C3A6", // Label color when shrunk (when user types)
                    },
                    "&:hover": {
                      color: "#16C3A6", // Label color on hover
                    },
                  },
                }}
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTermsChecked}
                    onChange={(e) => setIsTermsChecked(e.target.checked)}
                    sx={{
                      "&.Mui-checked": {
                        color: "#16C3A6", // Checkbox color when checked
                      },
                      "&:hover": {
                        bgcolor: "transparent", // Removes default hover background color
                      },
                    }}
                  />
                }
                label={
                  <>
                    <span>I agree to </span>
                    <Link
                      className="text-[#16C3A6]"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={!isTermsChecked} // Disable button if terms are not checked
                sx={{
                  backgroundColor: "#16C3A6", // Button background color
                  color: "#ffffff", // Text color
                  "&:hover": {
                    backgroundColor: "#14a89d", // Background color on hover
                  },
                }}
              >
                SignUp
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Typography>Already have an account?</Typography>
                <Typography
                  onClick={() => setShowSignup(false)}
                  color="#16C3A6"
                >
                  Login in instead
                </Typography>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
