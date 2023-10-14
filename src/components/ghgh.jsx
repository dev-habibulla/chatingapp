// import React, { useEffect, useState } from "react";
// import gimg from "../assets/gimg.png";
// import Image from "./Image";
// import Button from "@mui/material/Button";
// import { useDispatch, useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";

// import {
//   getDatabase,
//   ref,
//   onValue,
//   remove,
//   set,
//   push,
// } from "firebase/database";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const MyGroups = () => {
//   const [open, setOpen] = React.useState(false);
//   const [gName, setGname] = useState("");
//   let [groupReqList, setGroupReqList] = useState([]);
//   const handleOpen = (iteam) => {
//     setGname(iteam.groupName);
//     const groupRef = ref(db, "groupRequest");
//     onValue(groupRef, (snapshot) => {
//       let arr = [];
//       snapshot.forEach((giteam) => {
//         if (
//           userInfo.uid == giteam.val().adminUid &&
//           iteam.groupId == giteam.val().groupId
//         ) {
//           arr.push(giteam.val());
//         }
//       });
//       setGroupReqList(arr);
//     });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);
//   const db = getDatabase();
//   let userInfo = useSelector((state) => state.logedUser.value);
//   let [groupList, setGroupList] = useState([]);

//   useEffect(() => {
//     const groupRef = ref(db, "group");
//     onValue(groupRef, (snapshot) => {
//       let arr = [];
//       snapshot.forEach((iteam) => {
//         if (iteam.val().adminUid == userInfo.uid) {
//           arr.push({ ...iteam.val(), groupId: iteam.key });
//         }
//       });
//       setGroupList(arr);
//     });
//   }, []);

//   let handleGroupDel = (iteam) => {
//     remove(ref(db, "group/" + iteam.groupId));
//   };

//   return (
//     <div className="box">
//       <h3>My Groups</h3>
//       {groupList.map((iteam) => (
//         <div className="list">
//           <Image src={gimg} />
//           <h4>{iteam.groupName}</h4>
//           <div className="reqbtn">
//             <Button
//               onClick={() => handleOpen(iteam)}
//               className="reqlistbtn"
//               variant="contained"
//             >
//               ReqList
//             </Button>
//             <Button className="reqlistbtn" variant="contained">
//               Member
//             </Button>
//             <Button
//               onClick={() => handleGroupDel(iteam)}
//               className="reqlistDelbtn"
//               variant="contained"
//             >
//               Delete
//             </Button>
//           </div>

//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <Box sx={style}>
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 These People Want To Join {gName} Group
//               </Typography>
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 {groupReqList.map((iteam) => (
//                   <List
//                     sx={{
//                       width: "100%",
//                       maxWidth: 360,
//                       bgcolor: "background.paper",
//                     }}
//                   >
//                     <ListItem alignItems="flex-start">
//                       <ListItemAvatar>
//                         <Avatar
//                           alt="Remy Sharp"
//                           src="/static/images/avatar/1.jpg"
//                         />
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={iteam.whoSenderName}
//                         secondary={
//                           <React.Fragment>
//                             <Typography
//                               sx={{ display: "inline" }}
//                               component="span"
//                               variant="body2"
//                               color="text.primary"
//                             >
//                               {iteam.whoSenderName}
//                             </Typography>
//                             {`  Want To Join ${gName} Group`}
//                           </React.Fragment>
//                         }
//                       />
//                     </ListItem>
//                   </List>
//                 ))}
//               </Typography>
//             </Box>
//           </Modal>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyGroups;

// import React, { useEffect, useState } from "react";
// import gimg from "../assets/gimg.png";
// import Image from "./Image";
// import Button from "@mui/material/Button";
// import { useDispatch, useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";

// import {
//   getDatabase,
//   ref,
//   onValue,
//   remove,
//   set,
//   push,
// } from "firebase/database";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const MyGroups = () => {
//   const [open, setOpen] = React.useState(false);
//   const [gName, setGname] = useState("");
//   let [groupReqList, setGroupReqList] = useState([]);
//   const handleOpen = (iteam) => {
//     setGname(iteam.groupName);
//     const groupRef = ref(db, "groupRequest");
//     onValue(groupRef, (snapshot) => {
//       let arr = [];
//       snapshot.forEach((giteam) => {
//         console.log("giteam",giteam.val());
//         if (
//           userInfo.uid == giteam.val().adminUid &&
//           iteam.groupId == giteam.val().groupId
//         ) {
//           arr.push(giteam.val());
//         }
//       });
//       setGroupReqList(arr);
//     });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);
//   const db = getDatabase();
//   let userInfo = useSelector((state) => state.logedUser.value);
//   let [groupList, setGroupList] = useState([]);

//   useEffect(() => {
//     const groupRef = ref(db, "group");
//     onValue(groupRef, (snapshot) => {
//       let arr = [];
//       snapshot.forEach((iteam) => {
//         if (iteam.val().adminUid == userInfo.uid) {
//           arr.push({ ...iteam.val(), groupId: iteam.key });
//         }
//       });
//       setGroupList(arr);
//     });
//   }, []);

//   let handleGroupDel = (iteam) => {
//     remove(ref(db, "group/" + iteam.groupId));
//   };

//   return (
//     <div className="box">
//       <h3>My Groups</h3>
//       {groupList.map((iteam) => (
//         <div className="list">
//           <Image src={gimg} />
//           <h4>{iteam.groupName}</h4>
//           <div className="reqbtn">
//             <Button
//               onClick={() => handleOpen(iteam)}
//               className="reqlistbtn"
//               variant="contained"
//             >
//               ReqList
//             </Button>
//             <Button className="reqlistbtn" variant="contained">
//               Member
//             </Button>
//             <Button
//               onClick={() => handleGroupDel(iteam)}
//               className="reqlistDelbtn"
//               variant="contained"
//             >
//               Delete
//             </Button>
//           </div>

//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <Box sx={style}>
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 These People Want To Join {gName} Group
//               </Typography>
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 {groupReqList.map((iteam) => (
//                   <List
//                     sx={{
//                       width: "100%",
//                       maxWidth: 360,
//                       bgcolor: "background.paper",
//                     }}
//                   >
//                     <ListItem alignItems="flex-start">
//                       <ListItemAvatar>
//                         <Avatar
//                           alt="Remy Sharp"
//                           src="/static/images/avatar/1.jpg"
//                         />
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={iteam.whoSenderName}
//                         secondary={
//                           <React.Fragment>
//                             <Typography
//                               sx={{ display: "inline" }}
//                               component="span"
//                               variant="body2"
//                               color="text.primary"
//                             >
//                               {iteam.whoSenderName}
//                             </Typography>
//                             {`  Want To Join ${gName} Group`}
//                           </React.Fragment>
//                         }
//                       />
//                     </ListItem>
//                   </List>
//                 ))}
//               </Typography>
//             </Box>
//           </Modal>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyGroups;
