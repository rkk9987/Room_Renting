import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // or wherever you want
    }
  }, []);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const regH = () => {
    navigate("/register");
  };

  const eH = (e) => {
    setEmail(e.target.value);
  };
  const pH = (e) => {
    setPass(e.target.value);
  };

  const logH = (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("token") != "") {
        console.log("Already Logged In");
      }
    } else {
      axios
        .post("http://localhost:8001/user/login", {
          email: email,
          password: pass,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.data.name);
          localStorage.setItem("id", res.data.data._id);
          console.log(res);

          if (res.data.msg) toast.success(res.data.msg);

          navigate("/");
        })
        .catch((err) => {
          if (err.response.data.msg) toast.error(err.response.data.msg);
          else toast.error(err.response.data);
        });
    }
  };

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(45px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "15px",

          // margin: "1rem auto",
          width: "65%",
          margin: "2rem auto",
          height: "400px",
          padding: "16px",
        }}
      >
        <h3 className="text-white">Login </h3>
        <form>
          <div className="form-group">
            <label className="text-white" htmlFor="exampleInputEmail1">
              Email address
            </label>
            <input
              style={{ margin: "5px 0" }}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={eH}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="exampleInputPassword1">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={pass}
              onChange={pH}
            />
          </div>

          <button
            type="submit"
            class="btn btn-success"
            style={{ margin: "8px 0" }}
            onClick={logH}
          >
            Submit
          </button>
          <div>
            <span class="text-white">New Here ?</span>
            <button
              class="btn btn-success"
              style={{ margin: "8px" }}
              onClick={regH}
            >
              {" "}
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
