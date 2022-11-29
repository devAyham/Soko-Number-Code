import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Patch } from "./Patch";
import {
  ArrowBack,
  ArrowBackIos,
  ArrowDownwardOutlined,
  ArrowForward,
  ArrowForwardIosOutlined,
  ArrowUpwardOutlined,
} from "@material-ui/icons";

export default function ScrollDialog({
  openn,
  data,
  handleClose,
  classes,
  patch,
}) {
  //   const [openn, setOpen] = React.useState(openn);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openn) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openn]);
  return (
    <div>
      {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button> */}
      <Dialog
        open={openn}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Steps: {data?.path?.length} <br/> Visited Nodes: {data?.counter} <br/> {data?.cost !== 0 && ('Cost :' + data?.cost) } 
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className={classes.flexColumns}>
              <Patch currArray={patch} classes={classes} />
            </div>
            {data?.path?.map((patch) => {
              return (
                <>
                  <hr />
                  <div className={classes.flexColumns}>
                    {patch[0] === "left" ? (
                      <ArrowBack color={"secondary"} fontSize={"large"} />
                    ) : patch[0] === "right" ? (
                      <ArrowForward color={"secondary"} fontSize={"large"} />
                    ) : patch[0] === "Top" ? (
                      <ArrowUpwardOutlined
                        color={"secondary"}
                        fontSize={"large"}
                      />
                    ) : patch[0] === "Down" ? (
                      <ArrowDownwardOutlined
                        color={"secondary"}
                        fontSize={"large"}
                      />
                    ) : (
                      <></>
                    )}

                    <Patch currArray={patch[1]} classes={classes} />
                  </div>
                </>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
