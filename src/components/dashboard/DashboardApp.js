import { faker } from '@faker-js/faker';
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCollection } from '../../service/firebase';
import React, { useEffect, useState } from 'react';
import Page from '../shared/Page';
import {
  AttendeesChart, RegionsChart, AppOrderTimeline, AppWebsiteVisits
} from '../chart';
import { DashboardWidget } from '.'
import { fDate } from '../../utils/formatTime'

export default function DashboardOverview() {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getCollection("users");
      setUsers(users);
      const workshops = await getCollection("workshops");
      setWorkshops(workshops);
    }

    fetchData();
  }, [])

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardWidget title="Anzahl Workshops" total={workshops.length} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DashboardWidget title="Anzahl Teilnehmer" total={users.length} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DashboardWidget title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DashboardWidget title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
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
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <RegionsChart
              title="Aufteilung Bezirke"
              chartData={users.map((user) => {
                return {
                  label: user.region,
                  value: new Set(users.filter((u) => u.region === user.region)).size
                }
              })}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AttendeesChart
              title="Anzahl Teilnehmer pro Workshop"
              subheader={`${fDate(new Date())}`}
              chartData={workshops.map((workshop) => {
                return {
                  label: workshop.name,
                  value: workshop.attendees.length
                }
              })}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
