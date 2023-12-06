import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getAnEmployee } from "../../store/employees";
import OpenModalButton from "../OpenModalButton";
import EditAccount from "../AllModals/EditAcct";
import TimeCards from "./TimeCards";

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
    <div>
      <button
        onClick={(e) => {
          e.preventDefault(e);
          history.goBack();
        }}
      >
        Go Back
      </button>
      <h3>
        {employee.firstName} {employee.lastName}
      </h3>
      <p>Username: {employee.username}</p>
      <div>
        <label>
          Contact Info:
          <p>Phone: {employee.phone}</p>
          <p>Email: {employee.email}</p>
          <label>
            Address:
            <div>
              <p>{employee.full_address.address}</p>
              <p>
                {employee.full_address.city}, {employee.full_address.state},{" "}
                {employee.full_address.zip}
              </p>
            </div>
          </label>
        </label>
      </div>
      {(user.role.name == "Owner" && employee.role.name == "Manager") ||
      (user.role.name == "Owner" && employee.role.name == "Employee") ||
      (user.role.name == "Manager" && employee.role.name == "Employee") ? (
        <>
          <OpenModalButton
            buttonText="Edit Account"
            modalComponent={<EditAccount empId={empId} />}
          />
          <h3 onClick={() => setLoadTimeCards(!loadTimeCards)}>Timecards</h3>
        </>
      ) : null}
      {loadTimeCards && <TimeCards emp={employee} />}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
