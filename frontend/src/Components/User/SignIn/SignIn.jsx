import "./SignIn.css";
import { signInUser } from "../../../Actions/userActions";
import { useEffect } from "react";
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
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { prevLocation } = useSelector((state) => state.prevLocation);
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const signInFormSubmitHandler = (values) => {
    dispatch(signInUser(values));
  };

  useEffect(() => {
    if (user) {
      navigate(prevLocation || "/");
    }
  }, [user, navigate, prevLocation]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="signin-main">
      <div className="signin-container">
        <img
          src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822532/cld-sample-3.jpg"
          alt="Sign In"
          className="signin-image"
        />
        <div>
          <h2>Welcome Back! Please Sign In</h2>
          <p>If you haven't registered yet, <Link to="/signup">REGISTER</Link> now.</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={signInFormSubmitHandler}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="signin-form">
                <div className="input-group">
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <ErrorMessage name="username" component="div" className="error-text" />
                </div>

                <div className="input-group">
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Field
                      as={OutlinedInput}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <ErrorMessage name="password" component="div" className="error-text" />
                </div>

                <div className="signin-links">
                  <Link to="/signup">New User? Register</Link>
                  <Link to="/password/reset">Forgot Password?</Link>
                </div>

                <button type="submit" className="signin-button">Sign In</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
