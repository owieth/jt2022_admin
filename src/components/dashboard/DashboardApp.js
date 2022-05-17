import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { DashboardWidget } from '.';
import { getCollection } from '../../service/firebase';
import { fDate } from '../../utils/formatTime';
import { AppOrderTimeline, AppWebsiteVisits, AttendeesChart, RegionsChart } from '../chart';
import { timeline } from '../constants/timeline';
import Page from '../shared/Page';

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

  //console.log(users.map(user => user.workshops.at(workshops.find(workshop => workshop.attendees.includes(user.id))?.id)?.state));

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardWidget title="Anzahl Workshops" total={workshops.length} icon={'eva:file-text-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <DashboardWidget title="Anzahl Teilnehmer" total={users.length} color="warning" icon={'eva:people-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <DashboardWidget title="Anzahl Helfer" total={users.filter((user) => user.isVolunteer).length} color="error" icon={'eva:person-outline'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Anmeldungen pro Workshop"
              chartLabels={workshops.map(workshop => workshop.name)}
              chartData={[
                {
                  name: 'In Bearbeitung',
                  type: 'column',
                  fill: 'solid',
                  data: Array.from(Array(10).keys())
                },
                {
                  name: 'Bestätigt',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Abgelehnt',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
            {/* <AppWebsiteVisits
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
            /> */}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <RegionsChart
              title="Aufteilung Bezirke"
              chartData={users.map((user) => {
                return {
                  label: user.region,
                  value: users.filter((u) => u.region === user.region).length
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
              list={timeline.map((day, index) => ({
                id: index,
                title: day.event,
                type: `order${index + 1}`,
                time: day.time
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
