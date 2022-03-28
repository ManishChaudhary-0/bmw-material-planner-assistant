import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';


export const ExceptionManager = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: '#D24D4D',
        barPercentage: 0.5,
        barThickness: 20,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 50, 40, 32,100],
        label: '',
        maxBarThickness: 100
      },
   
    ],
    labels: ['Postponed order', 'Potential Shortage Rqmt Increase', 'Firmed oder is late', 'No bill of material selected']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: 'y',
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            // endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            <select>
              <option value="" key="">last 5 days</option>
              <option value="" key="">last 10 days</option>
              <option value="" key="">last 20 days</option>
              <option value="" key="">last 30 days</option>
              <option value="" key="">last 40 days</option>
              <option value="" key="">last 45 days</option>
              <option value="" key="">last 60 days</option>

            </select>
          </Button>
        )}
        title="Part Exception Manager"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
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
        {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button> */}
      </Box>
    </Card>
  );
};
