import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faEnvelope,
  faHeart,
  faHouse,
  faMagnifyingGlass,
  faPlay,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const SideBar = ({ openPopUp, user }) => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      Instagram
      <div className="menu">
        <ul>
          <li
            onClick={() => {
              navigate("/home");
            }}
          >
            <FontAwesomeIcon icon={faHouse} />
            Home
          </li>
          <li>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Search
          </li>
          <li>
            <FontAwesomeIcon icon={faCompass} />
            Explore
          </li>
          <li>
            <FontAwesomeIcon icon={faPlay} />
            Reels
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            Messages
          </li>
          <li>
            <FontAwesomeIcon icon={faHeart} />
            Notifications
          </li>
          <li onClick={() => {
              navigate("/post");
            }}>
            <FontAwesomeIcon icon={faSquarePlus} />
            Create
          </li>
          <li
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;