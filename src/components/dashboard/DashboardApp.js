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

  const getStateOfWorkshopCount = () => {
    const temp = [];
    const workshopState = [];

    users.forEach(user => {
      user.workshops.map(workshop => {
        return temp.push({
          name: workshops.find(w => w.id === workshop.id)?.name,
          state: workshop.state,
        })
      })
    })

    temp.forEach(workshop => {
      const workshops = temp.filter(w => w.name === workshop.name);

      if (!workshopState.map(workshop => workshop.name).includes(workshop.name)) {
        return workshopState.push({
          name: workshop.name,
          wait: workshops.filter(workshop => workshop.state === 0).length,
          approved: workshops.filter(workshop => workshop.state === 1).length,
          refused: workshops.filter(workshop => workshop.state === 2).length,
        })
      }
    })

    return workshopState;
  }

  const getRegions = () => {
    const regions = [];

    users.forEach(user => {
      if (!regions.map((region) => region.label).includes(user.region)) {
        regions.push({
          label: user.region,
          value: users.filter((u) => u.region === user.region).length
        })
      }
    })

    const nonSelected = regions.find(region => region.label === '');
    if (nonSelected) regions[regions.indexOf(nonSelected)].label = 'Keine Angabe'
    return regions;
  }

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
              chartLabels={getStateOfWorkshopCount().map(workshop => workshop.name)}
              chartData={[
                {
                  name: 'In Bearbeitung',
                  type: 'column',
                  fill: 'solid',
                  data: getStateOfWorkshopCount().map(workshops => workshops.wait)
                },
                {
                  name: 'Bestätigt',
                  type: 'area',
                  fill: 'gradient',
                  data: getStateOfWorkshopCount().map(workshops => workshops.approved)
                },
                {
                  name: 'Abgelehnt',
                  type: 'line',
                  fill: 'solid',
                  data: getStateOfWorkshopCount().map(workshops => workshops.refused)
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <RegionsChart
              title="Aufteilung Bezirke"
              chartData={getRegions()}
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
              title="Zeitplan"
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
