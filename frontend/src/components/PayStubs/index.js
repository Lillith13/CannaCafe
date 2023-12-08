import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { allUserTimecards } from "../../store/timecard";

import "./PayStubs.css";

export default function PayStubs() {
  const { empId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const timecards = useSelector((state) => state.timecard);
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log(empId);

  useEffect(async () => {
    const data = await dispatch(allUserTimecards(empId));
    if (data) {
      // console.log(data);
    } else {
      setIsLoaded(true);
    }
  }, [dispatch]);

  return isLoaded ? (
    <div className="payStubsContainer">
      <div className="goBackButtonDiv" id="goBack">
        <button
          className="goBackButton"
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          Go Back
        </button>
      </div>
      <h1>Your Paystubs</h1>
      <p>word in progress...</p>
      {Object.values(timecards).length > 0 ? (
        <div className="timeCardsContainer">
          {Object.values(timecards)
            .toReversed()
            .map((timecard) => (
              <div key={timecard.id} className="idvTimeCardDiv">
                {/* {console.log(timecard)} */}
                <h2>Clocked In: {timecard.clocked_in}</h2>
                {/* {console.log(timecard.clocked_in)} */}
                <h2>
                  Clocked Out: {timecard.clocked_out || "Still clocked in..."}
                </h2>
                {/* {console.log(timecard.clocked_out)} */}
                <h2>
                  Pay for Day: $
                  {timecard.day_pay || "Will calculate when clocked out..."}
                </h2>
                {/* {console.log(timecard.day_pay)} */}
              </div>
            ))}
        </div>
      ) : (
        <h3>You do not yet have any timecards to display...</h3>
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
