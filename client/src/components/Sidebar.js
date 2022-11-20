import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { Lock, ExitToApp } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  text: {
    color: "white",
  },
  textRight: {
    color: "black",
    textAlign: "left",
    fontWeight: 600,
  },
});

const Sidebar = ({
  list,
  changeSemesterOnSidebar,
  sidebarState,
  setIsProfileSelected,
  isProfileSelected,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Box style={{ margin: 10, height: "90vh" }}>
      <Typography
        style={{ textAlign: "center" }}
        className={classes.text}
        variant="h3"
        component="h3"
      >
        EAS
      </Typography>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          //   alignItems: "space-between",
          height: "100%",
        }}
      >
        <Box>
          {list.map((data, i) => (
            <Box
              style={{
                height: 50,
                background: sidebarState === i ? "#6366F1" : "transparent",
                color: "white",
                margin: 5,
                marginTop: 10,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 10,
                cursor: "pointer",
              }}
              onClick={() => changeSemesterOnSidebar(i)}
            >
              <Typography className={classes.text} variant="h6" component="h6">
                {data.name}
              </Typography>
              {data.isLocked && <Lock />}
            </Box>
          ))}
        </Box>
        {/* profile */}
        <Box>
          <Box
            style={{
              height: 50,
              background: isProfileSelected ? "#6366F1" : "transparent",
              color: "white",
              margin: 5,
              marginTop: 10,
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <Typography
              onClick={() => setIsProfileSelected((c) => !c)}
              className={classes.text}
              variant="h6"
              component="h6"
            >
              John doe
            </Typography>
            {<ExitToApp onClick={() => navigate("/login")} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;