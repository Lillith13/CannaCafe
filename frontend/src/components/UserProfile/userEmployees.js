import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllEmployees } from "../../store/employees";

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
    <div>
      <div>
        <h3>Employees</h3>
        {employees.Employees &&
          employees.Employees.map((employee) => (
            <NavLink exact to={`/profile/${employee.id}`} key={employee.id}>
              <div>
                <h4>
                  {employee.firstName} {employee.lastName}
                </h4>
              </div>
            </NavLink>
          ))}
      </div>

      <div>
        <h3>Managers</h3>
        {employees.Managers &&
          employees.Managers.map((manager) => (
            <NavLink exact to={`/profile/${manager.id}`} key={manager.id}>
              <div>
                <h4>
                  {manager.firstName} {manager.lastName}
                </h4>
              </div>
            </NavLink>
          ))}
      </div>

      <div>
        <h3>Owners</h3>
        {employees.Owners &&
          employees.Owners.map((owner) => (
            <NavLink exact to={`/profile/${owner.id}`} key={owner.id}>
              <div>
                <h4>
                  {owner.firstName} {owner.lastName}
                </h4>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
