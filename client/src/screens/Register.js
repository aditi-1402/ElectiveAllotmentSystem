import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Input,
  Typography,
  Box,
  FormControl,
  FormLabel,
  InputLabel,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    width: "100%",
    "& .MuiInputBase-input": {
      background: "#E0E7FF",
      height: "2rem",
    },
  },
  left: {
    background: "#4F46E5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  textRight: {
    color: "black",
    textAlign: "left",
    fontWeight: 600,
  },
});

let name;
let email;
let currentSemester;
let department;
let registrationNumber;
let password;

const Register = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  async function onSubmit(e) {
    e.preventDefault();

    const newStudent = {
      name: name,
      email: email,
      currentSemester: currentSemester,
      department: department,
      registerNumber: registrationNumber,
      password: password,
    };

    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    navigate("/login");
  }
  return (
    <Grid container className={classes.container}>
      <Grid className={classes.left} item xs>
        <Box>
          <Typography className={classes.text} variant="h2" component="h2">
            EAS
          </Typography>
          <Typography className={classes.text} variant="h6" component="h6">
            Elective Allotment System
          </Typography>
        </Box>
      </Grid>
      <Grid className={classes.right} item xs>
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "calc(100vh/8)",
          }}
        >
          <Box style={{ width: "100%" }}>
            <Box
              style={{
                width: "100%",
                textAlign: "left",
              }}
            >
              <Typography
                className={classes.textRight}
                variant="h4"
                component="h4"
              >
                Register
              </Typography>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginTop: 20,
              }}
            >
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={(e) => onSubmit(e)}
              >
                <FormControl style={{ marginTop: 8, marginBottom: 8 }}>
                  <FormLabel htmlFor="my-input">Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(event) => {
                      name = event.target.value;
                    }}
                    style={{ width: "80%" }}
                    id="my-input"
                    aria-describedby="my-helper-text"
                    required
                  />
                </FormControl>
                <FormControl style={{ marginTop: 8, marginBottom: 8 }}>
                  <FormLabel htmlFor="my-input">Email</FormLabel>
                  <Input
                    type="email"
                    onChange={(event) => {
                      email = event.target.value;
                    }}
                    style={{ width: "80%" }}
                    id="my-input"
                    aria-describedby="my-helper-text"
                    required
                  />
                </FormControl>
                <FormControl style={{ marginTop: 8, marginBottom: 8 }}>
                  <FormLabel htmlFor="my-input">Current Semester</FormLabel>
                  <Input
                    type="number"
                    pattern="[5-8]"
                    onChange={(event) => {
                      currentSemester = event.target.value;
                    }}
                    style={{ width: "80%" }}
                    id="my-input"
                    aria-describedby="my-helper-text"
                    required
                  />
                </FormControl>
                <FormControl style={{ marginTop: 8, marginBottom: 8 }}>
                  <FormLabel htmlFor="my-input">Department</FormLabel>
                  <Input
                    onChange={(event) => {
                      department = event.target.value;
                    }}
                    style={{ width: "80%" }}
                    id="my-input"
                    aria-describedby="my-helper-text"
                    required
                  />
                </FormControl>
                <FormControl style={{ marginTop: 8, marginBottom: 8 }}>
                  <FormLabel htmlFor="my-input">Registration Number</FormLabel>
                  <Input
                    pattern="[0-9]{9}"
                    onChange={(event) => {
                      registrationNumber = event.target.value;
                    }}
                    style={{ width: "80%" }}
                    id="my-input"
                    aria-describedby="my-helper-text"
                    required
                  />
                </FormControl>
                <FormControl style={{ marginTop: 8, marginBottom: 8 }}>
                  <FormLabel htmlFor="my-input">Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(event) => {
                      password = event.target.value;
                    }}
                    style={{ width: "80%" }}
                    id="my-input"
                    aria-describedby="my-helper-text"
                    required
                  />
                </FormControl>
                <Button
                  type="submit"
                  style={{ marginTop: 8, marginBottom: 8, width: "30%" }}
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;