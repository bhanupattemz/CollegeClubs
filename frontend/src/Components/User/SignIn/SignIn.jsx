import "./SignIn.css";
import { signInUser } from "../../../Actions/userActions";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../Loaders/Loading";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({ username: "", password: "" });
  const { prevLocation } = useSelector((state) => state.prevLocation);
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const signInFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(signInUser(userData));
  };

  useEffect(() => {
    if (user) {
      navigate(prevLocation);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="signin-main">
      <form className="signin-form" onSubmit={signInFormSubmitHandler}>
        <TextField
          required
          id="username"
          label="Username"
          variant="outlined"
          value={userData.username}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={userData.password}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div className="signin-links">
          <Link to="/signup">Register</Link>
          <Link to="/password/reset">Forgot Password</Link>
        </div>
        <button className="signin-button">Submit</button>
      </form>
    </main>
  );
}