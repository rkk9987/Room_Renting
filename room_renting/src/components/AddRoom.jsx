import React from "react";
import Nav from "./Nav";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [rent, setRent] = useState("");

  const nH = (e) => {
    setName(e.target.value);
  };
  const aH = (e) => {
    setAddr(e.target.value);
  };
  const rH = (e) => {
    setRent(e.target.value);
  };

  const subH = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8001/room",
        {
          name: name,
          address: addr,
          rent: rent,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success(res.data.msg);
        setName("");
        setAddr("");
        setRent(1000);
      })
      .catch((err) => {
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
        <h3 className="text-white">Add Room </h3>
        <form>
          <div className="form-group">
            <label className="text-white" htmlFor="exampleInputEmail1">
              Room Name
            </label>
            <input
              style={{ margin: "5px 0" }}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Room Name"
              value={name}
              onChange={nH}
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="exampleInputEmail1">
              Address
            </label>
            <input
              style={{ margin: "5px 0" }}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter room's address"
              value={addr}
              onChange={aH}
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="exampleInputPassword1">
              Rent
            </label>
            <input
              style={{ margin: "5px 0" }}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Rent"
              value={rent}
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

export default AddRoom;
