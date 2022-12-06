import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import LoginImage from "../LoginFormPage/LoginImage";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ name, email, password })).catch(
        async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else setErrors([res.statusText]);
        }
      );
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field"
    ]);
  };

  return (
    <>
      <div className="signup-page-container">
        <div className="signup-left">
          <form onSubmit={handleSubmit} className="signup-form">
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
            <label>
              <input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button>Sign Up</button>
          </form>
        </div>
        <div className="signup-right">
          <LoginImage />
        </div>
      </div>
    </>
  );
};

export default SignupFormPage;
