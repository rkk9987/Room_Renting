import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Nav = (props) => {
  const navigate = useNavigate();
  const [searchRoom, setSearchRoom] = useState("");

  const logoutH = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    toast.success("Logged Out successfully");

    navigate("/");
  };

  const seH = (e) => {
    setSearchRoom(e.target.value);
  };

  const searcHandler = (e) => {
    e.preventDefault();
    if (searchRoom.trim() === "") toast.info("Enter something to search");
    else {
      if (props.fromNav) {
        console.log("inside");

        props.fromNav(searchRoom);
      }
      // console.log(searchRoom);
      setSearchRoom("");
    }
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
        <form class="form-inline my-2 my-lg-0">
          {props.search ? (
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder={props.search}
              aria-label="Search"
              value={searchRoom}
              onChange={seH}
            />
          ) : (
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search Room"
              aria-label="Search"
              value={searchRoom}
              onChange={seH}
            />
          )}

          <button
            class="btn btn-outline-success my-2 my-sm-0"
            onClick={searcHandler}
          >
            Search
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Nav;
