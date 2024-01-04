import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { allUserTimecards } from "../../store/timecard";

export default function Timecards({ emp }) {
  const { empId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const timecards = useSelector((state) => state.timecard);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(empId);

  useEffect(async () => {
    const data = await dispatch(allUserTimecards(empId));
    if (data) {
      console.log(data);
    } else {
      setIsLoaded(true);
    }
  }, [dispatch]);

  return isLoaded ? (
    <div>
      {Object.values(timecards).length > 0 ? (
        <div className="idvTimeCard">
          {Object.values(timecards).map((timecard) => (
            <div key={timecard.id} id="timecardInfo">
              <label>
                Clocked In:
                <p>{timecard.clocked_in}</p>
              </label>

              <label>
                Clocked Out:
                <p>{timecard.clocked_out}</p>
              </label>

              <label>
                Pay for Day:
                <p>${timecard.day_pay}</p>
              </label>
              {(user.role.name == "Owner" && emp.role.name == "Manager") ||
              (user.role.name == "Owner" && emp.role.name == "Employee") ||
              (user.role.name == "Manager" && emp.role.name == "Employee") ? (
                <button title="functionality coming soon..." disabled>
                  Edit Timecard
                </button>
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
