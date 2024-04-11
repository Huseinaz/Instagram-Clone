import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";

import SignInForm from "./components/Authentication/SignInForm";
import SignUpForm from "./components/Authentication/SignUpForm";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Post from "./components/Post/Post";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
