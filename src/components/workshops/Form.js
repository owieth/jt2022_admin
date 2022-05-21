import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container, Grid, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { startOfDay } from 'date-fns';
import deLocale from 'date-fns/locale/de';
import { useFormik } from 'formik';
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
                            multiline
                            maxRows={4}
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

                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                        <Grid item xs={4}>
                            <DatePicker
                                label="Datum des Workshops"
                                mask=""
                                value={startOfDay(formik.values.date)}
                                onChange={(value) => {
                                    formik.setFieldValue('date', Date.parse(value));
                                    formik.setFieldValue('startTime', Date.parse(value));
                                    formik.setFieldValue('endTime', Date.parse(value));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <DateTimePicker
                                label="Startzeit"
                                mask=""
                                value={formik.values.startTime}
                                onChange={(value) => {
                                    formik.setFieldValue('startTime', Date.parse(value));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <DateTimePicker
                                label="Endzeit"
                                mask=""
                                value={formik.values.endTime}
                                onChange={(value) => {
                                    formik.setFieldValue('endTime', Date.parse(value));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </LocalizationProvider>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
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
                        </TextField>
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
