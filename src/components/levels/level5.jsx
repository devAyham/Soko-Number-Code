import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Stracture from "../../classes/structure";
var _ = require("lodash");

const level_five_arr = [
  ["W", "W", "W", "W", "W", "W"],
  ["W", "B1", "W", "W", "W", "W"],
  ["W", "T1", "B2", "W", "E", "W"],
  ["W", "E", "T2", "B3", "T4", "W"],
  ["W", "E", "E", "T3", "B4", "W"],
  ["W", "W", "W", "W", "W", "W"],
];

const level_five = new Stracture([...level_five_arr]);

const Level5 = () => {
  let [currArray, SetCurArray] = useState([...level_five.currArr]);
  let [winner, SetWinner] = useState(false);
  let [steps, setsteps] = useState(0);
  let [state, setState] = useState([[...level_five.patch]]);
  let [nextMove, SetNextMove] = useState([
    ...level_five.getNextMove(level_five.currArr),
  ]);

  let moveHandelr = (dir) => {
    level_five.currArr = [...level_five.move(dir, currArray)];
    SetCurArray(level_five.currArr);
  };
  let getNextMoveHandelr = () => {
    SetNextMove(level_five.getNextMove(currArray));
  };
  let retry = () => {
    level_five.currArr = level_five.patch;
    level_five.boxes = _.cloneDeep(level_five.StaticBoxes);
    level_five.states = [level_five.patch];
    SetCurArray(level_five.currArr);
    setsteps(0);
    setState([level_five.patch]);
  };
  useEffect(() => {
    getNextMoveHandelr();
    //is Step
    if (level_five.isEqual(currArray, state[state.length - 1]) === false) {
      setsteps(steps + 1);
    }
    //is new State
    if (level_five.isNewState(currArray)) {
      level_five.states.push(currArray);
      setState([...state, currArray]);
    }
    // Is Final
    if (level_five.isEqual(currArray, level_five.finalArr) === true) {
      SetWinner(true);
    }
  }, [currArray]);

  return (
    <>
      <NavLink className="nav_option" to="/home">
        Back Home
      </NavLink>
      <hr />
      {winner ? (
        <>
          <h1>Winner</h1>
          <hr />
        </>
      ) : (
        <>
          {" "}
          <div className={"patch"}>
            <p>Patch :</p>
            {level_five.patch?.map((row, i) => {
              return (
                <div className='row'>
                  {row.map((ele, i) => {
                    return <span className='span' key={i}>{ele} </span>;
                  })}
                  <br key={i} />
                </div>
              );
            })}
            <hr />
            <p>Current Array :</p>
            {currArray?.map((row, i) => {
              return (
                <div className='row'>
                  {row.map((ele, i) => {
                    return <span className={'span'} key={i}>{ele} </span>;
                  })}
                  <br key={i} />
                </div>
              );
            })}
            <hr />
            <p>Final Array :</p>
            {level_five.finalArr?.map((row) => {
              return (
                <div className='row'>
                  {row.map((ele, i) => {
                    return <span className='span' key={i}>{ele} </span>;
                  })}
                  <br />
                </div>
              );
            })}
          </div>
          <hr />
          <button
            onClick={() => {
              moveHandelr("right");
            }}
          >
            Right
          </button>
          <button
            onClick={() => {
              moveHandelr("left");
            }}
          >
            Left
          </button>
          <button
            onClick={() => {
              moveHandelr("top");
            }}
          >
            Top
          </button>
          <button
            onClick={() => {
              moveHandelr("down");
            }}
          >
            Bottom
          </button>
          <button
            onClick={() => {
              retry();
            }}
          >
            Retry
          </button>
          <hr />
          Steps : {steps}
          <hr />
          <div className="nextstep">
            Next Steps :
            <div className="step">
              {nextMove?.map((array) => {
                return (
                  <div className={"array"}>
                    {array.map((row) => {
                      return (
                        <div className={"row"}>
                          {row?.map((ele, i) => {
                            return (
                              <>
                                <span className={"span"} key={i}>
                                  {ele}
                                </span>{" "}
                                <br />
                              </>
                            );
                          })}
                          {/* <br /> */}
                        </div>
                      );
                    })}
                    {/* <br /> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="nextstep">
            states :
            <div className="step">
              {state?.map((array) => {
                return (
                  <div className={"array"}>
                    {array.map((row) => {
                      return (
                        <div className={"row"}>
                          {row?.map((ele, i) => {
                            return (
                              <>
                                <span className={"span"} key={i}>
                                  {ele}
                                </span>{" "}
                                <br />
                              </>
                            );
                          })}
                          {/* <br /> */}
                        </div>
                      );
                    })}
                    {/* <br /> */}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Level5;
