import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Nav = () => {
  const navigate = useNavigate();

  const logoutH = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    toast.success("Logged Out successfully");

    navigate("/");
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark sticky-top  bg-dark">
        <a class="navbar-brand" href="#">
          Room Renting
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="/">
              Home
            </a>
            {localStorage.getItem("token") ? (
              <div className="navProfile">
                <a class="nav-item nav-link" href="/">
                  profile
                </a>
                <button
                  class="btn btn-success"
                  style={{ margin: "0 8px" }}
                  onClick={logoutH}
                >
                  Log out
                </button>
              </div>
            ) : (
              <a class="nav-item nav-link" href="/login">
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
