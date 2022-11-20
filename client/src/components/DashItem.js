import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Input, Typography, Box, FormControl } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({});

let subject1;
let subject2;
let subject3;
let uid = localStorage.getItem('userid');

const DashItem = ({selectedSemester}) => {
const classes = useStyles();
const navigate = useNavigate();

async function SubmitPref(e){
    e.preventDefault();
    
    console.log(uid);
    const newStudent = {
      "userid": uid,
      "subject1": subject1,
      "subject2": subject2,
      "subject3": subject3,
      "oe":false,
      "pe":true,
      "electiveNumber":1
    };

    let body = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    }).then(response => {
      Promise.resolve(response);
      if (response.status==200)
        window.alert("Alloted!");
      return response;
    });
    let data=await body.json();
    Promise.resolve(data);
    console.log(data.selected);
    localStorage.setItem('selected', data.selected);
    navigate('/allotment');
  }

  return (
    <Box
      bgcolor="background.paper"
      p={1}
      style={{
        width: "50%",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          style={{ textAlign: "center", fontWeight: 700, marginBottom: 20 }}
          variant="h2"
          component="h2"
        >
         {selectedSemester.name}
        </Typography>
        <Typography
          style={{ color: "lightred", textAlign: "center" }}
          variant="body1"
          component="body1"
        >
          {/* Window Closing at : 07-07-2022 11:00 AM */}
        </Typography>
        {selectedSemester.pe<1 && selectedSemester.spe==6 && (
       <Typography
       style={{
         textAlign: "center",
         fontWeight: 600,
         marginBottom: 20,
         marginTop: 20,
       }}
       variant="h4"
       component="h4"
     >
       Open Elective 
     </Typography>
    
   )}
   {selectedSemester.pe>0 &&  (
       
       <Typography
       style={{
         textAlign: "center",
         fontWeight: 600,
         marginBottom: 20,
         marginTop: 20,
       }}
       variant="h4"
       component="h4"
     >
       Professional Elective
     </Typography>
    
   )}
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl
            style={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                fontWeight: 600,
                marginBottom: 20,
                marginTop: 20,
              }}
              variant="h6"
              component="h6"
            >
              Priority 1
            </Typography>
            <Input
              onChange={(event) => {
                subject1 = event.target.value;
              }}
              style={{ width: "70%" }}
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <FormControl
            style={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                fontWeight: 600,
                marginBottom: 20,
                marginTop: 20,
              }}
              variant="h6"
              component="h6"
            >
              Priority 2
            </Typography>
            <Input
              onChange={(event) => {
              // console.log(event.target.value);
                subject2 = event.target.value;
              }}
              style={{ width: "70%" }}
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <FormControl
            style={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                fontWeight: 600,
                marginBottom: 20,
                marginTop: 20,
              }}
              variant="h6"
              component="h6"
            >
              Priority 3
            </Typography>
            <Input
              onChange={(event) => {
                subject3 = event.target.value;
              }}
              style={{ width: "70%" }}
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Button
              onClick={SubmitPref}
              style={{
                marginTop: 8,
                marginBottom: 8,
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="contained"
              color="primary"
            >
              <Save />
              <Typography
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  marginLeft: 5,
                }}
                variant="body1"
                component="body1"
              >
                Submit
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashItem;