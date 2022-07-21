import { useEffect, useState, useRef } from 'react';
import React from 'react';

import { Bar } from 'react-chartjs-2';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
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
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { feedbackCall, matetrialCall, recommendationCall } from 'src/utils/apihelper';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ContentCutOutlined } from '@mui/icons-material';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';

import  DesktopDatePicker  from '@mui/x-date-pickers/DesktopDatePicker';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';

import { engineAnalysisCall } from 'src/utils/apihelper';
import PerfectScrollbar from "react-perfect-scrollbar";


import { exceptionViewer } from "../../../Exception-Viewer-Widget-Datasheet";

export const Analysis = (props) => {



    const [matrixData, setMatrixData] = useState(exceptionViewer);

    const [TotalMatrixData, setTotalMatrixData] = useState([]);

    

    const classStyle = useStyles();

    const [loading, setLoading] = useState(false);
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


    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const formatYmd = (date) => date.toISOString().slice(0, 10);

    const [dateLoaded, setDateLoaded] = useState(false);

     

    useEffect(async () => {
        if (dateLoaded == true){
          loadChartData();
        }

    });

    async function loadChartData() {
        setLoading(true);
        localStorage.setItem("Start-Date", formatYmd(startDate));
        localStorage.setItem("End-Date", formatYmd(endDate));
        console.log("!!!");
        let data = await engineAnalysisCall();
        TotalMatrixData(data);
        console.log("DATA", data);
        setLoading(false);


        
    }




    return (

        <Card {...props} className={classStyle.card}>
            <CardHeader
              action={
                  <FormControl style={{ width: 300 }}>                

                      {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        //options={plannerMaterials}
                       //value={materialID}
                        sx={{ width: 300 }}
                        //onChange={handler}
                        renderInput={(params) => <TextField {...params} label="Select Material" />}
                      /> */}

                    <DesktopDatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                    minDate={new Date('2017-01-01')}
                    renderInput={(params) => <TextField {...params} />}
                    />

                    <Typography padding="5%">
                        {/* To */}

                    </Typography>

                    <DesktopDatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                        setDateLoaded(true);

                    }}
                    minDate={new Date('2017-01-01')}
                    renderInput={(params) => <TextField {...params} />}
                    />


                    {/* <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        localeText={{ start: 'Check-in', end: 'Check-out' }}
                        >
                        <DateRangePicker
                           value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                            )}
                        />
                    </LocalizationProvider> */}




                  </FormControl>
              }
              title="Recommendation Feedback Analysis"
            />

            {/* <Divider /> */}

            <CardContent display="flex">

            {loading ? <LinearProgress /> : 

                <Divider />
            }

            </CardContent>



            <PerfectScrollbar>
                <Box sx={{ height: "600px", overflow: "scroll" }}>
                <Table stickyHeader={true}>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>PLANNER_ID</StyledTableCell>
                        <StyledTableCell>Material</StyledTableCell>
                        <StyledTableCell>Advice</StyledTableCell>
                        <StyledTableCell>Accepted</StyledTableCell>
                        <StyledTableCell>Reason</StyledTableCell>
                        <StyledTableCell>Elasped</StyledTableCell>
                        <StyledTableCell>Started</StyledTableCell>
                        <StyledTableCell>Finished</StyledTableCell>
                        <StyledTableCell>Transaction</StyledTableCell>
                        <StyledTableCell>Problem</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {matrixData.map((order) => ( */}
                    {TotalMatrixData.map((order) => (


                        // <TableRow
                        //     onClick={() => setSelectedRow(row)}
                        //     key={row.name}
                        //     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        // >

                        <StyledTableRow
                        hover
                        // key={order.MaterialID}
                        key={order.requests["planner"]}
                        >
                            <StyledTableCell>
                                {order.requests[0]["planner"]}
                            </StyledTableCell>

                            <StyledTableCell>
                                {order.requests[0]["material"]}
                            </StyledTableCell>
                            <StyledTableCell>
                                {order.requests[0]["advice"]}
                            </StyledTableCell>

                            <StyledTableCell style={{ textAlign: "center" }}>
                                {order.requests[0]["planner"]}
                            </StyledTableCell>

                            <StyledTableCell >
                                {order.requests[0]["accepted"]}
                            </StyledTableCell>                           
                            
                            <StyledTableCell >
                                {order.requests[0]["reason"]}
                            </StyledTableCell>

                            <StyledTableCell >
                                {order.requests[0]["elapsed"]}
                            </StyledTableCell>

                            <StyledTableCell >
                                {order.requests[0]["started"]}
                            </StyledTableCell>


                            <StyledTableCell >
                                {order.requests[0]["finished"]}
                            </StyledTableCell>


                            <StyledTableCell >
                                {order.requests[0]["transaction"]}
                            </StyledTableCell>


                            <StyledTableCell >
                                {order.requests[0]["problem"]}
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>
            </PerfectScrollbar>


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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      //  backgroundColor: theme.palette.common.black, // Change to hex code
      backgroundColor: "#3a86ff", // Change to hex code
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));