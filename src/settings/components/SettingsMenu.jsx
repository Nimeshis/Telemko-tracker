import React, { useState } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Settings as SettingsIcon,
  Business as BusinessIcon,
  DriveEta as DriveEtaIcon,
  Notifications as NotificationsIcon,
  Create as CreateIcon,
  Folder as FolderIcon,
  Person as PersonIcon,
  Storage as StorageIcon,
  Build as BuildIcon,
  People as PeopleIcon,
  Today as TodayIcon,
  Publish as PublishIcon,
  Smartphone as SmartphoneIcon,
  Help as HelpIcon,
  Campaign as CampaignIcon,
  MenuOutlined,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "../../common/components/LocalizationProvider";
import {
  useAdministrator,
  useManager,
  useRestriction,
} from "../../common/util/permissions";
import useFeatures from "../../common/util/useFeatures";
import WorkIcon from "@mui/icons-material/Work";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MoneyIcon from "@mui/icons-material/Money";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AlarmIcon from "@mui/icons-material/Alarm";
import AssessmentIcon from "@mui/icons-material/Assessment";

const MenuItem = ({ title, link, icon, selected }) => (
  <ListItemButton key={link} component={Link} to={link} selected={selected}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
);

const SettingsMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  const readonly = useRestriction("readonly");
  const admin = useAdministrator();
  const manager = useManager();
  const userId = useSelector((state) => state.session.user.id);
  const supportLink = useSelector(
    (state) => state.session.server.attributes.support
  );

  const features = useFeatures();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [generalOpen, setGeneralOpen] = useState(false);
  const [masterOpen, setMasterOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false); // State for the Report field

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleGeneralClick = () => {
    setGeneralOpen(!generalOpen);
  };

  const handleMasterOpen = () => {
    setMasterOpen(!masterOpen);
  };

  const handleReportOpen = () => {
    setReportOpen(!reportOpen);
  };

  return (
    <>
      <List>
        <MenuItem
          title={t("sharedPreferences")}
          link="/settings/preferences"
          icon={<SettingsIcon />}
          selected={location.pathname === "/settings/preferences"}
        />
        {!readonly && (
          <>
            <MenuItem
              title={t("sharedNotifications")}
              link="/settings/notifications"
              icon={<NotificationsIcon />}
              selected={location.pathname.startsWith("/settings/notification")}
            />

            <ListItemButton onClick={handleSettingsClick}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
              {settingsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton onClick={handleGeneralClick}>
                  <ListItemText primary="General" inset />
                  {generalOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={generalOpen} timeout="auto" unmountOnExit>
                  <List component="div" style={{ marginLeft: "70px" }}>
                    <MenuItem
                      title={"Companies"}
                      link="/settings/companies"
                      icon={<BusinessIcon />}
                      selected={location.pathname.startsWith(
                        "/settings/companies"
                      )}
                    />
                    <MenuItem
                      title={"Alert"}
                      link="/settings/alert"
                      icon={<NotificationsIcon />}
                      selected={location.pathname.startsWith("/settings/alert")}
                    />

                    {!features.disableDrivers && (
                      <MenuItem
                        title={t("sharedDrivers")}
                        link="/settings/drivers"
                        icon={<DriveEtaIcon />}
                        selected={location.pathname.startsWith(
                          "/settings/drivers"
                        )}
                      />
                    )}

                    <MenuItem
                      title={"Reminder Rule"}
                      link="/settings/remainder"
                      icon={<AlarmIcon />}
                      selected={location.pathname.startsWith(
                        "/settings/remainder"
                      )}
                    />
                  </List>
                </Collapse>
              </List>

              <List component="div" disablePadding>
                <ListItemButton onClick={handleMasterOpen}>
                  <ListItemText primary="Master" inset />
                  {masterOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={masterOpen} timeout="auto" unmountOnExit>
                  <List component="div" style={{ marginLeft: "70px" }}>
                    <MenuItem
                      title={"Job"}
                      link="/settings/jobs"
                      icon={<WorkIcon />}
                      selected={location.pathname.startsWith(
                        "/settings/jobssno"
                      )}
                    />
                    {!features.disableDrivers && (
                      <MenuItem
                        title={"Announcement"}
                        link="/settings/announcement"
                        icon={<AnnouncementIcon />}
                        selected={location.pathname.startsWith(
                          "/settings/announcement"
                        )}
                      />
                    )}
                    {!features.disableDrivers && (
                      <MenuItem
                        title={"Classify Trips"}
                        link="/settings/classifyTrips"
                        icon={<DirectionsCarIcon />}
                        selected={location.pathname.startsWith(
                          "/settings/classifyTripsc"
                        )}
                      />
                    )}
                    {!features.disableDrivers && (
                      <MenuItem
                        title={"Expense"}
                        link="/settings/expense"
                        icon={<MoneyIcon />}
                        selected={location.pathname.startsWith(
                          "/settings/expense"
                        )}
                      />
                    )}
                  </List>
                </Collapse>
              </List>
            </Collapse>

            <ListItemButton onClick={handleReportOpen}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Report" />
              {reportOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={reportOpen} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                style={{ marginLeft: "70px" }}
              >
                <MenuItem
                  title={"Travel"}
                  link="/reports/travel"
                  icon={<DriveEtaIcon />}
                  selected={location.pathname.startsWith(
                    "/reports/travel"
                  )}
                />
                <MenuItem
                  title={"Travel"}
                  link="/settings/report/travel"
                  icon={<DriveEtaIcon />}
                  selected={location.pathname.startsWith(
                    "/settings/report/travel"
                  )}
                />
                <MenuItem
                  title={"Travel"}
                  link="/settings/report/travel"
                  icon={<DriveEtaIcon />}
                  selected={location.pathname.startsWith(
                    "/settings/report/travel"
                  )}
                />
              </List>
            </Collapse>

            <MenuItem
              title={t("settingsUser")}
              link={`/settings/user/${userId}`}
              icon={<PersonIcon />}
              selected={location.pathname === `/settings/user/${userId}`}
            />
            <MenuItem
              title={t("deviceTitle")}
              link="/settings/devices"
              icon={<SmartphoneIcon />}
              selected={location.pathname.startsWith("/settings/device")}
            />
            <MenuItem
              title={t("sharedGeofences")}
              link="/geofences"
              icon={<CreateIcon />}
              selected={location.pathname.startsWith("/settings/geofence")}
            />
            {!features.disableGroups && (
              <MenuItem
                title={t("settingsGroups")}
                link="/settings/groups"
                icon={<FolderIcon />}
                selected={location.pathname.startsWith("/settings/group")}
              />
            )}

            {!features.disableCalendars && (
              <MenuItem
                title={t("sharedCalendars")}
                link="/settings/calendars"
                icon={<TodayIcon />}
                selected={location.pathname.startsWith("/settings/calendar")}
              />
            )}
            {!features.disableComputedAttributes && (
              <MenuItem
                title={t("sharedComputedAttributes")}
                link="/settings/attributes"
                icon={<StorageIcon />}
                selected={location.pathname.startsWith("/settings/attribute")}
              />
            )}
            {!features.disableMaintenance && (
              <MenuItem
                title={"Report"}
                link="/settings/maintenances"
                icon={<AssessmentIcon />}
                selected={location.pathname.startsWith("/settings/maintenance")}
              />
            )}
            {!features.disableSavedCommands && (
              <MenuItem
                title={t("sharedSavedCommands")}
                link="/settings/commands"
                icon={<PublishIcon />}
                selected={location.pathname.startsWith("/settings/command")}
              />
            )}
            {!features.disableGroups && (
              <MenuItem
                title={"Notification"}
                link="/settings/notificaitons"
                icon={<AssessmentIcon />}
                selected={location.pathname.startsWith(
                  "/settings/notifications"
                )}
              />
            )}
            {supportLink && (
              <MenuItem
                title={t("settingsSupport")}
                link={supportLink}
                icon={<HelpIcon />}
              />
            )}
          </>
        )}
      </List>
      {manager && (
        <>
          <Divider />
          <List>
            {admin && (
              <>
                <MenuItem
                  title={t("serverAnnouncement")}
                  link="/settings/announcement"
                  icon={<CampaignIcon />}
                  selected={location.pathname === "/settings/announcement"}
                />
                <MenuItem
                  title={t("settingsServer")}
                  link="/settings/server"
                  icon={<StorageIcon />}
                  selected={location.pathname === "/settings/server"}
                />
              </>
            )}
            <MenuItem
              title={t("settingsUsers")}
              link="/settings/users"
              icon={<PeopleIcon />}
              selected={
                location.pathname.startsWith("/settings/user") &&
                location.pathname !== `/settings/user/${userId}`
              }
            />
          </List>
        </>
      )}
    </>
  );
};

export default SettingsMenu;
