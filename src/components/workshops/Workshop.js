import {
  Alert,
  AlertTitle, Button,
  Card,
  Container, Dialog,
  DialogActions,
  DialogContent, DialogTitle,
  IconButton,
  ImageListItem,
  ImageListItemBar, Stack
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteWorkshop, deleteWorkshopImage } from 'src/service/firebase';
import { PLACEHOLDER_IMAGE_URL } from 'src/utils/constans';
import { Form } from '.';
import { handleImageUpload, updateWorkshop } from '../../service/firebase';
import Iconify from '../shared/Iconify';
import Page from '../shared/Page';

export default function Workshop() {
  const [image, setImage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const workshop = location.state;
  const fileRef = useRef();

  useEffect(() => {
    setImage(workshop.image);
  }, [workshop])

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      const imageUrl = await handleImageUpload(e.target.files[0], workshop.id);
      setImage(imageUrl);
    }
  }

  const handleDelete = async () => {
    await deleteWorkshop(workshop.id);
    if (workshop.image !== PLACEHOLDER_IMAGE_URL) {
      await deleteWorkshopImage(workshop.id);
    }
    toast.success("Workshop wurde gelöscht!");
    navigate('/dashboard/workshops', { replace: true });
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
      await updateWorkshop(image, workshop.id, values);
      toast.success("Workshop wurde geupdated!");
      navigate('/dashboard/workshops', { replace: true });
    }
  }

  const hasAttendees = workshop.attendees.length > 0;

  return (
    <>
      {workshop && <Page title="Workshop">
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
                name: workshop.name,
                description: workshop.description,
                date: workshop.date,
                startTime: workshop.startTime,
                endTime: workshop.endTime,
                house: workshop.house
              }} isEdit={true} handleClose={handleClickOpen} handleSubmit={handleSubmit} />
            </Stack>

            <Dialog
              open={open}
              keepMounted
              fullWidth={true}
              maxWidth="sm"
              onClose={handleClose}>
              <DialogTitle>Workshop löschen?</DialogTitle>
              <DialogContent>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="warning">
                    <AlertTitle>Achtung</AlertTitle>
                    Ein gelöschter Workshop muss neu erstellt werden!
                  </Alert>

                  {hasAttendees && <Alert severity="error">
                    <AlertTitle>Fehler</AlertTitle>
                    Diesem Workshop sind noch <strong>{workshop.attendees.length}</strong> Teilnehmer zugewiesen
                  </Alert>}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={handleDelete} color="error" disabled={hasAttendees}>Löschen!</Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Container>
      </Page>
      }
    </>
  );
}
