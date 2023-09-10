import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';


const RootLayout = () => {

  let navigate = useNavigate();
  
  let data = useSelector((stade) => stade.logedUser.value);
  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
        <Sidebar/>
        </Grid>
        <Grid item xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default RootLayout;
