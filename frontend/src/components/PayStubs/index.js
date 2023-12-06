import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { allUserTimecards } from "../../store/timecard";

export default function PayStubs() {
  const { empId } = useParams();
  const dispatch = useDispatch();
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
      <h1>Your Paystubs</h1>
      <p>word in progress...</p>
      {Object.values(timecards).length > 0 ? (
        <>
          {Object.values(timecards).map((timecard) => (
            <div key={timecard.id}>
              {console.log(timecard)}
              <p>Clocked In: {timecard.clocked_in}</p>
              {console.log(timecard.clocked_in)}
              <p>
                Clocked Out: {timecard.clocked_out || "Still clocked in..."}
              </p>
              {console.log(timecard.clocked_out)}
              <p>
                Pay for Day: $
                {timecard.day_pay || "Will calculate when clocked out..."}
              </p>
              {console.log(timecard.day_pay)}
            </div>
          ))}
        </>
      ) : (
        <h3>You do not yet have any timecards to display...</h3>
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
