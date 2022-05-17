import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BlogPostCard, Form } from '.';
import { getCollection, createEvent } from '../../service/firebase';
import Iconify from '../shared/Iconify';
import Page from '../shared/Page';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const events = await getCollection("events");
      if (mounted) {
        setEvents(events);
      }
    })();

    return () => mounted = false;
  }, [events])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    if (values.startTime >= values.endTime) {
      toast.error("Endzeit kann nicht hinter Startzeit sein!");
    } else {
      await createEvent(values);
      toast.success("Event wurde erstellt!");
      setOpen(false)
    }
  }

  return (
    <Page title="Workshops">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tagesablauf
          </Typography>
          <Button variant="contained" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            Neuer Eintrag
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {
            events &&
            events.map((event, index) => (
              <BlogPostCard key={index} event={event} index={index} />
            ))
          }
        </Grid>

        <Dialog
          fullWidth={true}
          maxWidth={'md'}
          open={open}
        >
          <DialogTitle>Neuer Eintrag erstellen</DialogTitle>
          <DialogContent>
            <Form initialValues={{
              name: '',
              date: new Date(),
              startTime: new Date(),
              endTime: new Date(),
              house: 0
            }} handleClose={handleClose} handleSubmit={handleSubmit} />

          </DialogContent>
        </Dialog>
      </Container>
    </Page >
  );
}
