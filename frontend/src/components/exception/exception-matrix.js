import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Slider
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';

import {healthScore} from '../../../health-score';
import {exceptionViewer} from '../../../Exception-Viewer-Widget-Datasheet';

import { useState } from 'react';
import { useEffect } from 'react';



const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];

function sortByProperty(property){  
  return function(a,b){  
     if(Number(a[property]) < Number(b[property]))  
        return 1;  
     else if(Number(a[property]) > Number(b[property]))  
        return -1;  
 
     return 0;  
  }  
}

export const LatestOrders = (props) => {

  const [healthData,sethealthData]=useState(healthScore.slice(0,healthScore.length-1))
  // let healthData=healthScore;
  const [selectedMaterial,setSelectedMaterial] = useState(healthScore.slice(0,1));
  const [value, setValue] = useState([0, 200]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.setHealthGuage(healthScore[0].healthstatus)
  
  }, [])
  




  const returnColor = (status)=>{

    const yellow ={
    
      color:"black",
      backgroundColor:"yellow",
      padding:"5px 20px",
      borderRadius:"25px 25px"
  
    }
  
    const green ={
      
      color:"white",
      backgroundColor:"green",
      padding:"5px 20px",
      borderRadius:"25px 25px"
  
    }
  
    const maroon ={
      
      color:"white",
      backgroundColor:"maroon",
      padding:"5px 20px",
      borderRadius:"25px 25px"
  
    }

    if (status<20 ) {
      return maroon
    }

    if (status>20  && status <60) {
      return yellow
    }

    if (status >60) {
      return green
    }



  }

  function valuetext(value) {
    return `${Date(value)}`;
  }

  return(
    <>
    <Card {...props} >
    <CardHeader title="Part Lookup" />
    <Box
      sx={{
        display: 'flex',
        marginTop:"-7%",
        paddingBottom:"2%",
        justifyContent: 'flex-end',
      
        // p: 2
      }}
    >
     <Slider
      // color="primary"
       sx={{
        display: 'flex',
        width:"300px",
        justifyContent: 'flex-end',
        marginRight:"5%"
      
        // p: 2
      }}
      value={value}
      aria-valuetext="sdasd"
      onChange={handleChange}
      min={0}
      max={200}
      valueLabelDisplay="off"
      getAriaValueText={valuetext}
     >

     </Slider>
    </Box>
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800,height:"400px" ,overflow:"scroll"}}>
     
        <Table stickyHeader={true} >
          <TableHead>
            <TableRow>
              <TableCell>
                Material ID
              </TableCell>
              <TableCell>
                Date
              </TableCell>
              {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
              <TableCell>
                Supplier Number
              </TableCell>
              <TableCell onClick={()=>{sethealthData(healthScore.sort(sortByProperty("healthstatus")))}}>
                Health Score
              </TableCell>
              <TableCell>
                Material Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {healthData.map((order,index)=>{
              return(
                <TableRow
                hover
                key={Math.random()}
                onClick={()=>{setSelectedMaterial(healthScore.slice(index,index+1))}}
              >
                <TableCell>
                 {order.materialID}
                </TableCell>
                <TableCell>
                  {order.healthscoredate}
                </TableCell>
                <TableCell>
                  {order.suppliernumber}
                </TableCell>

                <TableCell>
                 <span style={ returnColor(Number(order.healthstatus)) } onClick={()=>{ props.setHealthGuage(order.healthstatus) }} >{order.healthstatus}</span> 
                </TableCell>

                <TableCell>
                  {order.partdescriptioneng}
                </TableCell>
          
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box> */}
  </Card>
  <Card {...props}>
    <CardHeader title="Part Detailed  Description" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Material ID
              </TableCell>
              <TableCell>
                Safety Stock
              </TableCell>
              {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
              <TableCell>
                Part Description Eng
              </TableCell>
              <TableCell>
                Plant
              </TableCell>
              <TableCell>
                Storage Location
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedMaterial.map((order) => (
              <TableRow
                hover
                key={order.materialID}
              >
                <TableCell>
                 {order.materialID}
                </TableCell>
                <TableCell>
                  {order.safetystock}
                </TableCell>
                <TableCell >
                  {order.partdescriptioneng}
                </TableCell>

                <TableCell>
                  {order.plant}
                </TableCell>

                <TableCell>
                  {order.storagelocation}
                </TableCell>
          
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >

    </Box>
  </Card>
  </>

)};


export const ExceptionMatrix = (props) => {
 const [selectedMaterial,setSelectedMaterial] = useState(healthScore.slice(0,1));
 const [matrixData,setMatrixData] = useState(exceptionViewer)

 return(<Card {...props}>
    <CardHeader title="Part Exception Matrix" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800,height:"600px" ,overflow:"scroll"}}>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell>
                Material ID
              </TableCell>
              <TableCell>
              ExceptionCount
              </TableCell>
              {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
              <TableCell onClick={()=>{setMatrixData(exceptionViewer.sort(sortByProperty("Percentage")).slice(0,exceptionViewer.length-1)) }}>
              Percentage

              </TableCell>
              <TableCell>
              Part Description

              </TableCell>
              <TableCell>
              Part Description Eng

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matrixData.map((order) => (
              <TableRow
                hover
                key={order.MaterialID}
              >
                 <TableCell>
                 {order.MaterialID}
                </TableCell>

                <TableCell>
                 {order.ExceptionCount}
                </TableCell>
                <TableCell>
                  {(order.Percentage*100).toString().slice(0,4) + "%"}
                </TableCell>
                <TableCell >
                  {order.PartDescription}
                </TableCell>

                <TableCell>
                  {order.PartDescriptionEng}
                </TableCell>

            
          
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >

    </Box>
  </Card>
)
}