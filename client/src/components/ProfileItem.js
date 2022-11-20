import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  Input,
  FormLabel,
  Typography,
  Box,
  FormControl,
} from "@material-ui/core";
import Avatar from "react-avatar";
const useStyles = makeStyles({});

const ProfileItem = ({ selectedSemester }) => {
  const classes = useStyles();

  return (
    <Box
      bgcolor="background.paper"
      p={1}
      style={{
        width: "50%",
      }}
    >
      <Box style={{
          display:"flex",
          flexDirection: "column",
          justifyContent:"center",
          alignItems:"center"
      }}>
        <Avatar name="John Doe" round="50%" />
        <Typography style={{
            fontWeight:"700",
            marginTop:10
        }} variant="h4" component="h4">
          John Doe
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <FormControl style={{ marginTop: 8, marginBottom: 8, width: "100%" }}>
          <FormLabel htmlFor="my-input">Name</FormLabel>
          <Input
            style={{ width: "100%" }}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl style={{ marginTop: 8, marginBottom: 8, width: "100%" }}>
          <FormLabel htmlFor="my-input">Email</FormLabel>
          <Input
            style={{ width: "100%" }}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl style={{ marginTop: 8, marginBottom: 8, width: "100%" }}>
          <FormLabel htmlFor="my-input">Current Semester</FormLabel>
          <Input
            style={{ width: "100%" }}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl style={{ marginTop: 8, marginBottom: 8, width: "100%" }}>
          <FormLabel htmlFor="my-input">Department</FormLabel>
          <Input
            style={{ width: "100%" }}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl style={{ marginTop: 8, marginBottom: 8, width: "100%" }}>
          <FormLabel htmlFor="my-input">Registration Number</FormLabel>
          <Input
            style={{ width: "100%" }}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>

        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Button
            style={{ marginTop: 8, marginBottom: 8, width: "30%" }}
            variant="contained"
            color="primary"
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileItem;