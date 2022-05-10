import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../shared/Iconify';
import Page from '../../components/shared/Page';
import { BlogPostCard } from '.';
import { getCollection } from '../../service/firebase';

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const workshops = await getCollection("workshops");
      setWorkshops(workshops);
    }

    fetchWorkshops();
  }, [])

  return (
    <Page title="Workshops">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Workshops
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Neuer Workshop
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {
            workshops &&
            workshops.map((workshop, index) => (
              <BlogPostCard key={index} workshop={workshop} index={index} />
            ))
          }
        </Grid>
      </Container>
    </Page>
  );
}
