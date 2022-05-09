import { Box, Button, Card, Container, Grid, Stack, TextField, Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Iconify from '../shared/Iconify';
import Page from '../shared/Page';

export default function Workshop() {

  const location = useLocation();
  const workshop = location.state;

  const formik = useFormik({
    initialValues: {
      name: workshop.name,
      description: workshop.description,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      {workshop && <Page title="Workshop">
        <Container>
          <Card>
            <ImageListItem key={workshop.image} style={{
              width: '100%',
            }}>
              <img src={workshop.image} alt="" style={{
                height: '500px',
                objectFit: 'cover',
              }} />
              <ImageListItemBar
                sx={{
                  background: 'none',
                }}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white', padding: 2 }}
                  >
                    <Iconify icon="eva:edit-2-outline" />
                  </IconButton>
                }
                actionPosition="right"
              />
            </ImageListItem>

            <form onSubmit={formik.handleSubmit}>
              <Container sx={{ padding: 5 }}>
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </Grid>

                  <Box width="100%" />

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Beschreibung"
                      type="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </Grid>

                  <Box width="100%" />

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={4}>
                      <DesktopDatePicker
                        label="Datum des Workshops"
                        inputFormat="MM/dd/yyyy"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <DateTimePicker
                        label="Startzeit"
                        value={formik.values.startTime}
                        onChange={formik.handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <DateTimePicker
                        label="Endzeit"
                        value={formik.values.endTime}
                        onChange={formik.handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>

                  </LocalizationProvider>
                </Grid>

              </Container>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                paddingBottom={5}>
                <Button color="primary" variant="contained" size="large" type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </Card>
        </Container>
      </Page>
      }
    </>
  );
}
