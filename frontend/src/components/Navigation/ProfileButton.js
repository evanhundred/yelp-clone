import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
import profileIcon from "../../assets/images/profile.png";

const Carrot = () => (
  <div
    className="profile-picture"
    style={{ color: "orange", fontSize: "45px" }}
  >
    <i className="fa-solid fa-carrot"></i>
  </div>
);

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  return (
    <div id="profile-menu-button">
      <button onClick={openMenu}>
        <Carrot />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <a href="#">
              <div className="first-row">
                <div className="profile-icon">
                  <img src={profileIcon} />
                </div>

                <p>{user.name}</p>
              </div>
            </a>
          </li>
          {/* <li>{user.email}</li> */}
          <li className="profile-menu-seperator-top"></li>
          <li className="profile-menu-seperator-bottom"></li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
