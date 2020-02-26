import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";


//function that displays the copywrite
// ***********************************
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.lighthouselabs.ca/">
        Darren Don & Kevin
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
