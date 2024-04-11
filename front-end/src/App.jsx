import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";

import SignInForm from "./components/Authentication/SignInForm";
import SignUpForm from "./components/Authentication/SignUpForm";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Post from "./components/Post/Post";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<><Sidebar /> <Home /></>} />
          <Route path="/profile" element={<><Sidebar /> <Profile /></>} />
          <Route path="/post" element={<><Sidebar /> <Post /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
