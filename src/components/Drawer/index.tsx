import React from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, useTheme, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector, useDispatch} from "react-redux";
import {drawerState, changeOpenState} from "@stores/drawerSlices";
import {IconName} from "@fortawesome/fontawesome-common-types";
import {logOutThunk} from "@stores/authSlice";
import {useHistory} from "react-router-dom";

import {Paths} from "@utils/index";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export interface IconList {
  text: string,
  icon: IconName,
  onClick: () => void

}

interface MiniDrawerProps {
  title: string,
  items: IconList[],
  children: React.ReactComponentElement<any>
}

export default function MiniDrawer({children, title, items}: MiniDrawerProps) {
  const classes = useStyles();
  const theme = useTheme();
  const {push} = useHistory();

  const open = useSelector(drawerState);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(changeOpenState());
  };

  const handleDrawerClose = () => {
    dispatch(changeOpenState());
  };

  const goLogOut = () => dispatch(logOutThunk());
  const goHome = () => push(Paths.root);

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <FontAwesomeIcon icon={["fal", "bars"]}/>
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <FontAwesomeIcon icon={["fal", "angle-right"]}/> :
              <FontAwesomeIcon icon={["fal", "angle-left"]}/>}
          </IconButton>
        </div>
        <Divider/>
        <List>
          {items.map(item => <ListItem button key={item.text} onClick={item.onClick}>
            <ListItemIcon>
              <FontAwesomeIcon icon={["fal", item.icon]} size={"lg"}/>
            </ListItemIcon>
            <ListItemText primary={item.text}/>
          </ListItem>)}
        </List>
        <Divider/>
        <List>
          <ListItem button onClick={goHome}>
            <ListItemIcon>
              <FontAwesomeIcon icon={["fal", "home"]} size="2x"/>
            </ListItemIcon>
            <ListItemText primary='Principal'/>
          </ListItem>
          <ListItem button onClick={goLogOut}>
            <ListItemIcon>
              <FontAwesomeIcon icon={["fal", "sign-out"]} size="2x"/>
            </ListItemIcon>
            <ListItemText primary='Cerrar Sesión'/>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        {children}
      </main>
    </div>
  );
}