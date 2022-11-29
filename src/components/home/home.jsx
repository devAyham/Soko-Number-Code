import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    home: {
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      position: "relative",
    },
    nav_option: {
      textDecoration: "none",
      color: "#fff",
    },
    btn: {
      margin: "20px",
      background: "linear-gradient(45deg, #f46b45 30%, #eea849 90%)",
      transition: "all 500ms !important",
      "&:hover": {
        fontSize: 20,
      },
      [theme.breakpoints.down("md")]: {
        fontSize: 18,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
      },
    },
    flexBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    mainTitle: {
      position: "relative",
      fontSize: 150 ,
      margin: 40,
      fontFamily: " Nabla , cursive ",
      textAlign: "center",
      // fontFamily : 'Common Pixel , sans-serif ',
      // WebkitBackgroundClip: 'text' ,
      // textFillColor: 'transparent',
      [theme.breakpoints.down("md")]: {
        fontSize: 120,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 90,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 80,
      },
    },
    boxback: {
      // filter : 'blur(5px)',
      opacity: 0.5,
      position: "absolute",
      width: "100%",
      height: "100vh",
      objectFit: "cover",
      objectPosition: "center",
      zIndex: 0,
    },
    back: {
      position: "absolute",
      zIndex: -1,
      // opacity: 0.6,
      width: "100%",
      height: "100vh",
      objectFit: "cover",
      objectPosition: "center",
    },
  };
});
const Home = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.home}>
        <img className={classes.boxback} src={"/background.svg"} alt={""} />
        <img className={classes.back} src={"/background copy.svg"} alt={""} />
        <Container>
          <Grid
            container
            item
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Typography className={classes.mainTitle} variant={"h1"}>
              Soko Number
            </Typography>
            <Grid className={classes.flexBox} item xs={12}>
              <Button
                size={"large"}
                className={classes.btn}
                variant={"contained"}
              >
                <NavLink className={classes.nav_option} to="/level1">
                  Level 1
                </NavLink>
              </Button>
            </Grid>
            <Grid className={classes.flexBox} item xs={12}>
              <Button
                size={"large"}
                className={classes.btn}
                variant={"contained"}
              >
                <NavLink className={classes.nav_option} to="/level2">
                  Level 2
                </NavLink>
              </Button>
            </Grid>
            <Grid className={classes.flexBox} item xs={12}>
              <Button
                size={"large"}
                className={classes.btn}
                variant={"contained"}
              >
                <NavLink className={classes.nav_option} to="/level3">
                  Level 3
                </NavLink>
              </Button>
            </Grid>
            <Grid className={classes.flexBox} item xs={12}>
              <Button
                size={"large"}
                className={classes.btn}
                variant={"contained"}
              >
                <NavLink className={classes.nav_option} to="/level4">
                  Level 4
                </NavLink>
              </Button>
            </Grid>
            <Grid className={classes.flexBox} item xs={12}>
              <Button
                size={"large"}
                className={classes.btn}
                variant={"contained"}
              >
                <NavLink className={classes.nav_option} to="/level5">
                  Level 5
                </NavLink>
              </Button>
            </Grid>
            <Grid className={classes.flexBox} item xs={12}>
              <Button
                size={"large"}
                className={classes.btn}
                variant={"contained"}
              >
                <NavLink className={classes.nav_option} to="/level6">
                  Level 6
                </NavLink>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Home;
