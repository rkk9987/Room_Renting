import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [filtered, setFiltered] = useState("");
  const [filterUser, setFilterUser] = useState([]);
  useEffect(() => {
    console.log(user);

    axios
      .post(
        `http://localhost:8001/user/admin`,
        {},
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        toast.info(res.data.msg);
      })
      .catch((err) => {
        if (err.response.data.msg) toast.error(err.response.data.msg);
        else toast.error(err.response.data);

        navigate("/");
      });
  }, []);

  useEffect(() => {
    const filteredUser = !filtered
      ? user
      : user.filter((item) => item.name === filtered);
    setFilterUser(filteredUser);
  }, [user, filtered]);

  const delUser = (id) => {
    axios
      .delete(`http://localhost:8001/user/delete/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.info(res.data.msg);
      })
      .catch((err) => {
        if (err.response.data.msg) toast.error(err.response.data.msg);
        else toast.error(err.response.data);
      });
  };
  const fromNav = (data) => {
    setFiltered(data);
    console.log(filtered);
  };

  return (
    <div>
      <Nav search="Search user" fromNav={fromNav} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {filterUser.length > 0 ? (
          filterUser.map((data, index) => (
            <div
              class="card "
              key={index}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(45px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "15px",
                maxWidth: "500px",
                // margin: "1rem auto",
                width: "35%",
                margin: "2rem",
                height: "250px",
                padding: "16px",
              }}
            >
              <div class="card-body text-white">
                <h4
                  class="card-title"
                  style={{ borderBottom: "2px solid purple" }}
                >
                  {data.name}
                </h4>
                <h5 class="card-subtitle mb-2 text-body-secondary">
                  Email: {data.email}
                </h5>
                Role:<sapn class="card-text"> &nbsp;{data.role}</sapn>
                <p>
                  Room Name:{" "}
                  <span>
                    {data.occupied === "" ? "Yet to book" : data.occupied}
                  </span>
                </p>
                Status:&nbsp;
                {data.roomStatus === true ? "Booked" : "Yet to book"}
                <p>
                  <button
                    onClick={() => {
                      delUser(data._id);
                    }}
                    className="btn btn-success"
                    style={{ width: "100px", margin: "7px 0" }}
                  >
                    Delete
                  </button>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-white">No Users found</h3>
        )}
      </div>
    </div>
  );
};

export default Admin;
