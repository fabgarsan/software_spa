import React from "react";
import { styled, Theme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { changeOpenState, drawerState } from "@stores/drawerSlices";
import { IconName } from "@fortawesome/pro-light-svg-icons";
import { auth, logOutThunk } from "@stores/authSlice";
import { useNavigate } from "react-router-dom";

import { DRAWER, Paths } from "@utils/index";
import { NoViewDisplayAllowed } from "@components/shared";
import { createStyles, makeStyles } from "@mui/styles";
import store from "@stores/store";
import { PrinterStatus } from "@components/shared/Drawer/PrinterStatus/PrinterStatus";
import { printerDisplayOnMenuState } from "@stores/printerSlice";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.primary.main,
    },
  })
);

export interface IconList {
  text: string;
  icon: IconName;
  onClick: () => void;
  show?: boolean;
}

interface MiniDrawerProps {
  title: string;
  canShowContent: boolean;
  items: IconList[];
  children: React.ReactNode;
  withMainIcon?: boolean;
}

interface DrawerListItemProps {
  onClick: () => void;
  text: string;
  icon: IconName;
}

const DrawerListItem = ({ onClick, icon, text }: DrawerListItemProps) => {
  const classes = useStyles();
  return (
    <ListItem onClick={onClick}>
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon
            icon={["fal", icon]}
            size="lg"
            className={classes.icon}
          />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

const MiniDrawer: React.FunctionComponent<MiniDrawerProps> = ({
  children,
  title,
  items,
  withMainIcon,
  canShowContent,
}: MiniDrawerProps) => {
  const navigate = useNavigate();

  const itemsToShow = items.filter((item) => item.show);

  const open = useSelector(drawerState);
  const showPrinter = useSelector(printerDisplayOnMenuState);
  const authUser = useSelector(auth);

  const handleDrawerOpen = () => {
    store.dispatch(changeOpenState());
  };

  const handleDrawerClose = () => {
    store.dispatch(changeOpenState());
  };

  const goLogOut = () => store.dispatch(logOutThunk());
  const goHome = () => navigate(Paths.root);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <FontAwesomeIcon icon={["fal", "bars"]} />
          </IconButton>
          <Box>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </Box>
          {showPrinter && (
            <Box ml={1}>
              <PrinterStatus />
            </Box>
          )}
          {authUser.user && (
            <Box position="absolute" right="20px">
              <Typography>{authUser.user?.username}</Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} size="large">
            <FontAwesomeIcon icon={["fal", "angle-left"]} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {canShowContent &&
            itemsToShow.map((item) => (
              <DrawerListItem
                key={item.text}
                onClick={item.onClick}
                icon={item.icon}
                text={item.text}
              />
            ))}
        </List>
        <Divider />
        <List>
          {withMainIcon && (
            <DrawerListItem
              onClick={goHome}
              icon={"home"}
              text={DRAWER.MENU_HOME}
            />
          )}
          <DrawerListItem
            onClick={goLogOut}
            icon={"sign-out"}
            text={DRAWER.MENU_SIGN_OUT}
          />
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {(canShowContent && children) || (
          <NoViewDisplayAllowed instanceNamePlural={title} />
        )}
      </Box>
    </Box>
  );
};
MiniDrawer.defaultProps = {
  withMainIcon: true,
};

export default MiniDrawer;
