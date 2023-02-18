import { Helmet } from 'react-helmet-async';
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  // const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Laywerd </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Your IP's usage" total={8} icon={'ant-design:property-safety-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Most popular IP's purchase chart"
              subheader="(+21%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Chameleon Software',
                  type: 'area',
                  fill: 'gradient',
                  data: [1, 3, 1, 4, 0, 0, 1, 4, 10, 8, 4],
                },
                {
                  name: 'Ocean Fish NFT Set',
                  type: 'area',
                  fill: 'gradient',
                  data: [2, 4, 0, 0, 2, 0, 1, 0, 6, 7, 3],
                },
                {
                  name: 'Monkey man NFT Set',
                  type: 'area',
                  fill: 'gradient',
                  data: [3, 5, 0, 0, 1, 3, 6, 1, 3, 4, 0],
                },
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
