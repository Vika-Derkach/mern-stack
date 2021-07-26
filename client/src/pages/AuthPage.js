import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";
const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    console.log("Error", error);
    message(error);
    clearError();
  }, [error, message, clearError]);
  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      // console.log("Data", data);
      message(data.message);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      // console.log("Data", data);
      auth.login(data.token, data.userId);
      message(data.message);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1> link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Type your email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Type your password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Sign in
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
