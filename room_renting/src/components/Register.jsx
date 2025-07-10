import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // or wherever you want
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("user");

  const nH = (e) => {
    setName(e.target.value);
  };
  const eH = (e) => {
    setEmail(e.target.value);
  };
  const pH = (e) => {
    setPass(e.target.value);
  };
  const rH = (e) => {
    setRole(e.target.value);
  };
  const subH = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8001/user/register", {
        name: name,
        email: email,
        password: pass,
        role: role,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.msg);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);

        if (err.response.data.msg) toast.error(err.response.data.msg);
        else toast.error(err.response.data);
      });
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
        <h3 className="text-white">Register </h3>
        <form>
          <div className="form-group">
            <label className="text-white" htmlFor="exampleInputEmail1">
              Name
            </label>
            <input
              style={{ margin: "5px 0" }}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={name}
              onChange={nH}
            />
          </div>
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
              style={{ margin: "5px 0" }}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={pass}
              onChange={pH}
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="exampleInputPassword1">
              Role
            </label>
            <input
              style={{ margin: "5px 0" }}
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              value={role}
              onChange={rH}
            />
          </div>
          <button
            type="submit"
            class="btn btn-success "
            style={{ margin: "3px 0" }}
            onClick={subH}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
