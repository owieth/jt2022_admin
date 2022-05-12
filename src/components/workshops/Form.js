import { Button, Container, Grid, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import deLocale from 'date-fns/locale/de';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';

export default function Form({ initialValues, handleSubmit, handleClose, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validateOnChange: true,
        validateOnBlur: false,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Bitte Pflichtfeld ausfüllen'),
            description: Yup.string()
                .required('Bitte Pflichtfeld ausfüllen'),
        }),
        onSubmit: (values) =>
            handleSubmit(values)
    });

    const houses = [
        {
            key: 0,
            value: 'Verwaltungsgebäude (A)'
        },
        {
            key: 1,
            value: 'Schulungsgebäude (B)'
        },
        {
            key: 2,
            value: 'Unterkunft (C)'
        },
        {
            key: 3,
            value: 'Unterkunft (D)'
        },
        {
            key: 4,
            value: 'Turnhalle (E)'
        }
    ]

    return (
        <form onSubmit={formik.handleSubmit}>
            <Container sx={{ padding: 5 }}>
                <Grid container spacing={5}>
                    {/* <Grid item xs={12}>
                    <ImageListItem style={{
                      width: '100%',
                    }}>
                      <img alt={''} src={image} style={{
                        height: '200px',
                        objectFit: 'fill',
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
                  </Grid> */}

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.errors.name?.length > 0}
                            helperText={formik.errors.name}
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
                            error={formik.errors.description?.length > 0}
                            helperText={formik.errors.description}
                        />
                    </Grid>

                    <Box width="100%" />

                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                        <Grid item xs={4}>
                            <DesktopDatePicker
                                label="Datum des Workshops"
                                inputFormat="dd.MM.yyyy"
                                mask=""
                                value={formik.values.date}
                                onChange={(value) => {
                                    formik.setFieldValue('date', Date.parse(value));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TimePicker
                                label="Startzeit"
                                value={formik.values.startTime}
                                onChange={(value) => {
                                    formik.setFieldValue('startTime', Date.parse(value));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TimePicker
                                label="Endzeit"
                                value={formik.values.endTime}
                                onChange={(value) => {
                                    formik.setFieldValue('endTime', Date.parse(value));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </LocalizationProvider>

                    <Grid item xs={4}>
                        <Select
                            label="Wo findet der Workshop statt?"
                            value={formik.values.house}
                            onChange={(value) => {
                                formik.setFieldValue('house', value.target.value);
                            }}
                        >
                            {houses.map((house) => (
                                <MenuItem key={house.key} value={house.key}>
                                    {house.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </Container>

            <Stack
                direction="row"
                justifyContent="end"
                alignItems="center"
                spacing={2}>
                <Button color="primary" variant="contained" size="large" type="submit" disabled={!(formik.isValid && formik.dirty)}>
                    Speichern
                </Button>
                <Button variant="outlined" color="error" size="large" startIcon={isEdit && <DeleteIcon />} onClick={() => handleClose(false)}>
                    {isEdit ? 'Löschen' : 'Abbrechen'}
                </Button>
            </Stack>
        </form>
    );
}
