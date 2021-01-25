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
import "./onlineBusineses.css";
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

const OnlineBusineses = () => {
  //const onlineBusinesses = store.get("onlineBusinesses");
  const token = store.get("token");
  const history = useHistory();
  const location = useLocation();
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
  const [openMenu1, setOpenMenu1] = React.useState(null);
  const [openMenu2, setOpenMenu2] = React.useState(null);
  const [opensubMenu1, setOpensubMenu1] = React.useState(false);
  const [opensubMenu2, setOpensubMenu2] = React.useState(false);
  let openMenu;
  const handleMenuClick = (e) => {
    if (e == 1) {
      setOpenMenu1(!openMenu1);
      if (openMenu1) {
        setOpensubMenu1(!openMenu1);
      }
    } else if (e == 2) {
      setOpenMenu2(!openMenu2);
      if (openMenu2) {
        setOpensubMenu2(!openMenu2);
      }
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
        {console.log(
          "rrrrr",
          onlineBuisinesesList[0]?.business_sub_category[0]?.name
        )}
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
          {onlineBuisinesesList.map((item, index) => {
            return (
              <>
                <ListItem
                  className={classes.nested}
                  button
                  onClick={() => handleMenuClick(index + 1)}
                >
                  <ListItemIcon>
                    <img
                      src={`${img_url}/icons/selected/06a110b647a5fa3fece3e56d3b2db3bb.png`}
                      alt=""
                    ></img>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {openMenu[index + 1] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {Object.values(item).map((item2, index) => {
                  if (typeof item2 == "object") {
                    return (
                      <>
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
                              <ListItemText primary={item2[0].name} />
                              {opensubMenu1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            {item2.map((item3, index) => {
                              if (typeof item3 == "object") {
                                return (
                                  <>
                                    <Collapse
                                      in={opensubMenu1}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <List component="div" disablePadding>
                                        <ListItem
                                          button
                                          className={classes.nested}
                                        >
                                          <ListItemText
                                            className={classes.nestedSubmenu2}
                                            primary={
                                              item3.businesses_online[0]
                                                .shop_name
                                            }
                                          />
                                        </ListItem>
                                      </List>
                                    </Collapse>
                                  </>
                                );
                              }
                            })}
                          </List>
                        </Collapse>
                      </>
                    );
                  }
                })}
              </>
            );
          })}
        </List>
      </ThemeProvider>
    </>
  );
};

export default OnlineBusineses;
