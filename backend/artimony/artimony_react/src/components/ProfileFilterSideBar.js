// import React, { useState } from "react";
// import Sidebar from "react-sidebar";

// import "../styles/ProfileFilterSideBar.css";

// const ProfileFilterSideBar = ({ filters, onApplyFilters }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleFilterChange = (filter) => {
//     const index = selectedFilters.indexOf(filter);
//     if (index === -1) {
//       setSelectedFilters([...selectedFilters, filter]);
//     } else {
//       const updatedFilters = [...selectedFilters];
//       updatedFilters.splice(index, 1);
//       setSelectedFilters(updatedFilters);
//     }
//   };

//   const applyFilters = () => {
//     onApplyFilters(selectedFilters);
//     toggleSidebar();
//   };

//   return (
//     <Sidebar
//       sidebar={
//         <div className="sidebar">
//           <h2>Filter Options</h2>
//           <ul>
//             {filters.map((filter) => (
//               <li key={filter}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.includes(filter)}
//                     onChange={() => handleFilterChange(filter)}
//                   />
//                   {filter}
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <button onClick={applyFilters}>Apply Filters</button>
//         </div>
//       }
//       open={sidebarOpen}
//       onSetOpen={setSidebarOpen}
//       pullRight={false}
//     >
//       <button onClick={toggleSidebar}>Show Filters</button>
//     </Sidebar>
//   );
// };

// export default ProfileFilterSideBar;

import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import dpImg from "../assets/img/dp.jpg";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// import * as React from "react";
import {
  styled,
  alpha,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.55),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.65),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 400,
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: 400,
  },
}));

const Tag = styled("span")(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: "4px 15px",
  borderRadius: "40px",
  // backgroundColor: theme.palette.common.white,
  // color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "nowrap",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.8),
    // color: theme.palette.common.white,
    cursor: "pointer",
  },
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(1),
  marginTop: 20,
  maxHeight: 48,
  overflowX: "auto",
  overflowY: "hidden",
  "::-webkit-scrollbar": {
    display: "none", // Hide the scrollbar
  },
}));

function handleWheel(event) {
  if (event.deltaY !== 0) {
    // Prevent the default vertical scrolling
    event.preventDefault();
    // Scroll in the horizontal direction instead
    event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
  }
}

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

export default function PrimarySearchAppBar({ tags, setTags, onSearch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  //   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  //   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fcb603", // Change primary color
      },
      secondary: {
        main: "#ff4081", // Change secondary color
      },
    },
    typography: {
      fontFamily: "Oswald",
    },
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //   const handleMobileMenuClose = () => {
  //     setMobileMoreAnchorEl(null);
  //   };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  //   const handleMobileMenuOpen = (event) => {
  //     setMobileMoreAnchorEl(event.currentTarget);
  //   };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ "& .MuiMenu-paper": { width: 200, marginTop: 5 } }}
    >
      <MenuItem onClick={() => navigate("/platform/profile")}>Profile</MenuItem>
      <MenuItem onClick={() => navigate("/platform/payment")}>
        Subscribe
      </MenuItem>
      <MenuItem onClick={() => navigate("/platform/payment/cancel")}>
        Cancel Plan
      </MenuItem>
      <MenuItem onClick={() => navigate("/platform/payment/update")}>
        Update Plan
      </MenuItem>
      <MenuItem onClick={() => navigate("/platform/logout")}>Logout</MenuItem>
    </Menu>
  );

  const handleKeyDown = (e) => {
    const value = e.target.value;
    setInputValue((prevVal) => value);
    if (value[value.length - 1] === " ") {
      // event.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (inputValue.trim() !== "") {
      setTags([inputValue.trim(), ...tags]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
            >
              CINEMATHOOTHU
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
            <Search>
              <Box position="relative">
                <SearchIconWrapper>
                  <IconButton onClick={onSearch} style={{ padding: 0 }}>
                    <SearchIcon />
                  </IconButton>
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Add Filters..."
                  inputProps={{ "aria-label": "search" }}
                  value={inputValue}
                  onChange={handleKeyDown}
                  // onKeyDown={handleKeyDown}
                />
              </Box>
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }}>
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
            {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
          </Toolbar>
        </AppBar>
        {tags.length > 0 && (
          <TagsContainer onWheel={handleWheel}>
            {tags.map((tag, index) => (
              <Tag key={index}>
                {tag}
                <IconButton
                  size="small"
                  onClick={() => removeTag(index)}
                  style={{ marginLeft: 8, padding: 0 }}
                >
                  <CloseIcon fontSize="small" style={{ color: "white" }} />
                </IconButton>
              </Tag>
            ))}
          </TagsContainer>
        )}
        {/* {renderMobileMenu} */}
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
}

// export default function AnchorTemporaryDrawer() {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const profileDetails = {
//     firstName: "John",
//     lastName: "Doe",
//     profilePicUrl: dpImg, // Update with actual path
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{
//         width: 250,
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//       role="presentation"
//       //   onClick={toggleDrawer(anchor, false)}
//       //   onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon sx={{ color: "#fcb603" }}>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary={"Home"}></ListItemText>
//           </ListItemButton>
//         </ListItem>
//       </List>
//       {/* <Divider /> */}
//       <List>
//         <ListItem disablePadding onClick={handleClick}>
//           <ListItemButton>
//             <ListItemIcon>
//               <Avatar
//                 src={profileDetails.profilePicUrl}
//                 alt="Profile Picture"
//               />
//             </ListItemIcon>
//             <ListItemText
//               primary={`${profileDetails.firstName} ${profileDetails.lastName}`}
//               //   secondary={open ? <ExpandLess /> : <ExpandMore />}
//             />
//             {open ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton sx={{ pl: 4 }}>
//               {/* <ListItemIcon sx={{ color: "#fcb603" }}>
//                 <SettingsIcon />
//               </ListItemIcon> */}
//               <ListItemText primary="Profile Settings" />
//             </ListItemButton>
//             <ListItemButton sx={{ pl: 4 }}>
//               {/* <ListItemIcon sx={{ color: "#fcb603" }}>
//                 <SettingsIcon />
//               </ListItemIcon> */}
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//             {/* Additional settings can be added here */}
//           </List>
//         </Collapse>
//         {/* <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <SettingsIcon />
//             </ListItemIcon>
//             <ListItemText primary={"Profile Settings"} />
//           </ListItemButton>
//         </ListItem> */}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       {/* {["left", "right", "top", "bottom"].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))} */}
//       <>
//         <MenuIcon onClick={toggleDrawer("left", true)} />
//         <Drawer
//           anchor="left"
//           open={state["left"]}
//           onClose={toggleDrawer("left", false)}
//           //   sx={{
//           //     "& .MuiDrawer-paper": {
//           //       //   background: "white", // Set background color
//           //       color: "#fcb603", // Set foreground color
//           //     },
//           //   }}
//         >
//           {list("left")}
//         </Drawer>
//       </>
//     </div>
//   );
// }
