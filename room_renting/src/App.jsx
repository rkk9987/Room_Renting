import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import axios from "axios";
import Admin from "./components/Admin";
import AddRoom from "./components/AddRoom";
// import { useNavigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Nav />} path="/" /> */}
        <Route element={<Home />} path="/" />
        <Route element={<AddRoom />} path="/addRoom" />
        <Route element={<Admin />} path="/admin" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
