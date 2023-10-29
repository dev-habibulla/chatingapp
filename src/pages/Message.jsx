import React from "react";
import Grid from "@mui/material/Grid";
import Friends from './../components/Friends';
import MyGroups from './../components/MyGroups';
import GroupMessageList from './../components/GroupMessageList';
import FriendMessegeList from './../components/FriendMessegeList';
import Msg from './../components/Msg';

const Message = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
     
      <GroupMessageList/>
      <FriendMessegeList/>
      
        </Grid>
        <Grid item xs={9}>
        <Msg/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;
