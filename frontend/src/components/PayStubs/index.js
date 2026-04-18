import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { allEmpTimecards } from "../../store/pay_state";

// import "./css/screenSizing.css"
import "./css/univ.css";
// themes
import "./css/themes/blue.css"
import "./css/themes/green.css"
import "./css/themes/purple.css"

export default function PayStubs() {
  const { empId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const pay_state = useSelector((state) => state.pay_state);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadTimeCards, setLoadTimeCards] = useState(false);
  const [expandedStubs, setExpandedStubs] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));

  useEffect(async () => {
    const data = await dispatch(allEmpTimecards(empId));
    if (data) {
      // console.log(data);
      // if data then data.errors
    } else {
      setIsLoaded(true);
    }
  }, [dispatch]);

  const toggleTimecards = (e, stubId) => {
  e.preventDefault(e)
  setExpandedStubs((prev) => ({
    ...prev,
    [stubId]: !prev[stubId],
  }));
};

  return isLoaded ? (
    <div className="payStubsPageContainer">
      <div className="payStubsPageHeaderContainer">
        <div className="goBackButtonDiv" id="goBack">
          <button
            className="goBackButton" id={theme}
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Go Back
          </button>
        </div>
        <h1 className="payStubsPageTitle">Your Paystubs</h1>
      </div>
      <div className="payStubsPageBodyCotiner" id={theme}>
        {pay_state.length > 0 ? (
          <div className="payperiodsContainer" id={theme}>
            {pay_state
              .toReversed()
              .map((stub) => (
                <div key={stub.id} className="idvPayperiodDiv" id={theme}>

                  <div className="stubContainer" id={theme}>

                    <div className="stubDetailsContainer" id={theme}>

                      <div className="payPeriodTimeframe" id={theme}>
                      <h3>Pay Period Timeframe: </h3>
                      <p>
                        Start Date: {stub.period_duration[0]}
                      </p>
                      <p>
                        End Date: {stub.period_duration[1]}
                      </p>

                      </div>

                      <div className="stubPayDetails" id={theme}>
                      <h3>Pay Period Totals:</h3>
                      <p>Total Hours: {stub.period_total_hours}</p>
                      <p>Total Pay: ${stub.period_total_pay}</p>
                      </div>
                    </div>

                  </div>

                  <div className="timecardsContainerOuter" id={theme}>
                      <button className="timeCardExpanderToggle" onClick={(e) => toggleTimecards(e, stub.id)} id={expandedStubs[stub.id] ? "toggledOpen" : "toggledClosed"}>
                        [{expandedStubs[stub.id] ? "Hide" : "Show" }] Timecards:
                      </button>
                        <div className="timecardsGroup" id={expandedStubs[stub.id] ? "toggledOpen" : "toggledClosed"}>
                          {stub.timecards.map((card) => (
                            <div key={card.id} className="idvTimecard" id={theme}>

                              <p>Clocked In: {card.clocked_in}</p>
                              <p>Clocked Out: {card.clocked_out}</p>
                              <p>Day Pay: ${card.day_pay}</p>

                              <div id={theme}>
                                <button title="functionality coming soon...">Edit</button>
                                <button title="functionality coming soon...">Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>

                      <div className="stubButtonsContainer" id={!expandedStubs[stub.id] ? "toggledShowButtons" : "toggledHideButtons"}>
                        <button title="functionality coming soon...">Edit</button>
                        <button title="functionality coming soon...">Delete</button>
                      </div>

                  </div>

                </div>
              ))}
          </div>
        ) : (
          <h3>You do not yet have any timecards to display...</h3>
        )}
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
