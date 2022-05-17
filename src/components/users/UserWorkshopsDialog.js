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

export default function UserWorkshopsDialog({ workshops, open, handleClose }) {
    const [selected, setSelected] = useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = workshops.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

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
                    <UserWorkshopListToolbar numSelected={selected.length} />

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
                                    {workshops.map(({ id, name, image, date, house }) => {
                                        const isItemSelected = selected.indexOf(name) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar src={image} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell>{date}</TableCell>
                                                <TableCell>{house}</TableCell>
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
