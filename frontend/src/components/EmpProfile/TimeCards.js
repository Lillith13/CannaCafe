import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { allEmpTimecards } from "../../store/pay_state";

export default function Timecards({ emp }) {
  const { empId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const pay_state = useSelector((state) => state.pay_state);
  const [isLoaded, setIsLoaded] = useState(false);
  const userHasEditPermissions =
              (user.role.name == "Owner" && emp.role.name == "Manager") ||
              (user.role.name == "Owner" && emp.role.name == "Employee") ||
              (user.role.name == "Manager" && emp.role.name == "Employee")
  // console.log(empId);

  useEffect(async () => {
    const data = await dispatch(allEmpTimecards(empId));
    if (data) {
      // console.log(data);
    } else {
      setIsLoaded(true);
    }
  }, [dispatch]);

  return isLoaded ? (
    <div>
      {pay_state.length > 0 ? (
        <div className="idvTimeCard">
          {/* {console.log(Object.values(pay_state))} */}
          {pay_state.map((stub) => (
            <div key={stub.id} id="timecardInfo">
              <label>
                Start Date:
                <></>
              </label>

              <label>
                End Date:
                <></>
              </label>

              <label>
                <label>
                  Total Hours
                  <></>
                </label>
                <label>
                  Total Pay
                  <></>
                </label>
              </label>
              {/* {stub.timecards.map((card) => console.log(card))} */}
              {userHasEditPermissions ? (
                <div>
                  <button title="functionality coming soon..." disabled>
                    Edit Timecard
                  </button>
                  <button title="functionality coming soon..." disabled>
                    Delete Timecard
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <h3>
          {emp.firstName} {emp.lastName} does not yet have any timecards to
          display...
        </h3>
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
