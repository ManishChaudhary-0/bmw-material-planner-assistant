import React from 'react';
import TableHeader from './TableHeader';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    Tooltip,
    TableHead,
    TableRow,
    TableSortLabel,
    Slider,
    TableContainer,
  } from "@mui/material";


import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';

import PerfectScrollbar from "react-perfect-scrollbar";




export default function TableContent() {

    const classStyle = useStyles();

    



    return (
        <>
    

            <PerfectScrollbar>
                <Box sx={{ minHeight: "100px", overflow: "scroll" }}>

                    <Table stickyHeader={true}>

                        <TableHeader />


                    </Table>
                </Box>
            </PerfectScrollbar>

        </>
    )
}



const useStyles = makeStyles({
    card: {
      border: "2px solid",
      borderColor: "#3a86ff",
      boxShadow: "0 19px 38px rgba(1,0.75,1,0.75), 0 15px 12px rgba(0,0,0,0.22)",
     // boxShadow: "9px 18px #3a86ff",   // AABDFF   ---   F1EFFE --- 6F6F6F --- 0166B1
      // borderColor: '#C4C4C4',
      marginTop:25,
      marginBottom:35
    }
  });
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
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