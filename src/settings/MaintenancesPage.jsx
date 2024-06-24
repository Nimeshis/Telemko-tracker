import React from "react";
import PageLayout from "../common/components/PageLayout";
import SettingsMenu from "./components/SettingsMenu";

const containerStyle = {
  backgroundColor: "red",
  height: "300px",
  width: "300px",
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  margin: "auto",
};

const MaintenancesPage = () => {
  return (
    <PageLayout
      menu={<SettingsMenu />}
      breadcrumbs={["settingsTitle", "sharedNotifications"]}
    >
      <div style={containerStyle}></div>
    </PageLayout>
  );
};

export default MaintenancesPage;
