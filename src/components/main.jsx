import {  createTheme, ThemeProvider } from "@material-ui/core";
import { Navigate, Route, Routes } from "react-router";
// import Stracture from "../classes/structure";
import Home from "./home/home";
import Level1 from "./levels/level1";
import Level2 from "./levels/level2";
import Level3 from "./levels/level3";
import Level4 from "./levels/level4";
import Level5 from "./levels/level5";
import Level6 from "./levels/level6";


const theme = createTheme({
  // palette:{
  //   primary:{
  //     main:'#feeeee'
  //   }
  // }

})
 

const Main = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="./" element={<Navigate to={"./home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/level1" element={<Level1  />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/level4" element={<Level4 />} />
        <Route path="/level5" element={<Level5 />} />
        <Route path="/level6" element={<Level6 />} />
      </Routes>
    </ThemeProvider>
    </>
  );
};

export default Main;
