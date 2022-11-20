import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Input, Typography, Box, FormControl } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({});

let subject1;
let subject2;
let subject3;
let selsem;
const WaiverItem = ({selectedSemester}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box
      bgcolor="background.paper"
      p={1}
      style={{
        width: "75%",
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
          Window Closing at : 07-07-2022 11:00 AM
        </Typography>
        { (
   
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
       Select Courses
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
              For PE-5 
            </Typography>
            <Input
              onChange={(event) => {
                subject1 = event.target.value;
              }}
              style={{ width: "60%" }}
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          
          <div id="oe">
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
              For OE-2
            </Typography>
            <Input
              onChange={(event) => {
                subject2 = event.target.value;
              }}
              style={{ width: "60%" }}
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          </div>

          <div id="vac">
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
              Value Added Course - 1
            </Typography>
            <Input
              onChange={(event) => {
                subject1 = event.target.value;
              }}
              style={{ width: "60%" }}
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
              Value Added Course - 2
            </Typography>
            <Input
              onChange={(event) => {
                subject2 = event.target.value;
              }}
              style={{ width: "60%" }}
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
              Value Added Course - 3
            </Typography>
            <Input
              onChange={(event) => {
                subject3 = event.target.value;
              }}
              style={{ width: "60%" }}
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          </div>

          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Button
              style={{
                marginTop: 8,
                marginBottom: 8,
                width: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="contained"
              color="primary"
            >
              <Typography
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  marginLeft: 5,
                }}
                variant="body1"
                component="body1"
              >
                Skip
              </Typography>
            </Button>
            <Button    
              style={{
                marginTop: 8,
                marginBottom: 8,
                width: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="contained"
              color="primary"
            >
              
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

export default WaiverItem;