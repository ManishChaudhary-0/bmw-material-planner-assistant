import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  InputLabel,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { setDate } from "date-fns";
import axios from "axios";
import { ExceptionManagerCall } from "src/utils/apihelper";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { rankCall } from "src/utils/apihelper";

import { plannerId } from "src/utils/constants";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Markov } from "./markov";


import { makeStyles } from "@mui/styles";

import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';

import { matetrialCall } from "src/utils/apihelper";

export const LongRunAndMarkov = (props) => {
 // ChartJS.register(ChartDataLabels);
  const theme = useTheme();

  const [resultBool, setResultBool] = useState(false);
  const [alwaysTrue, setAlwaysTrue] = useState(true);
  const [materialID, setMaterialID] = useState("");
  const [materialSelected, setMaterialSelected] = useState(false);
  const [materialsLoaded, setMaterialsLoaded] = useState(false);

  

  // const [is114, setIs114] = useState(false);
  // const [is177, setIs177] = useState(false);
  // const [is594, setIs594] = useState(false);
  // const [isM11, setIsM11] = useState(false);

  const [earlyPercentage, setEarlyPercentage] = useState();
  const [onTimePercentage, setOnTimePercentage] = useState();
  const [latePercentage, setLatePercentage] = useState();

  const [negThree, setNegThree] = useState();
  const [negTwo, setNegTwo] = useState();
  const [negOne, setNegOne] = useState();
  const [zero, setZero] = useState();
  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();

  const [longRunString, setLongRunString] = useState("");
  const [markovString, setMarkovString] = useState("");


  const [loading2, setLoading2] = useState(false);




  const classStyle = useStyles();

  const [plannerMaterials, setPlannerMaterials] = useState([]);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  var user = "";
  let materials = [];


  useEffect(async () => {
    if (materialsLoaded == false){

      user = localStorage.getItem("plannerId");

      let data2 = await matetrialCall();
    
      for (let i = 0; i < data2.result.length; i++) {
        materials.push(data2.result[i]["material_9"]);
      }
      setPlannerMaterials(materials);
      setMaterialsLoaded(true);
    }

    // user = localStorage.getItem("plannerId");

    // if (resultBool == false && materialSelected == true) {

    //   loadMaterials();
    //   setLoading2(false);

    // }



  });


  useEffect(async () => {
    user = localStorage.getItem("plannerId");

    if (resultBool == false && materialSelected == true) {
      loadMaterials();
    }
  });

  async function loadMaterials()  {

    //setLoading2(true);

    localStorage.setItem("materialID", materialID);


    let data = await rankCall();


    console.log("DATA LONG-RUN: ", data);
    console.log("DATA LONG-RUN1: ", data["long run"][0].early);
    console.log("DATA LONG-RUN2: ", data["long run"][1]["on time"]);
    console.log("DATA LONG-RUN3: ", data["long run"][2].late);

    setEarlyPercentage(parseFloat(data["long run"][0].early));
    setOnTimePercentage(parseFloat(data["long run"][1]["on time"]));
    setLatePercentage(parseFloat(data["long run"][2].late));

    setNegThree(parseFloat(data.markov[0]["-3"]));
    setNegTwo(parseFloat(data.markov[1]["-2"]));
    setNegOne(parseFloat(data.markov[2]["-1"]));
    setZero(parseFloat(data.markov[3]["0"]));
    setOne(parseFloat(data.markov[4]["1"]));
    setTwo(parseFloat(data.markov[5]["2"]));
    setThree(parseFloat(data.markov[6]["3"]));


    console.log("DATA Markov -3: ", data.markov[0]["-3"]);
    console.log("DATA Markov -2: ", data.markov[1]["-2"]);
    console.log("DATA Markov -1: ", data.markov[2]["-1"]);
    console.log("DATA Markov 0: ", data.markov[3]["0"]);
    console.log("DATA Markov 1: ", data.markov[4]["1"]);
    console.log("DATA Markov 2: ", data.markov[5]["2"]);
    console.log("DATA Markov 3: ", data.markov[6]["3"]);

    console.log("Long Run String ", data["long run string"]);
    console.log("Markov String ", data["markov string"]);

    setLongRunString(data["long run string"]);
    setMarkovString(data["markov string"]);





  }

  let e = earlyPercentage * 100;
  let ot = onTimePercentage * 100;
  let l = latePercentage * 100;

  let negThreeValue = negThree * 100;
  let negTwoValue = negTwo * 100;
  let negOneValue = negOne * 100;
  let zeroValue = zero * 100;
  let oneValue = one * 100;
  let twoValue = two * 100;
  let threeValue = three * 100;

  let dataLongRun = {
    datasets: [
      {
        label: "Early",
        data: [e],
        stack: "",
      //  backgroundColor: "#FFFF00",
      backgroundColor: "#fafa6e",

      },
      {
        label: "On TIme",
        data: [ot],
        stack: "",
        // backgroundColor: "#00FF00",
        backgroundColor: "#08dc4d",

      },
      {
        label: "Late",
        data: [l],
        stack: "",
        // backgroundColor: "#FF0000",
        backgroundColor: "#d70d13",

      },
    ],
    labels: ["Arrival Probabilities"],
  };

  const optionsLongRun = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: "y",
    plugins: {
      tooltip: true,
      legend: {
        display: true,
        position: "bottom",
        align: "center",
      },
      datalabels: {
        formatter: function (value, context) {
          return value.toString().slice(0, 5);
        },

        color: "black",
        align: 50,
        anchor: "start",
        offset: 5,

        clip: true,
        font: {
          size: "18",
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "black", beginAtZero: true },
      },

      x: {
        max:100,
        min:0,
        ticks: { color: "black", beginAtZero: true },
        title: { display: true, text: "Percantages", color: "black" },
      },
      xAxes: [
        {
          stacked: true,
          max:100
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
       color:"black"
   
  };

  let dataMarkov = {
    datasets: [
      {
        label: "-3",
        data: [negThreeValue],
        stack: "",
        // backgroundColor: "#FFC100",
        backgroundColor: "#ffca2a",

      },
      {
        label: "-2",
        data: [negTwoValue],
        stack: "",
        // backgroundColor: "#FED862",
        backgroundColor: "#ffd659",

      },
      {
        label: "-1",
        data: [negOneValue],
        stack: "",
        // backgroundColor: "#FCE290",
        backgroundColor: "#ffe288",

      },

      {
        label: "0",
        data: [zeroValue],
        stack: "",
        // backgroundColor: "#00FF00",
        backgroundColor: "#08dc4d",

      },
      {
        label: "1",
        data: [oneValue],
        stack: "",
        // backgroundColor: "#FAA2A2",
        backgroundColor: "#f77a7d",

      },
      {
        label: "2",
        data: [twoValue],
        stack: "",
        // backgroundColor: "#FC6A6A",
        backgroundColor: "#f3373d",

      },
      {
        label: "3",
        data: [threeValue],
        stack: "",
        //backgroundColor: "#FF0000",
        backgroundColor: "#d70d13",

      },
    ],
    labels: ["Arrival Probabilities"],
  };

  const optionsMarkov = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: "y",
    plugins: {
      tooltip: true,
      legend: {
        display: true,
        position: "bottom",
        align: "center",
      },
      datalabels: {
        formatter: function (value, context) {
          return value.toString().slice(0, 5);
        },
        display:"auto",
        color: "black",
        align: 0,
        anchor: "start",
        offset: 5,
        // padding:"",
        clip: true,
        font: {
          size: "18",
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "black", beginAtZero: true },
      },

      x: {
        max:100,
        min:0,
        ticks: { color: "black", beginAtZero: true},
        title: { display: true, text: "Percantages", color: "black" },
      },
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },

  };

  const menuItems = plannerMaterials.map(item => (
    <MenuItem value={item.toString()} >{item}</MenuItem>
  ));

  const handler = (event, value) => {
    setMaterialID(value);
    localStorage.setItem("materialID", value);
    setMaterialSelected(true);
    localStorage.setItem("queueMarkov", true);
    localStorage.setItem("MAT", value);
  };

  // const handleChange = (event) =>
  //   setMaterialID("741788607") && setMaterialSelected(true) && console.log("MTTT:", materialID);



  return (
    <Grid >

    <Card {...props} className={classStyle.card}>

    <CardHeader
          action={
            <FormControl style={{ width: 300 }}>
                {/* <InputLabel id="Select Material">Material</InputLabel>
                <Select
                value={materialID}
                label="Age"
                onChange={handler}
                >
                  {menuItems}

                </Select> */}

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={plannerMaterials}
                  value={materialID}
                  sx={{ width: 300 }}
                  onChange={handler}
                  renderInput={(params) => <TextField {...params} label="Select Material" />}
                />
            </FormControl>
          }
          title="Long Run"
        />


      {loading2 ? <LinearProgress /> : <Divider />}

      <CardContent>
        <Box
          sx={{
            height: 350,
            position: "relative",
          }}
        >
          <Bar
            style={{ backgroundColor: "#BDCFFF" , borderRadius:20}}
            data={dataLongRun}
            options={optionsLongRun}
            //plugins={[ChartDataLabels]}
          />
        </Box>


        <Typography paddingTop="5%" style={{fontSize:18, alignContent:'center'}}>
          {longRunString}
        </Typography>


      </CardContent>
      <Divider />
      {/* <CardContent>
        <Box
          sx={{
            height: 350,
            position: 'relative'
          }}
        >
          <Bar style={{backgroundColor: "#ccc"}}
            data={dataMarkov}
            options={optionsMarkov}
            //plugins={[ChartDataLabels]}
            
          />
        </Box>
      </CardContent> */}
{/* 
      <Card {...props} className={classStyle.card}>
        <CardHeader
          // action={(
          //   <Button
          //     // endIcon={<ArrowDropDownIcon fontSize="small" />}
          //     size="small"
          //   >
          //     <select>

          //       <option value="" key="">last 45 days</option>

          //     </select>
          //   </Button>
          // )}
          title="Markov"
        /> */}
        {/* <Divider />
        <CardContent>
          <Box
            sx={{
              height: 350,
              position: "relative",
            }}
          >
            <Bar
              style={{ backgroundColor: "#ccc" }}
              data={dataMarkov}
              options={optionsMarkov}
              //plugins={[ChartDataLabels]}
            />
          </Box> */}
        {/* </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        > */}
          {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button> */}
        {/* </Box>
      </Card> */}

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      ></Box> */}
    </Card>

      <Card {...props} className={classStyle.card}>
        <CardHeader
          // action={(
          //   <Button
          //     // endIcon={<ArrowDropDownIcon fontSize="small" />}
          //     size="small"
          //   >
          //     <select>

          //       <option value="" key="">last 45 days</option>

          //     </select>
          //   </Button>
          // )}
          title="Markov"
          font="h6"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 350,
              position: "relative",
            }}
          >
            <Bar
              style={{ backgroundColor: "#BDCFFF" , borderRadius:10 }}
              data={dataMarkov}
              options={optionsMarkov}
              //plugins={[ChartDataLabels]}
            />
          </Box>
        </CardContent>
        <Divider />
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        > */}
          {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button> */}
        {/* </Box> */}
      </Card>
      </Grid>

  );
};

const useStyles = makeStyles({
  card: {
    border: "2px solid",
    borderColor: "#3a86ff",
    boxShadow: "0 19px 38px rgba(1,0.75,1,0.75), 0 15px 12px rgba(0,0,0,0.22)",
   // boxShadow: "9px 18px #3a86ff",   // AABDFF   ---   F1EFFE --- 6F6F6F --- 0166B1
    // borderColor: '#C4C4C4',
    marginTop: 0,
    marginBottom:100
  }
});
