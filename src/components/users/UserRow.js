import {
    Avatar, IconButton, Stack, TableCell, TableRow, Tooltip, Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { UserMoreMenu } from '.';
import Iconify from '../shared/Iconify';
import WorkshopsSelector from '../shared/WorkshopsSelector';

export default function UserRow({ user, workshops, userWorkshops, handleWorkshopAssignment }) {
    const { id, name, email, photoUrl, region, muncipality, isVolunteer } = user;

    const [isMenuDisabled, setIsMenuDisabled] = useState(true)

    useEffect(() => {
        setIsMenuDisabled(userWorkshops.length <= 0)
    }, [userWorkshops])

    const handleNewWorkshopAssignment = () => {

    }

    return (
        <TableRow
            hover
            key={id}
            tabIndex={-1}
            role="checkbox"
        >
            <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={photoUrl} />
                    <Stack direction="column">
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {email}
                        </Typography>
                    </Stack>
                </Stack>
            </TableCell>

            <TableCell align="left">{region}</TableCell>

            <TableCell align="left">{muncipality}</TableCell>

            <TableCell align="right">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <WorkshopsSelector workshops={workshops} userWorkshops={userWorkshops} workshopState={user.workshops} emitWorkshopChange={(workshops) => setIsMenuDisabled(workshops.length <= 0)} />

                    <Tooltip title="Workshopauswahl speichern">
                        <span >
                            <IconButton color="primary" disabled={isMenuDisabled} onClick={handleNewWorkshopAssignment}>
                                <Iconify icon="eva:checkmark-circle-outline" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>
            </TableCell>

            <TableCell align="left">{isVolunteer ? 'Ja' : 'Nein'}</TableCell>

            <TableCell align="right">
                <UserMoreMenu handleClose={() => handleWorkshopAssignment(userWorkshops, id)} disabled={isMenuDisabled} />
            </TableCell>
        </TableRow>
    );
}
