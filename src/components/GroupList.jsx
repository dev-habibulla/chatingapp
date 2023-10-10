import React from "react";
import gimg from "../assets/gimg.png";
import Image from "./Image";
import Button from '@mui/material/Button';

const GroupList = () => {
  return (
    <div className="box">
      <h3>Groups List</h3>
      <div className="list">
        <Image src={gimg} />
        <h4>Friends Reunion</h4>
        <Button className="listbtn" variant="contained">Join</Button>
      </div>
    
    </div>
  );
};

export default GroupList;
