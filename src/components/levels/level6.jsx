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
} from "@material-ui/icons";
import ReplyIcon from "@material-ui/icons/Reply";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Stracture from "../../classes/structure";
import Logic from "../../classes/logic";
import ScrollDialog from "../modals/modal";
import { Patch } from "../modals/Patch";
import { useStyles } from "../../styles/useStyles";
var _ = require("lodash");

const level_six_arr = [
  ["W", "W", "W", "W", "W", "W"],
  ["W", "E", "E", "B2T2", "W", "W"],
  ["W", "E", "B1", "T1", "B5T5", "W"],
  ["W", "B3", "W", "B4T3", "T4", "W"],
  ["W", "W", "W", "W", "W", "W"],
];
const level_six = new Stracture([...level_six_arr]);
const logic = new Logic();

const Level6 = () => {
  let [currArray, SetCurArray] = useState([...level_six.currArr]);
  let [winner, SetWinner] = useState(false);
  let [steps, setsteps] = useState(-1);
  let [state, setState] = useState([[...level_six.patch]]);
  let [nextMove, SetNextMove] = useState([
    ...level_six.getNextMove(level_six.currArr),
  ]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  const classes = useStyles(70);
  const handleClickOpen = () => {
    setOpen(true);
    // setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let moveHandelr = (dir) => {
    level_six.currArr = [...level_six.move(dir, currArray)];
    if (!level_six.isEqual(currArray, level_six.currArr))
      SetCurArray(level_six.currArr);
  };
  let retry = () => {
    level_six.currArr = level_six.patch;
    level_six.boxes = _.cloneDeep(level_six.StaticBoxes);
    level_six.states = [level_six.patch];
    SetCurArray(level_six.currArr);
    setsteps(-1);
    setState([level_six.patch]);
    SetWinner(false);
  };
  // let DFSHandelr = () => {
  //   logic.DFS(level_six);
  //   console.log("DFS", logic.stack);
  //   setData(logic.stack);
  //   handleClickOpen();
  // };
  let DFSHandelr = () => {
    logic.newDFS(level_six);
    console.log("DFS", logic.finalPath);
    setData(logic.solution);
    handleClickOpen();
  };
  let BFSHandelr = () => {
    logic.BFS(level_six);
    console.log("BFS", logic.finalPath);
    setData(logic.solution);
    handleClickOpen();
  };
  let UCSHandelr = () => {
    logic.UCS({ element: level_six, priority: 0 });
    console.log("UCS", logic.solution);
    setData(logic.solution);
    handleClickOpen();
  };
  let AStarHandelr = () => {
    logic.AStar({ element: level_six, priority: 0 });
    console.log("Astar", logic.solution);
    setData(logic.solution);
    handleClickOpen();
  };
  useEffect(() => {
    SetNextMove(level_six.getNextMove(level_six.currArr));
    //is Step
    setsteps(steps + 1);
    //is new State
    if (level_six.isNewState(currArray)) {
      level_six.states.push(currArray);
      setState([...state, currArray]);
    }
    // Is Final
    if (level_six.isEqual(currArray, level_six.finalArr) === true) {
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
        patch={level_six.patch}
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
            Level 6
            <IconButton
              color={"secondary"}
              onClick={() => {
                retry();
              }}
            >
              <Replay fontSize={"large"} />
            </IconButton>
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
            ></Grid>
          </>
        ) : (
          <>
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
            <Container className={classes.container}>
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

export default Level6;
