import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({});

const AllotItem = ({selectedSemester}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  function Logout(e){
    e.preventDefault();
    navigate('/login');
}

  let sel=localStorage.getItem('selected');
  if (sel=="CC")
    sel="Cloud Computing";
  else if (sel=="FDS")
    sel="Foundations of Data Science";
  else if (sel=="LP")
    sel="Logic Programming";
  

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
          
        </Typography>
        { (
   
       <Typography
       style={{
         textAlign: "center",
         fontWeight: 500,
         marginBottom: 20,
         marginTop: 20,
       }}
       variant="h4"
       component="h4"
     >
       {sel}
     </Typography>
    
   )}
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >         
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Button
              onClick={Logout}
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
                Logout
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllotItem;