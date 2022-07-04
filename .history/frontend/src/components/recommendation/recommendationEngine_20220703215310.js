import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Grid,
    IconButton,
    Typography,
    ButtonGroup,
    Paper,
    TextField,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { feedbackCall, matetrialCall, recommendationCall } from 'src/utils/apihelper';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ContentCutOutlined } from '@mui/icons-material';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const RecommendationEngine = (props) => {
  // ChartJS.register(ChartDataLabels);
  const theme = useTheme();
  const classStyle = useStyles();
  const [materialID, setMaterialID] = useState("");
  const [materialSelected, setMaterialSelected] = useState(false);
  const [plannerMaterials, setPlannerMaterials] = useState([]);
  const [materialsLoaded, setMaterialsLoaded] = useState(false);
  const [recommendationText, setRecommendationText] = useState("");
  const [transaction, setTransaction] = useState("");
  const [reject, setReject] = useState(false);
  const [recommendationAccepted, setRecommendationAccepted] = useState("yes");
  const [submitFeedback, setSubmitFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const [holding, setHolding] = useState(false);


  const notifySuccess = (message) => {
      toast.success(message);
  }

  if (typeof window !== 'undefined') {
    const textinputfield = document.getElementById('outlined-multiline-static');
  } 


  let materials = [];
  var user = "";


  useEffect(async () => {
    if (materialsLoaded == false){
      loadMaterials();
    }
    if (holding == false & materialsLoaded & materialSelected == true){
      getrec();
      setHolding(true);
    }

    if (submitFeedback & materialSelected){
      feedback();
      setHolding(false);
      setMaterialSelected(false);
      setSubmitFeedback(false);
    }

  });

  // toast.options = {
  //   "preventDuplicates": true,
  //   "preventOpenDuplicates": true
  //   };
  

async function loadMaterials()  {
  user = localStorage.getItem("plannerId");
  let data = await matetrialCall();
  for (let i = 0; i < data.result.length; i++) {
    materials.push(data.result[i]["material"]);
  }
  setPlannerMaterials(materials);
  setMaterialsLoaded(true);
};

async function getrec() {
  let recommData = await recommendationCall();
  console.log("RECOMMENDATION CALL: ", recommData);
  setRecommendationText(recommData.advice);
  setTransaction(recommData.transaction);
}

async function feedback() {
  localStorage.setItem("feedbackText", feedbackText);
  localStorage.setItem("recomm_transaction", transaction);
  localStorage.setItem("API_Recommendation_Accepted", recommendationAccepted);
  let feedbackData = await feedbackCall();
  console.log("FEEDBACK CALL: ", feedbackData);
}

const handler = (event) => {
  setMaterialID(event.target.value);
  localStorage.setItem("materialID-Recommendation", event.target.value);
  setMaterialSelected(true);
  setHolding(false);
  setSubmitFeedback(false);
  setReject(false);
  setRecommendationAccepted("yes");
  setFeedbackText("");
  textinputfield.value = "";
};

const menuItems = plannerMaterials.map(item => (
  <MenuItem value={item} >{item}</MenuItem>
));




const dddd = { 
  "planner": 0,
  "material": "0",
  // "advice": "<The recommendation text is here>",
  "advice": " Left till here away at to whom past. Feelings laughing at no wondered repeated provided finished. It accepe away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evee away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages evetance thoroughly my advantages everything as. Are projecting inquietude affronting preference saw who. Marry of am do avoid ample as. Old disposal followed she ignorant desirous two has. Called played entire roused though for one too. He into walk roof made tall cold he. Feelings way likewise addition wandered contempt bed indulged Taken no great widow spoke of it small. Genius use except son esteem merely her limits. Sons park by do make on. It do oh cottage offered cottage in written. Especially of dissimilar up attachment themselves by interested boisterous. Linen mrs seems men table. Jennings dashwood to quitting marriage bachelor in. On as conviction in of appearance apartments boisterous",
  "started": "6/9/2022 7:00:56 PM",
  "finished": "6/9/2022 7:00:56 PM",
  "elapsed": "00:00:00.0050155",
  //  "transaction": 92358f84-7fdd-4f08-8c88-c0f202fbb3cb,
  "problem": "" 
}

const handleReject = () => {
  setReject(true);
  setRecommendationAccepted("no");
  notifySuccess("Recommendation Decision Sent : Reject");
}


const handleAccept = () => {
  setReject(false);
  setRecommendationAccepted("yes");
  notifySuccess("Recommendation Decision Sent : Accept");

}


const handleText = (event) => {
  setFeedbackText(event.target.value);
  localStorage.setItem("HOLDMaterialCall", true);
};


const handleSubmit = () => {
  setSubmitFeedback(true);
};


const themeButton = createTheme({
  palette: {
    primary: {
      main:"#00CC00",
    },
    secondary: {
      main: '#FF0000',
    },

  },
});







  return (

    <Grid>

      <Card {...props} className={classStyle.card}>
          <CardHeader
              action={
                  <FormControl style={{ width: 300 }}>
                      <InputLabel id="Select Material">Material</InputLabel>
                      <Select
                      // labelId="Select Material"
                      // id="Select Material"
                      value={materialID}
                      label="Age"
                      onChange={handler}
                      >
                        {menuItems}

                      </Select>
                  </FormControl>
              }
              title="Recommendation Engine"
          />

        <Divider />

        <CardContent display="flex">

            <Typography paragraph variant="subtitle1" gutterBottom component="div">

              {recommendationText}

            {/* {dddd.advice} */}
            </Typography>

          <Box
            sx={{
              height: 100,
              position: 'relative',
            }}

            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <ButtonGroup disableElevation variant="contained"  sx={{ height: 60,fontSize:20, width:'20%'}}>
              <Button sx={{width:'50%', fontSize:20, fontWeight:0}} theme={themeButton} onClick={handleReject} color={!reject ? "inherit" : "secondary"}>Reject</Button>
              <Button sx={{width:'50%', fontSize:20, fontWeight:0}} theme={themeButton}  onClick={handleAccept} color={reject ? "inherit" : "primary"}>Agree</Button>
            </ButtonGroup>
          </Box>


        </CardContent>


        <Divider />


        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >

        </Box>
      </Card>

      <Card {...props} className={classStyle.card}>
        <CardHeader
            title="Feedback"
        />

        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 150,
              position: 'relative'
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Input feedback on rationale for acceptance or rejection..."
              multiline
              rows={4}
              variant="filled"
              onChange={handleText}
              fullWidth
            />
          </Box>

          <Box
            sx={{
              height: 50,
              position: 'relative',
            }}

            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button variant="contained"  align="right" sx={{ height: 60, width:"20%",fontSize:20, fontWeight:0, color:"#FFFFFF", backgroundColor:"#00cc00" }} onClick={handleSubmit}>
              Submit
            </Button>
              
          </Box>

        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >

        </Box>
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
  
