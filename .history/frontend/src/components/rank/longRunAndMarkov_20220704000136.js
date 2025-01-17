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

  });

  useEffect(async () => {
    user = localStorage.getItem("plannerId");

    if (resultBool == false && materialSelected == true) {
      localStorage.setItem("materialID", materialID);
      let data = await rankCall();
      // data = data.data;

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

    }
  });

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
        backgroundColor: "#FFFF00",
      },
      {
        label: "On TIme",
        data: [ot],
        stack: "",
        backgroundColor: "#00FF00",
      },
      {
        label: "Late",
        data: [l],
        stack: "",
        backgroundColor: "#FF0000",
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
        backgroundColor: "#FFC100",
      },
      {
        label: "-2",
        data: [negTwoValue],
        stack: "",
        backgroundColor: "#FED862",
      },
      {
        label: "-1",
        data: [negOneValue],
        stack: "",
        backgroundColor: "#FCE290",
      },

      {
        label: "0",
        data: [zeroValue],
        stack: "",
        backgroundColor: "#00FF00",
      },
      {
        label: "1",
        data: [oneValue],
        stack: "",
        backgroundColor: "#FAA2A2",
      },
      {
        label: "2",
        data: [twoValue],
        stack: "",
        backgroundColor: "#FC6A6A",
      },
      {
        label: "3",
        data: [threeValue],
        stack: "",
        backgroundColor: "#FF0000",
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

  const handler = (event) => {
    setMaterialID(event.target.value);
    localStorage.setItem("materialID", event.target.value);
    setMaterialSelected(true);
    localStorage.setItem("queueMarkov", true);
    localStorage.setItem("MAT", event.target.value);
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

{/* 
      {is114 ? (
        <CardHeader
          action={
            <FormControl style={{ width: 300 }}>
              <InputLabel id="Select Material">Material</InputLabel>
              <Select
                value={materialID}
                label="Age"
                onChange={handler}

              >
                <MenuItem value={"741788607"}>741788607</MenuItem>
                <MenuItem value={"743093505"}>743093505</MenuItem>
                <MenuItem value={"809198305"}>809198305</MenuItem>
                <MenuItem value={"742065710"}>742065710</MenuItem>
                <MenuItem value={"807165907"}>807165907</MenuItem>
              </Select>
            </FormControl>
          }
          title="Long Run"
        />
      ) : is177 ? (
        <CardHeader
          action={
            <FormControl style={{ width: 500 }}>
              <InputLabel id="Select Material">Material</InputLabel>
              <Select
                value={materialID}
                label="Age"
                onChange={handler}
              >
                <MenuItem value={"747096504"}>747096504</MenuItem>
                <MenuItem value={"807517908"}>807517908</MenuItem>
                <MenuItem value={"874696710"}>874696710</MenuItem>
                <MenuItem value={"807517710"}>807517710</MenuItem>
                <MenuItem value={"809747903"}>809747903</MenuItem>

              </Select>
            </FormControl>
          }
          title="Long Run"
        />
      ) : is594 ? (
        <CardHeader
          action={
            <FormControl style={{ width: 500 }}>
              <InputLabel id="Select Material">Material</InputLabel>
              <Select

                value={materialID}
                label="Age"
                onChange={handler}
              >
                <MenuItem value={"5A11EC102"}>5A11EC102</MenuItem>
                <MenuItem value={"5A11EC403"}>5A11EC403</MenuItem>
                <MenuItem value={"945127407"}>945127407</MenuItem>
                <MenuItem value={"5A11EC303"}>5A11EC303</MenuItem>
                <MenuItem value={"5A11ED102"}>5A11ED102</MenuItem>

              </Select>
            </FormControl>
          }
          title="Long Run"
        />
      ) : isM11 ? (
        <CardHeader
          action={
            <FormControl style={{ width: 500 }}>
              <InputLabel id="Select Material">Material</InputLabel>
              <Select

                value={materialID}
                label="Age"
                onChange={handler}
              >
                <MenuItem value={"748948105"}>748948105</MenuItem>
                <MenuItem value={"795148603"}>795148603</MenuItem>
                <MenuItem value={"947015904"}>947015904</MenuItem>
                <MenuItem value={"748948206"}>748948206</MenuItem>
                <MenuItem value={"807765206"}>807765206</MenuItem>
              </Select>
            </FormControl>
          }
          title="Long Run"
        />
      ) : (
        <CardHeader
          action={
            <FormControl style={{ width: 500 }}>
              <InputLabel id="Select Material">Material</InputLabel>
              <Select
                // labelId="Select Material"
                // id="Select Material"
                value={materialID}
                label="Age"
                onChange={handler}
              >
              </Select>
            </FormControl>
          }
          title="Long Run"
        />
      )} */}

      <Divider />
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
