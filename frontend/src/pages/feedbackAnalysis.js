import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { ExceptionManager } from "../components/exception/exception-manager";
import { DashboardLayout } from "../components/common/dashboard-layout";
import { ExceptionMatrix } from "../components/exception/exception-matrix";
import { Analysis } from "src/components/feedback/analysis";
const Dashboard = () => (

  <>
    <Head>
      <title>BMW Material Planner</title>
      <link rel="icon" type="image/png" href="bmw_logo_PNG19714.png"></link>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 0,
        marginTop: 0,
      }}
    >
        <Container maxWidth={false}>
            <Grid container spacing={3}>

                {/* <Grid item lg={12} md={12} xl={12} xs={12}>
                <ExceptionManager />
                </Grid> */}

                <Grid item lg={12} md={12} xl={12} xs={12}>
                <Analysis />
                </Grid>

            </Grid>
        </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
