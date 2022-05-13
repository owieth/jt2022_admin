import {
  Alert,
  AlertTitle, Button,
  Card,
  Container, Dialog,
  DialogActions,
  DialogContent, DialogTitle, Stack
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteEvent, updateEvent } from 'src/service/firebase';
import { Form } from '.';
import Page from '../shared/Page';

export default function Event() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state;

  const handleDelete = async () => {
    await deleteEvent(event.id);
    toast.success("Event wurde gelöscht!");
    navigate('/dashboard/events', { replace: true });
  }

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
      await updateEvent(event.id, values);
      toast.success("Event wurde geupdated!");
      navigate('/dashboard/events', { replace: true });
    }
  }

  return (
    <>
      {event && <Page title="Workshop">
        <Container>
          <Card>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              paddingRight={5}
              paddingBottom={5}
              spacing={2}>
              <Form initialValues={{
                name: event.name,
                date: event.date,
                startTime: event.startTime,
                endTime: event.endTime,
                house: event.house
              }} isEdit={true} handleClose={handleClickOpen} handleSubmit={handleSubmit} />
            </Stack>

            <Dialog
              open={open}
              keepMounted
              fullWidth={true}
              maxWidth="sm"
              onClose={handleClose}>
              <DialogTitle>Event löschen?</DialogTitle>
              <DialogContent>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="warning">
                    <AlertTitle>Achtung</AlertTitle>
                    Ein gelöschtes Event muss neu erstellt werden!
                  </Alert>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={handleDelete} color="error">Löschen!</Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Container>
      </Page>
      }
    </>
  );
}
