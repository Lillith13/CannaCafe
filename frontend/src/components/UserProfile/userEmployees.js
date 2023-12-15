import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllEmployees } from "../../store/employees";

import profileIcon from "../../assets/profile_icon.png";

export default function UserEmployees() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const employees = useSelector((state) => state.employees);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const data = await dispatch(getAllEmployees()).then(() =>
      setIsLoaded(true)
    );
    if (data) {
      console.log(data);
    }
  }, [dispatch]);

  return isLoaded ? (
    <div className="staffListContainer">
      <div className="empListContainer">
        {/* <label> */}
        <h2>Employees</h2>
        <div className="empListDiv">
          {employees.Employees &&
            employees.Employees.map((employee) => (
              <NavLink
                exact
                to={`/profile/${employee.id}`}
                key={employee.id}
                className="staffName"
              >
                <div>
                  <img
                    className={
                      employee.profile_pic ? "userProfilePic" : "profileLogo"
                    }
                    src={
                      employee.profile_pic ? employee.profile_pic : profileIcon
                    }
                    alt="profileLogo"
                  />
                  <h4>
                    {employee.firstName} {employee.lastName}
                  </h4>
                </div>
              </NavLink>
            ))}
        </div>
        {/* </label> */}
      </div>

      <div className="managerListContainer">
        <h3>Managers</h3>
        <div className="managerListDiv">
          {employees.Managers &&
            employees.Managers.map((manager) => (
              <NavLink
                exact
                to={`/profile/${manager.id}`}
                key={manager.id}
                className="staffName"
              >
                <div>
                  <img
                    className={
                      manager.profile_pic ? "userProfilePic" : "profileLogo"
                    }
                    src={
                      manager.profile_pic ? manager.profile_pic : profileIcon
                    }
                    alt="profileLogo"
                  />
                  <h4>
                    {manager.firstName} {manager.lastName}
                  </h4>
                </div>
              </NavLink>
            ))}
        </div>
      </div>

      <div className="ownerListContainer">
        <h3>Owners</h3>
        <div className="ownerListDiv">
          {employees.Owners &&
            employees.Owners.map((owner) => (
              <NavLink
                exact
                to={`/profile/${owner.id}`}
                key={owner.id}
                className="staffName"
              >
                <div>
                  <img
                    className={
                      owner.profile_pic ? "userProfilePic" : "profileLogo"
                    }
                    src={owner.profile_pic ? owner.profile_pic : profileIcon}
                    alt="profileLogo"
                  />
                  <h4>
                    {owner.firstName} {owner.lastName}
                  </h4>
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
