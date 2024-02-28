import {Input, Button, Typography} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "@/services/api";
import axios from "axios";

export function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCallbackResponse = async(response) => {
    if(response.credential) {
      try{
        const responseLogin = await api.post("/api/v1/Authentication/google-login", 
          response.credential,
        );

        if(responseLogin.status === 200) {
          localStorage.setItem("token", responseLogin.data.token);
          toast.success("Login Successful");
          navigate('/');
        }
      } catch (error) {
        let errorMessage = "Login failed";
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.data) {
            if(error.response.data.validationsErrors)
              errorMessage += ": " + error.response.data.validationsErrors[0];
            else
              errorMessage += ": " + error.response.data;
          }
        } else if (error instanceof Error) {
          errorMessage += ": " + error.message;
        }

        toast.error(errorMessage);
      }
    }
  }


  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if(!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await api.post("/api/v1/Authentication/login", {
        username: username,
        password: password,
      });

      if(response.status === 200) {
        localStorage.setItem("token", response.data);
        toast.success("Login Successful");
        navigate('/');
      }
    } catch (error) {
      let errorMessage = "Login failed";
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data) {
          if(error.response.data.validationsErrors)
            errorMessage += ": " + error.response.data.validationsErrors[0];
          else
            errorMessage += ": " + error.response.data;
        }
      } else if (error instanceof Error) {
        errorMessage += ": " + error.message;
      }

      toast.error(errorMessage);
    }
  }


  return (
    <section className="bg-surface-darkest flex gap-4 text-surface-light">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" className="text-lg font-normal text-surface-light-dark">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" className="-mb-3 font-medium text-surface-light">
              Your username
            </Typography>
            <Input
              size="lg"
              placeholder="Username"
              className="!border-surface-light text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography variant="small" className="-mb-3 font-medium text-surface-light">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-surface-light text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button className="mt-6 bg-secondary hover:bg-primary duration-200" fullWidth type="submit">
              Sign In
            </Button>
            <div id="signInDiv" className="w-6"></div>
          </div>
          <div className="space-y-4 mt-2">
            <Button size="md" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
          </div>
          <Typography variant="small" className="text-center text-surface-light-dark font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-secondary ml-1 hover:text-primary">Create account</Link>
          </Typography>
          <Typography variant="small" className="text-center text-surface-light-dark font-medium mt-4">
            Forgot password?
            <Link to="/auth/send-reset-code" className="text-secondary ml-1 hover:text-primary">Reset password</Link>
          </Typography>
          <Typography variant="small" className="text-center text-surface-light-dark font-medium mt-4">
            Activity Level?
            <Link to="/auth/set-activity-level" className="text-secondary ml-1 hover:text-primary">Activity Level</Link>
          </Typography>
        </form>

      </div>
      <div className="h-full p-4 min-h-screen relative justify-end items-center w-2/5 hidden lg:flex">
        <img
          src="/img/pattern.png"
          className="object-contain rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;





