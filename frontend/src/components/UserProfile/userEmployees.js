import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
        {console.log(employees)}
        <h3>Employees</h3>
        {employees.Employees &&
          employees.Employees.map((employee) => (
            <div key={employee.id}>
              <div>
                <h4>
                  Name: {employee.firstName} {employee.lastName}
                </h4>
                <p>Username: {employee.username}</p>
              </div>
              <div>
                <label>
                  Contact Info:
                  <p>Where phone number will go...coming soon...</p>
                  <p>Phone: {employee.phone}</p>
                  <p>Email: {employee.email}</p>
                  <label>
                    Address:
                    <div>
                      <p>{employee.full_address.address}</p>
                      <p>
                        {employee.full_address.city},{" "}
                        {employee.full_address.state},{" "}
                        {employee.full_address.zip}
                      </p>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          ))}
      </div>

      <div>
        <h3>Managers</h3>
        {employees.Managers &&
          employees.Managers.map((manager) => (
            <div key={manager.id}>
              <div>
                <h4>
                  Name: {manager.firstName} {manager.lastName}
                </h4>
                <p>Username: {manager.username}</p>
              </div>
              {/* Need to add phone number to model for contact info */}
              <div>
                <label>
                  Contact Info:
                  <p>Where phone number will go...coming soon...</p>
                  <p>Phone: {manager.phone}</p>
                  <p>Email: {manager.email}</p>
                  <label>
                    Address:
                    <div>
                      <p>{manager.full_address.address}</p>
                      <p>
                        {manager.full_address.city},{" "}
                        {manager.full_address.state}, {manager.full_address.zip}
                      </p>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          ))}
      </div>

      <div>
        <h3>Owners</h3>
        {employees.Owners &&
          employees.Owners.map((owner) => (
            <div key={owner.id}>
              <div>
                <h4>
                  Name: {owner.firstName} {owner.lastName}
                </h4>
                <p>Username: {owner.username}</p>
              </div>
              {/* Need to add phone number to model for contact info */}
              <div>
                <label>
                  Contact Info:
                  <p>Where phone number will go...coming soon...</p>
                  <p>Phone: {owner.phone}</p>
                  <p>Email: {owner.email}</p>
                  <label>
                    Address:
                    <div>
                      <p>{owner.full_address.address}</p>
                      <p>
                        {owner.full_address.city}, {owner.full_address.state},{" "}
                        {owner.full_address.zip}
                      </p>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

/*

email
:
"ownerDemo@test.io"
firstName
:
"Owner"
full_address
:
address
:
"1479 Demo Test Run"
city
:
"Danksville"
state
:
"Cannibinoidia"
zip
:
13420
[[Prototype]]
:
Object
id
:
1
lastName
:
"Demo"
member_since
:
"Mon, 04 Dec 2023 00:00:00 GMT"
role
:
{id: 4, name: 'Owner'}
username
:
"ownerDemo"
*/
