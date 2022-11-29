import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/node_modules/@material-ui/styles";
import {
  HighlightOffTwoTone,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  Replay,
  SkipNext,
} from "@material-ui/icons";
import ReplyIcon from "@material-ui/icons/Reply";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Stracture from "../../classes/structure";
import Logic from "../../classes/logic";
import ScrollDialog from "../modals/modal";
import { Patch } from "../modals/Patch";
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
const logic = new Logic();


const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  patch: {
    display: "block",
    width: "fit-content",
    height: "fit-conteny",
    transition: "all 500ms",
  },
  box: {
    background: "url(/box.jpg) ",
    backgroundSize: "cover",
    width: 60,
    height: 60,
    fontSize: 25,
  },
  wall: {
    background: "url(/wall.jpg)",
    backgroundSize: "cover",
    width: 60,
    height: 60,
  },
  target: {
    background: "url(/target.svg)",
    backgroundSize: "cover",
    width: 60,
    height: 60,
  },
  empty: {
    background: "transparent",
    width: 60,
    height: 60,
  },
  row: {
    display: "flex",
  },
  btn: {
    fontSize: 70,
  },
  success: {
    fontSize: 70,
    color: green[500],
  },
  wrong: {
    fontSize: 70,
    color: red[500],
  },
  flex: {
    display: "flex",
    justifyContent: "center",
  },
  flexColumns: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    background: "linear-gradient(45deg, #f50057 30%, #eea849 90%)",
    fontFamily: "Common Pixel , sans-serif ",
    WebkitBackgroundClip: "text",
    textFillColor: "transparent",
    marginTop: 30,
    textDecoration: "none",
  },
  next_level: {
    textAlign: "center",
    fontSize: 50,
    background: "linear-gradient(45deg, #f50057 30%, #eea849 90%)",
    fontFamily: "Common Pixel , sans-serif ",
    WebkitBackgroundClip: "text",
    textFillColor: "transparent",
    marginTop: 0,
    textDecoration: "none",
  },
  winner: {
    fontSize: 200,
    fontFamily: " Nabla , cursive ",
  },
  ISA: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ISABtn: {
    margin: 3,
    fontSize: 20,
    color: yellow[500],
    border: "2px solid yellow",
    borderRadius: "50%",
  },
});
const Level5 = () => {
  let [currArray, SetCurArray] = useState([...level_five.currArr]);
  let [winner, SetWinner] = useState(false);
  let [steps, setsteps] = useState(-1);
  let [state, setState] = useState([[...level_five.patch]]);
  let [nextMove, SetNextMove] = useState([
    ...level_five.getNextMove(level_five.currArr),
  ]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
    // setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let moveHandelr = (dir) => {
    level_five.currArr = [...level_five.move(dir, currArray)];
    if (!level_five.isEqual(currArray, level_five.currArr))
      SetCurArray(level_five.currArr);
  };
  let retry = () => {
    level_five.currArr = level_five.patch;
    level_five.boxes = _.cloneDeep(level_five.StaticBoxes);
    level_five.states = [level_five.patch];
    SetCurArray(level_five.currArr);
    setsteps(-1);
    setState([level_five.patch]);
    SetWinner(false);
  };
  // let DFSHandelr = () => {
  //   logic.DFS(level_five);
  //   console.log("DFS", logic.stack);
  //   setData(logic.stack);
  //   handleClickOpen();
  // };
  let DFSHandelr = () => {
    logic.DFS(level_five);
    console.log("DFS", logic.finalPath);
    setData(logic.solution);
    handleClickOpen();
  };
  let BFSHandelr = () => {
    logic.BFS(level_five);
    console.log("BFS", logic.finalPath);
    setData(logic.solution);
    handleClickOpen();
  };
  let UCSHandelr = () => {
    logic.UCS({element: level_five , priority : 0});
    console.log("UCS", logic.solution);
    setData(logic.solution);
    handleClickOpen();
  };
  let AStarHandelr = () => {
    logic.AStar({element: level_five, priority : 0});
    console.log("Astar", logic.solution);
    setData(logic.solution);
    handleClickOpen();
  };
  useEffect(() => {
    SetNextMove(level_five.getNextMove(level_five.currArr));
    //is Step
    setsteps(steps + 1);
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
      <ScrollDialog
        openn={open}
        handleClose={handleClose}
        classes={classes}
        data={data}
        patch={level_five.patch}
      />
      <div className="div">
        <Grid container>
          <Grid xs={1} item>
            <IconButton>
              <NavLink className="nav_option" to="/home">
                <ReplyIcon
                  color="secondary"
                  className={classes.btn}
                  onClick={() => {
                    retry();
                  }}
                />
              </NavLink>
            </IconButton>
          </Grid>
          <Grid xs={10} item className={classes.title}>
            Level 5
            <IconButton
              color={"secondary"}
              onClick={() => {
                retry();
              }}
            >
              <Replay fontSize={"large"} />
            </IconButton>
          </Grid>
          <Grid xs={12} item className={classes.ISA}>
            <Button onClick={DFSHandelr} className={classes.ISABtn}>
              DfS
            </Button>
            <Button onClick={BFSHandelr} className={classes.ISABtn}>
              BfS
            </Button>
            <Button onClick={UCSHandelr} className={classes.ISABtn}>
              UCS
            </Button>
            <Button onClick={AStarHandelr} className={classes.ISABtn}>
              A*
            </Button>
          </Grid>
        </Grid>
        {winner ? (
          <>
            <Grid
              container
              className={classes.winner}
              justifyContent={"center"}
            >
              Winner
            </Grid>
            <Typography variant={"h4"} align={"center"} color={"primary"}>
              Steps: {steps}
            </Typography>
            <Grid
              container
              className={classes.winner}
              justifyContent={"center"}
            >
              <Grid item>
                <Button
                  className={classes.next_level}
                  color={"secondary"}
                  onClick={() => {
                    retry();
                  }}
                  size="large"
                >
                  <NavLink className="nav_option" to="/level6">
                    next level
                  </NavLink>
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Container>
              <Grid container className={classes.container}>
                <Grid item>
                  <div className={classes.patch}></div>
                  <Patch currArray={currArray} classes={classes} />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid xs={12} className={classes.flex} item>
                  <IconButton
                    color={"secondary"}
                    onClick={() => {
                      moveHandelr("top");
                    }}
                  >
                    <KeyboardArrowUp className={classes.btn} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    color={"secondary"}
                    onClick={() => {
                      moveHandelr("left");
                    }}
                  >
                    <KeyboardArrowLeft className={classes.btn} />
                  </IconButton>
                  <IconButton
                    color={"secondary"}
                    onClick={() => {
                      moveHandelr("down");
                    }}
                  >
                    <KeyboardArrowDown className={classes.btn} />
                  </IconButton>
                  <IconButton
                    color={"secondary"}
                    variant={"outlined"}
                    onClick={() => {
                      moveHandelr("right");
                    }}
                  >
                    <KeyboardArrowRight className={classes.btn} />
                  </IconButton>
                </Grid>
                <Grid xs={12} item>
                  <Typography
                    variant={"h4"}
                    align={"center"}
                    color={"secondary"}
                  >
                    Steps: {steps}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </div>
    </>
  );
};

export default Level5;
