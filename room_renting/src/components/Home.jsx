import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);
  const [user, setUser] = useState({});
  const [filtered, setFiltered] = useState("");
  const [filterRoom, setFilterRoom] = useState([]);
  useEffect(() => {
    // console.log(filtered);

    axios
      .get(`http://localhost:8001/user/profile/${localStorage.getItem("id")}`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);
      });
    axios
      .get("http://localhost:8001/room")
      .then((res) => {
        setRoom(res.data);
        // const filterD = ;
        // console.log(filterD);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filteredRooms = !filtered
      ? room
      : room.filter((item) => item.rent >= Number(filtered));
    setFilterRoom(filteredRooms);
  }, [room, filtered]);

  const bookHand = async (name, id) => {
    if (!localStorage.getItem("token")) toast.info("Log in to Book this Flat");
    else {
      if (user.occupied === "") {
        axios
          .patch(
            `http://localhost:8001/room/logged/${id}`,
            {
              owner: localStorage.getItem("name"),
            },
            {
              headers: {
                authorization: `${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            toast.success(res.data.msg);
            console.log(res.data);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 5000);
          })
          .catch((err) => {
            if (err.response.data.msg) toast.error(err.response.data.msg);
            else toast.error(err.response.data);
          });
        axios
          .patch(
            `http://localhost:8001/user/patch/${localStorage.getItem("id")}`,
            {
              occupied: name,
            },
            {
              headers: {
                authorization: `${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            toast.success(res.data.msg);
            console.log(res.data);
            // window.location.reload();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            if (err.response.data.msg) toast.error(err.response.data.msg);
            else toast.error(err.response.data);
          });
      } else toast.info("You are already in a flat . Leave it to book another");

      //   console.log(user);
    }
  };

  const leaveH = (id) => {
    axios
      .patch(
        `http://localhost:8001/user/patch/leaveRoom/${localStorage.getItem(
          "id"
        )}`,
        {
          roomId: id,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        if (err.response.data.msg) toast.error(err.response.data.msg);
        else toast.error(err.response.data);
      });
  };

  const addRoom = () => {
    navigate("/addRoom");
  };
  const delRoom = (id) => {
    axios
      .delete(`http://localhost:8001/room/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success(res.data.msg);
      })
      .catch((err) => {
        if (err.response.data.msg) toast.error(err.response.data.msg);
        else toast.error(err.response.data);
      });
  };

  const getUser = () => {
    navigate("/admin");
  };

  const fromNav = (data) => {
    setFiltered(data);
    console.log(filtered);
  };
  return (
    <div>
      <Nav fromNav={fromNav} />
      {user.role === "manager" || user.role === "admin" ? (
        <button
          className="btn btn-primary"
          style={{
            margin: "8px",
            width: "150px",
            position: "fixed",
            bottom: "5px",
            right: "5px",
          }}
          onClick={addRoom}
        >
          Add Room
        </button>
      ) : (
        ""
      )}
      {user.role === "admin" ? (
        <button
          className="btn btn-primary"
          style={{
            margin: "8px",
            width: "150px",
            position: "fixed",
            bottom: "50px",
            right: "5px",
          }}
          onClick={getUser}
        >
          Admin-getUser
        </button>
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {filterRoom.length > 0 ? (
          filterRoom.map((data, index) => (
            <div
              className="card"
              key={index}
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                backdropFilter: "blur(45px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "15px",
                maxWidth: "500px",
                // margin: "1rem auto",
                width: "35%",
                margin: "2rem",
                height: "280px",
                padding: "16px",
              }}
            >
              <div className="card-body text-white">
                <h4
                  className="card-title"
                  style={{ borderBottom: "2px solid purple" }}
                >
                  {data.name}
                </h4>
                <h5 className="card-subtitle mb-2 text-body-secondary important-text">
                  Owner: {data.owner}
                </h5>
                Address:
                <p className="card-text">{data.address}</p>
                Rent: <span>{data.rent}</span>&nbsp; Available:{" "}
                {data.available === true ? (
                  <button
                    className="btn btn-success"
                    style={{ margin: "8px" }}
                    onClick={() => {
                      bookHand(data.name, data._id);
                    }}
                  >
                    Click to Book
                  </button>
                ) : (
                  "Rented"
                )}
                {data.owner === localStorage.getItem("name") ? (
                  <button
                    className="btn btn-success"
                    style={{ margin: "8px" }}
                    onClick={() => {
                      leaveH(data._id);
                    }}
                  >
                    Leave{" "}
                  </button>
                ) : (
                  ""
                  //   console.log(data._id)
                )}
                {user.role === "manager" || user.role === "admin" ? (
                  <div>
                    <button
                      className="btn btn-success"
                      style={{ margin: "8px" }}
                      onClick={() => {
                        delRoom(data._id);
                      }}
                    >
                      Delete room
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-white">No Rooms Found</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
