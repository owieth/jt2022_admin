import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BlogPostCard, Form } from '.';
import Page from '../../components/shared/Page';
import { createWorkshop, getCollection } from '../../service/firebase';
import Iconify from '../shared/Iconify';

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const workshops = await getCollection("workshops");
      if (mounted) {
        setWorkshops(workshops);
      }
    })();

    return () => mounted = false;
  }, [workshops])

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
      await createWorkshop(values);
      toast.success("Workshop wurde erstellt!");
      setOpen(false)
    }
  }

  return (
    <Page title="Workshops">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Workshops
          </Typography>
          <Button variant="contained" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
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

        <Dialog
          fullWidth={true}
          maxWidth={'md'}
          open={open}
        >
          <DialogTitle>Neuer Workshop erstellen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Das Bild kann beim Bearbeiten ausgewählt werden. Der Workshop wird mit einem Platzhalterbild erstellt.
            </DialogContentText>

            <Form initialValues={{
              name: '',
              description: '',
              date: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
              startTime: new Date().getTime(),
              endTime: new Date().getTime(),
              house: 0
            }} handleClose={handleClose} handleSubmit={handleSubmit} />

          </DialogContent>
        </Dialog>
      </Container>
    </Page >
  );
}
