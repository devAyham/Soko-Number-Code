import { Avatar } from "@material-ui/core";
import { HighlightOffTwoTone } from "@material-ui/icons";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";

export const Patch = ({ currArray, classes }) => {
  return (
    <>
      {" "}
      {currArray?.map((row, i) => {
        return (
          <div className={classes.row}>
            {row.map((ele, i) => {
              if (ele === "W") {
                return (
                  <Avatar variant={"square"} className={classes.wall}>
                    {""}
                  </Avatar>
                );
              } else if (ele === "E") {
                return (
                  <Avatar variant={"square"} className={classes.empty}>
                    {""}
                  </Avatar>
                );
              } else if (ele[0] === "T") {
                return (
                  <Avatar variant={"rounded"} className={classes.target}>
                    {ele[1]}
                  </Avatar>
                );
              } else if (ele.length === 2 && ele[0] === "B") {
                return (
                  <>
                    <Avatar variant={"rounded"} className={classes.box}>
                      {ele[1]}
                    </Avatar>
                  </>
                );
              } else if (ele.length === 4 && ele[1] === ele[3]) {
                return (
                  <>
                    <Avatar  variant={"rounded"} className={classes.box}>
                      <CheckCircleTwoToneIcon  className={classes.success} />
                    </Avatar>
                  </>
                );
              } else if (ele.length === 4 && ele[1] !== ele[3]) {
                return (
                  <>
                    <Avatar variant={"rounded"} className={classes.box}>
                      <HighlightOffTwoTone className={classes.wrong} />
                    </Avatar>
                  </>
                );
              }
            })}
            <br key={i} />
          </div>
        );
      })}
    </>
  );
};
