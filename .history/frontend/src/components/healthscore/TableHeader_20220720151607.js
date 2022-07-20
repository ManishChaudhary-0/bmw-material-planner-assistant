import React from 'react';
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
  } from "@mui/material";

  import { makeStyles } from "@mui/styles";
  import { styled } from '@mui/material/styles';
  import { tableCellClasses } from '@mui/material/TableCell';


  export default function TableHeader(props) {

    const { valueToOrderBy, orderDirection, handleRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    }


    return (
        <TableHead width="100%">
            <TableRow>


                <StyledTableCell key="Material" style={{ textAlign: "left" }}>
                    <TableSortLabel 
                        active={valueToOrderBy === "Material"}
                        direction={valueToOrderBy === "Material" ? orderDirection : 'asc'}
                        onClick={createSortHandler("Material")}
                        >
                            MATERIAL ID
                        </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell key="date" style={{ textAlign: "left" }}>
                    <TableSortLabel 
                        active={valueToOrderBy === "date"}
                        direction={valueToOrderBy === "date" ? orderDirection : 'asc'}
                        onClick={createSortHandler("date")}

                        >
                            Date
                        </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell key="description" style={{ textAlign: "left" }}>
                    <TableSortLabel 
                        active={valueToOrderBy === "description"}
                        direction={valueToOrderBy === "description" ? orderDirection : 'asc'}
                        onClick={createSortHandler("description")}

                        >
                            Material Description Eng
                        </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell key="health" style={{ textAlign: "center" }}>
                    <TableSortLabel 
                        active={valueToOrderBy === "health"}
                        direction={valueToOrderBy === "health" ? orderDirection : 'asc'}
                        onClick={createSortHandler("health")}

                        >
                            Health Status
                        </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell key="button" style={{ textAlign: "left", paddingLeft:"4%" }}>
                    <TableSortLabel 
                        active={valueToOrderBy === "button"}
                        direction={valueToOrderBy === "button" ? orderDirection : 'asc'}
                       // onClick={createSortHandler("button")}

                        >
                            Graphs
                        </TableSortLabel>
                </StyledTableCell>







            </TableRow>
        </TableHead>
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