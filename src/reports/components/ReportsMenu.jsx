import React, { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Star as StarIcon,
  Timeline as TimelineIcon,
  PauseCircleFilled as PauseCircleFilledIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
  NotificationsActive as NotificationsActiveIcon,
  FormatListBulleted as FormatListBulletedIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  Route as RouteIcon,
  EventRepeat as EventRepeatIcon,
  Notes as NotesIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  DirectionsCar as DirectionsCarIcon, // Importing DirectionsCarIcon for travel by road
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../../common/components/LocalizationProvider";
import {
  useAdministrator,
  useRestriction,
} from "../../common/util/permissions";

const MenuItem = ({
  title,
  link,
  icon,
  selected,
  onClick,
  expandable,
  open,
}) => (
  <>
    <ListItemButton
      key={link}
      component={Link}
      to={link}
      selected={selected}
      onClick={onClick}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
      {expandable ? open ? <ExpandLessIcon /> : <ExpandMoreIcon /> : null}
    </ListItemButton>
  </>
);

const ReportsMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  const admin = useAdministrator();
  const readonly = useRestriction("readonly");

  const [openActivity, setOpenActivity] = useState(false);

  const handleActivityClick = () => {
    setOpenActivity(!openActivity);
  };

  return (
    <>
      <List>
        <MenuItem
          title={t("reportCombined")}
          link="/reports/combined"
          icon={<StarIcon />}
          selected={location.pathname === "/reports/combined"}
        />
        <MenuItem
          title={t("reportRoute")}
          link="/reports/route"
          icon={<TimelineIcon />}
          selected={location.pathname === "/reports/route"}
        />
        <MenuItem
          title={t("reportEvents")}
          link="/reports/event"
          icon={<NotificationsActiveIcon />}
          selected={location.pathname === "/reports/event"}
        />
        <MenuItem
          title={t("reportTrips")}
          link="/reports/trip"
          icon={<PlayCircleFilledIcon />}
          selected={location.pathname === "/reports/trip"}
        />
        <MenuItem
          title={t("reportStops")}
          link="/reports/stop"
          icon={<PauseCircleFilledIcon />}
          selected={location.pathname === "/reports/stop"}
        />
        <MenuItem
          title={t("reportSummary")}
          link="/reports/summary"
          icon={<FormatListBulletedIcon />}
          selected={location.pathname === "/reports/summary"}
        />
        <MenuItem
          title={t("reportChart")}
          link="/reports/chart"
          icon={<TrendingUpIcon />}
          selected={location.pathname === "/reports/chart"}
        />
        <MenuItem
          title={t("reportReplay")}
          link="/replay"
          icon={<RouteIcon />}
        />
        <MenuItem
          title="Activity"
          link="#"
          icon={<RouteIcon />}
          expandable
          open={openActivity}
          onClick={handleActivityClick}
        />
        <Collapse in={openActivity} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <MenuItem
              title="Travel"
              link="/reports/travel"
              icon={<DirectionsCarIcon />} // Using DirectionsCarIcon for travel by road
              selected={location.pathname === "/reports/travel"}
            />
            {/* Add more nested items here if needed */}
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        {admin && (
          <MenuItem
            title={t("statisticsTitle")}
            link="/reports/statistics"
            icon={<BarChartIcon />}
            selected={location.pathname === "/reports/statistics"}
          />
        )}
      </List>
    </>
  );
};

export default ReportsMenu;
