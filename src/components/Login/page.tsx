// // src/components/Login/page.tsx

'use client'

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import DefaultLayout from "@/components/Layouts/DefaultLayout";



// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Google } from "@mui/icons-material";
import Chart from "../AgentPage/page";
import AiAgentPage from "@/app/AI Agent/page";
import AgentPage from "../AgentPage/page";

// Component Imports
// import Logo from '@components/layout/shared/Logo'
// import Illustrations from '@components/Illustrations'

// Config Imports
// import themeConfig from '@configs/themeConfig'

// Hook Imports
// import { useImageVariant } from '@core/hooks/useImageVariant'

const supabaseUrl = "https://muizndhkpdgmcvyctfim.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aXpuZGhrcGRnbWN2eWN0ZmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MzU2NDQsImV4cCI6MjAzNzIxMTY0NH0.EqKsWHm3sAXV6jeMmcBiswc0Hd91vHPjv-_lhNRbev8";
const supabase = createClient(supabaseUrl, supabaseKey);

interface LoginProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<{ setShowSignup: (show: boolean) => void }> = ({ setShowSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPasswordShown, setIsPasswordShown] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("supabaseSession");
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

//   const handleGoogleSignIn = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       // Redirect or handle success as needed
//       // Supabase handles the session in the browser's cookies
//       setIsLoggedIn(true);
//     }
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    const { data, error } = await supabase.auth.signInWithPassword({
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

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
//   const router = useRouter()
//   const authBackground = useImageVariant(mode, lightImg, darkImg)
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

//   const handleSubmit = 9 => {
//     e.preventDefault()
//     router.push('/')
//   }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-center mbe-6'>
            {/* <Logo /> */}
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
               <h1 className="mb-3 text-center text-2xl font-bold text-[#16C3A6] dark:text-[#16C3A6] sm:text-3xl">
                 Sign in to your account
                </h1>
                <p className="mb-5 text-center text-base font-medium text-[#6b7170]">
                Login to your account for a faster checkout.
                </p>
    
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
                
              <Button
                
                fullWidth
                variant='outlined'  
                // onClick={handleGoogleSignIn}
                sx={{
               borderColor: '#d0d7d6', // Outline color
               color: '#6b7170', // Text color
               padding: '10px 10px',
               '&:hover': {
                borderColor: '#16C3A6', // Outline color on hover
                backgroundColor: '#ffffff', // Background color on hover
                color: '#16C3A6', // Text color on hover
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
              <Divider className='gap-3'>or</Divider>
              
              <TextField
                fullWidth
                label='Email'
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                 borderColor: '#b0bec5', // Default border color
                },
                '&:hover fieldset': {
                orderColor: '#16C3A6', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                 borderColor: '#16C3A6', // Border color when focused
                },
                },
                '& .MuiInputLabel-root': {
                color: '#b0bec5', // Default label color
                '&.Mui-focused': {
                 color: '#16C3A6', // Label color when focused
                },
                '&.MuiInputLabel-shrink': {
                 color: '#16C3A6', // Label color when shrunk (when user types)
                },
                '&:hover': {
                color: '#16C3A6', // Label color on hover
                },
                },
                }}
               />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <TextField
                fullWidth
                label='Password'
                onChange={(e) => setPassword(e.target.value)}
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        {isPasswordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                     borderColor: '#b0bec5', // Default border color
                    },
                    '&:hover fieldset': {
                    orderColor: '#16C3A6', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                     borderColor: '#16C3A6', // Border color when focused
                    },
                    },
                    '& .MuiInputLabel-root': {
                    color: '#b0bec5', // Default label color
                    '&.Mui-focused': {
                     color: '#16C3A6', // Label color when focused
                    },
                    '&.MuiInputLabel-shrink': {
                     color: '#16C3A6', // Label color when shrunk (when user types)
                    },
                    '&:hover': {
                    color: '#16C3A6', // Label color on hover
                    },
                    },
                    }}
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel 
                  control={<Checkbox sx={{
                     '&.Mui-checked': {
                      color: '#16C3A6', // Checkbox color when checked
                      },
                     '&:hover': {
                      bgcolor: 'transparent', // Removes default hover background color
                      },
                    }}/>} 
                    label='Remember me' 
                />
                <Typography className='text-end' color='#16C3A6' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button
                fullWidth
                variant='contained'
                type='submit'
                sx={{
                 backgroundColor: '#16C3A6', // Button background color
                 color: '#ffffff', // Text color
                '&:hover': {
                 backgroundColor: '#14a89d', // Background color on hover
                },
                }}
                >
               Log In
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography onClick={() => setShowSignup(true)}  color='#16C3A6'>
                  Create an account
                </Typography>
              </div>
              
              {/* <div className='flex justify-center items-center gap-2'>
                <IconButton size='medium' className='text-facebook'>
                  <i className='ri-facebook-black' />
                </IconButton>
                <IconButton size='small' className='text-twitter'>
                     <FacebookIcon />
                </IconButton>
                <IconButton size='small' className='text-github'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-googlePlus'>
                  <i className='ri-google-fill' />
                </IconButton>
              </div> */}
            </form>
          </div>
        </CardContent>
      </Card>
      {/* <Illustrations maskImg={{ src: authBackground }} /> */}
    </div>
  )
}

export default Login






// "use client";
// import React, { useState, useEffect } from "react";
// import { createClient } from "@supabase/supabase-js";

// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import ECommerce from "../Dashboard/E-commerce";

// const supabaseUrl = "https://muizndhkpdgmcvyctfim.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aXpuZGhrcGRnbWN2eWN0ZmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MzU2NDQsImV4cCI6MjAzNzIxMTY0NH0.EqKsWHm3sAXV6jeMmcBiswc0Hd91vHPjv-_lhNRbev8";
// const supabase = createClient(supabaseUrl, supabaseKey);

// interface LoginProps {
//   setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Login: React.FC<{ setShowSignup: (show: boolean) => void }> = ({ setShowSignup }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const session = localStorage.getItem("supabaseSession");
//     if (session) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null); // Reset error state
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) {
//       setError(error.message);
//     } else {
//       localStorage.setItem("supabaseSession", JSON.stringify(data.session));
//       setIsLoggedIn(true);
//     }
//   };

//   if (isLoggedIn) {
//     return (
//       <DefaultLayout>
//         <ECommerce />
//       </DefaultLayout>
//     );
//   }

//   return (
//     <div className="bg-gray-100 flex min-h-screen items-center justify-center">
//       <div className="w-full max-w-md space-y-3 rounded-lg bg-white p-8 shadow-md">
//         <h1 className="text-center text-2xl font-bold">Login</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="text-gray-700 block text-sm font-medium"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               autoComplete="username"
//               className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="text-gray-700 block text-sm font-medium"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               autoComplete="current-password"
//               className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//           </div>
//           {error && <div className="text-red-500 text-sm">{error}</div>}
//           <button
//             type="submit"
//             className="w-full rounded-md bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-gray-600 text-center text-sm">
//         Don't have an account?{" "}
//         <button
//           onClick={() => setShowSignup(true)}
//           className="text-indigo-600 hover:underline"
//         >
//           Signup
//         </button>
//       </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
