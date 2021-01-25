import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { removeStack, setSelectedPage } from "../../actions/MainActions";
import base_url from "../../../constants/base_url";
import { getOnlineBusinessList } from "./action";
import "./onlineBusinesses.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { img_url } from "../../../constants/base_url";

const theme = createMuiTheme({
  typography: {
    fontFamily: "VazirMedium",
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0.6rem",
    textAlign: "center",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    textAlign: "right",
    borderRadius: "0.6rem",
    border: "solid 1px lightgray",
  },
  nestedSubmenu1: {
    marginRight: "15px",
    marginLeft: "-10px",
  },
  nestedSubmenu2: {
    marginRight: "65px",
  },
}));

const OnlineBusinesses = () => {
  //const onlineBusinesses = store.get("onlineBusinesses");
  const token = store.get("token");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    get_OnlineBusinessesList();
  }, []);
  const onlineBuisinesesList = useSelector(
    (state) => state.onlineBusinessesReducer?.onlineBuisinesesList
  );

  const get_OnlineBusinessesList = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);
    axios
      .get(`${base_url}categories/businesses-online/tree`, { headers: headers })
      .then((response) => {
        console.log("bus", response.data.data.categories);
        setLoading(false);
        dispatch(getOnlineBusinessList(response.data.data.categories));
        //store.set("onlineBusinesses", response.data);
      })
      .catch((err) => {
        console.log("err in get OnlineBusinessesList", err);
      });
  };
  const classes = useStyles();
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [opensubMenu1, setOpensubMenu1] = React.useState(false);
  const [opensubMenu2, setOpensubMenu2] = React.useState(false);

  const handleMenu1Click = () => {
    setOpenMenu1(!openMenu1);
    if (openMenu1) {
      setOpensubMenu1(!openMenu1);
    }
  };

  const handleSubMenu1Click = () => {
    setOpensubMenu1(!opensubMenu1);
  };
  const handleMenu2Click = () => {
    setOpenMenu2(!openMenu2);
    if (openMenu2) {
      setOpensubMenu2(!openMenu2);
    }
  };

  const handleSubMenu2Click = () => {
    setOpensubMenu2(!opensubMenu2);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              فروشگاه های آنلاین
            </ListSubheader>
          }
          className={classes.root}
        >
          <ListItem
            className={classes.nested}
            button
            onClick={handleMenu1Click}
          >
            <ListItemIcon>
              <img
                src={`${img_url}/icons/selected/06a110b647a5fa3fece3e56d3b2db3bb.png`}
                alt=""
              ></img>
            </ListItemIcon>
            <ListItemText primary={onlineBuisinesesList[0]?.name} />
            {openMenu1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMenu1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={handleSubMenu1Click}
              >
                <ListItemIcon className={classes.nestedSubmenu1}>
                  <img
                    src={`${img_url}/icons/selected/27c4d591449275bf502ee78cbcfffb41.png`}
                    alt=""
                  ></img>
                </ListItemIcon>
                <ListItemText
                  primary={
                    onlineBuisinesesList[0]?.business_sub_category[0]?.name
                  }
                />
                {opensubMenu1 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={opensubMenu1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText
                      className={classes.nestedSubmenu2}
                      primary={
                        onlineBuisinesesList[0]?.business_sub_category[0]
                          ?.businesses_online[0]?.shop_name
                      }
                    />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>
          {/* --------------------------------------- */}
          <ListItem
            className={classes.nested}
            button
            onClick={handleMenu2Click}
          >
            <ListItemIcon>
              <img
                src={`${img_url}/icons/selected/5e1b2d9dd8dc8f8f389fba3f539316e5.png`}
                alt=""
              ></img>
            </ListItemIcon>
            <ListItemText primary={onlineBuisinesesList[1]?.name} />
            {openMenu2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMenu2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={handleSubMenu2Click}
              >
                <ListItemIcon className={classes.nestedSubmenu1}>
                  <img
                    src={`${img_url}/icons/selected/86395d7b90483e75512e1c8f3f27d85a.png`}
                    alt=""
                  ></img>
                </ListItemIcon>
                <ListItemText
                  primary={
                    onlineBuisinesesList[1]?.business_sub_category[0]?.name
                  }
                />
                {opensubMenu2 ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={opensubMenu2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText
                      className={classes.nestedSubmenu2}
                      primary={
                        onlineBuisinesesList[1]?.business_sub_category[0]
                          ?.businesses_online[0]?.shop_name
                      }
                    />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>
        </List>
      </ThemeProvider>
    </>
  );
};

export default OnlineBusinesses;
