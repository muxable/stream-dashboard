import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import { Typography } from "@mui/material";

export function Test() {
  return (
    <div>
      <Navbar title="Test" />
      <Sidebar />
      <Typography>TEST</Typography>
      <Footer />
    </div>
  );
}
