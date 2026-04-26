import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./Paystubs.css"

import { allEmpTimecards } from "../../store/pay_state";

export default function Paystubs({ emp, queryLimit }) {
  const { empId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const pay_state = useSelector((state) => state.pay_state);
  const queryNum = queryLimit || 10 //default = 10
  const [isLoaded, setIsLoaded] = useState(false);
  const userHasEditPermissions =
              (user.role.name == "Owner" && emp.role.name == "Manager") ||
              (user.role.name == "Owner" && emp.role.name == "Employee") ||
              (user.role.name == "Manager" && emp.role.name == "Employee")
  // console.log(empId);

  useEffect(async () => {
    const data = await dispatch(allEmpTimecards(empId, queryLimit)).then((e) => {
      if(e) return
      else setIsLoaded(true)
    });
  }, [dispatch]);

  return isLoaded ? (
    <div>
      {pay_state.length > 0 ? (
        <div className="idvPaystub">
          {/* {console.log(Object.values(pay_state))} */}
          {pay_state.map((stub) => (
            <div key={stub.id} id="paystubInfo">
              <div className="stubPeriodDuration">
                <label>
                Start Date: {stub.period_duration[0]}
                </label>

                <label>
                  End Date: {stub.period_duration[1]}
                </label>
              </div>

              <div className="stubPayNHoursTotals">
                <label>
                  Total Hours: {stub.period_total_hours}
                </label>

                <label>
                  Total Pay: ${stub.period_total_pay}
                </label>
              </div>

              {/* {stub.timecards.map((card) => console.log(card))} */}
              {userHasEditPermissions ? (
                <div className="stubButtonsContainer">
                  <button title="functionality coming soon..." disabled>
                    Edit Paystub
                  </button>
                  <button title="functionality coming soon..." disabled>
                    Delete Paystub
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
