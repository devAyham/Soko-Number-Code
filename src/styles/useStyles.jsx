import { makeStyles } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "70%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
      marginBottom: "auto",
    },
    patch: {
      display: "block",
      width: "fit-content",
      height: "fit-conteny",
      transition: "all 500ms",
      marginBottom : 'auto'
    },
    box: {
      background: "url(/box.jpg) ",
      backgroundSize: "cover",
      width: (size) => {
        return size;
      },
      height: (size) => {
        return size;
      },
      fontSize: 25,
    //   [theme.breakpoints.down("md")]: {
    //     width: "70px !important",
    //     height: "70px !important",
    //   },
      [theme.breakpoints.down("sm")]: {
        width: "60px !important",
        height: "60px !important",
      },
      [theme.breakpoints.down("xs")]: {
        width: "50px !important",
        height: "50px !important",
      },
    },
    wall: {
      background: "url(/wall.jpg)",
      backgroundSize: "cover",
      width: (size) => {
        return size;
      },
      height: (size) => {
        return size;
      },
    //   [theme.breakpoints.down("md")]: {
    //     width: "70px !important",
    //     height: "70px !important",
    //   },
      [theme.breakpoints.down("sm")]: {
        width: "60px !important",
        height: "60px !important",
      },
      [theme.breakpoints.down("xs")]: {
        width: "50px !important",
        height: "50px !important",
      },
    },
    target: {
      background: "url(/target.svg)",
      backgroundSize: "cover",
      width: (size) => {
        return size;
      },
      height: (size) => {
        return size;
      },
    //   [theme.breakpoints.down("md")]: {
    //     width: "70px !important",
    //     height: "70px !important",
    //   },
      [theme.breakpoints.down("sm")]: {
        width: "60px !important",
        height: "60px !important",
      },
      [theme.breakpoints.down("xs")]: {
        width: "50px !important",
        height: "50px !important",
      },
    },
    empty: {
      background: "transparent",
      width: (size) => {
        return size;
      },
      height: (size) => {
        return size;
      },
    //   [theme.breakpoints.down("md")]: {
    //     width: "70px !important",
    //     height: "70px !important",
    //   },
      [theme.breakpoints.down("sm")]: {
        width: "60px !important",
        height: "60px !important",
      },
      [theme.breakpoints.down("xs")]: {
        width: "50px !important",
        height: "50px !important",
      },
    },
    row: {
      display: "flex",
    },
    btn: {
      fontSize: 60,
    },
    success: {
      fontSize: 50,
      color: green[500],
    },
    wrong: {
      fontSize: 50,
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
      [theme.breakpoints.down("xs")]: {
        marginTop: "0 !important ;",
        marginLeft: "40px !important",
      },
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
      [theme.breakpoints.down("sm")]: {
        fontSize: 40,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 35,
      },
    },
    winner: {
      fontSize: 200,
      fontFamily: " Nabla , cursive ",
      [theme.breakpoints.down("sm")]: {
        fontSize: 150,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 100,
      },
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
  };
});
