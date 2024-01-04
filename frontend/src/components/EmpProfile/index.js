import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import "./EmpProfile.css";

import { getAnEmployee } from "../../store/employees";
import OpenModalButton from "../OpenModalButton";
import EditAccount from "../AllModals/EditAcct";
import TimeCards from "./TimeCards";

import profileIcon from "../../assets/profile_icon.png";

export default function EmployeeProfile() {
  const { empId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const employee = useSelector((state) => state.employees);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadTimeCards, setLoadTimeCards] = useState(false);

  useEffect(async () => {
    const data = await dispatch(getAnEmployee(empId)).then(() =>
      setIsLoaded(true)
    );
    if (data) {
      console.log(data);
    }
  }, [dispatch]);

  useEffect(() => {
    if (employee.id == user.id) {
      history.push("/profile");
    }
    if (user.role.name == "Member") {
      history.push("/profile");
    }
  }, [isLoaded]);

  return isLoaded ? (
    <div className="pageContainer">
      <div className="backButtonDiv">
        <button
          className="goBackButtonFromStaffProfile"
          onClick={(e) => {
            e.preventDefault(e);
            history.goBack();
          }}
        >
          Go Back
        </button>
      </div>

      <div className="staffDetails">
        <img
          className={
            employee.profile_pic ? "staffProfilePic" : "staffProfileLogo"
          }
          src={employee.profile_pic ? employee.profile_pic : profileIcon}
          alt="profileLogo"
        />

        <div id="nameAndUsername">
          <h2>
            {employee.firstName} {employee.lastName}
          </h2>
          <p>Username: {employee.username}</p>

          <div
            className={
              (user.role.name == "Owner" && employee.role.name == "Manager") ||
              (user.role.name == "Owner" && employee.role.name == "Employee") ||
              (user.role.name == "Manager" && employee.role.name == "Employee")
                ? null
                : "hidden"
            }
          >
            <OpenModalButton
              buttonText="Edit Account"
              modalComponent={<EditAccount empId={empId} />}
            />
            <h2
              className="staffProfilePayStubTab"
              onClick={() => setLoadTimeCards(!loadTimeCards)}
            >
              Timecards
            </h2>
          </div>

          {/* {(user.role.name == "Owner" && employee.role.name == "Manager") ||
          (user.role.name == "Owner" && employee.role.name == "Employee") ||
          (user.role.name == "Manager" && employee.role.name == "Employee") ? (
          ) : null} */}
        </div>

        <div id="contactInfo">
          <label>
            Contact Info:
            <div id="contactCard">
              Phone:
              <a href={`tel:${employee.phone}`} style={{ alignSelf: "center" }}>
                {employee.phone}
              </a>
              Email:
              <a
                href={`mailto:${employee.email}`}
                style={{ alignSelf: "center" }}
              >
                {employee.email}
              </a>
              Address:
              <div style={{ alignSelf: "center" }}>
                <p>{employee.full_address.address}</p>
                <p>
                  {employee.full_address.city}, {employee.full_address.state},{" "}
                  {employee.full_address.zip}
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {loadTimeCards && <TimeCards emp={employee} />}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
