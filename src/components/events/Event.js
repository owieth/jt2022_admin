import {
  Alert,
  AlertTitle, Button,
  Card,
  Container, Dialog,
  DialogActions,
  DialogContent, DialogTitle, IconButton,
  ImageListItem,
  ImageListItemBar, Stack
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteEvent, updateEvent } from 'src/service/firebase';
import { Form } from '.';
import { handleImageUpload } from '../../service/firebase';
import Iconify from '../shared/Iconify';
import Page from '../shared/Page';

export default function Event() {
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state;
  const fileRef = useRef();

  useEffect(() => {
    setImage(event.image);
  }, [event])

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      const imageUrl = await handleImageUpload(e.target.files[0], `events/${event.id}`);
      setImage(imageUrl);
    }
  }

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
      await updateEvent(image, event.id, values);
      toast.success("Event wurde geupdated!");
      navigate('/dashboard/events', { replace: true });
    }
  }

  return (
    <>
      {event && <Page title="Workshop">
        <Container>
          <Card>
            <ImageListItem style={{
              width: '100%',
            }}>
              <img alt={''} src={image} style={{
                height: '200px',
              }}></img>

              <ImageListItemBar
                sx={{
                  background: 'none',
                }}
                position="top"
                actionIcon={
                  <>
                    <IconButton
                      sx={{ color: 'white', padding: 2 }}
                      onClick={() => fileRef.current.click()}
                    >
                      <Iconify icon="eva:edit-2-outline" />
                    </IconButton>
                    <input ref={fileRef}
                      type="file" accept=".png, .jpg, .jpeg" hidden onChange={handleUpload} />
                  </>
                }
                actionPosition="right"
              />
            </ImageListItem>

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
