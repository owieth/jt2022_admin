import {
    Avatar, Button, Card, Checkbox, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Stack, Table, TableBody,
    TableCell, TableContainer, TableRow, Typography
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { UserListHead, UserWorkshopListToolbar } from '.';
import Scrollbar from '../shared/Scrollbar';
import { getHouseByKey } from '../constants/house'
import { format } from 'date-fns';
import { updateWorkshopAttendance } from '../../service/firebase';

export default function UserWorkshopsDialog({ userId, workshops, open, handleClose }) {
    const [selected, setSelected] = useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = workshops.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleAssignment = async (state) => {
        for (const workshop of selected) {
            await updateWorkshopAttendance(workshop, userId, state);
        }
        handleClose();
    }

    const TABLE_HEAD = [
        { id: 'name', label: 'Name' },
        { id: 'time', label: 'Zeit', },
        { id: 'location', label: 'Ort', },
    ];

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md">
            <DialogTitle>Workshops dem Teilnehmer bestätigen</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Jeder Workshop kann einzeln bestätigt werden.
                </DialogContentText>

                <Card>
                    <UserWorkshopListToolbar numSelected={selected.length} handleAssignment={handleAssignment} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    headLabel={TABLE_HEAD}
                                    rowCount={workshops.length}
                                    numSelected={selected.length}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {workshops.map(({ id, name, image, date, startTime, endTime, house }) => {
                                        const isItemSelected = selected.indexOf(id) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onChange={() => handleClick(id)} />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar src={image} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>{format(date, 'dd MMM. Y')} ({format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')})</TableCell>
                                                <TableCell>{getHouseByKey(house)}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    );
}
