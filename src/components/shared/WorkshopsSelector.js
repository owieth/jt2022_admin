import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function WorkshopsSelector({ workshops, userWorkshops, workshopState, emitWorkshopChange }) {
    const [usersWorkshop, setUsersWorkshops] = useState([]);

    useEffect(() => {
        setUsersWorkshops(userWorkshops);
    }, [userWorkshops])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        emitWorkshopChange(value);
        setUsersWorkshops(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleWorkshopState = (id) => {
        switch (workshopState.find((workshop) => workshop.id === id)?.state) {
            case 1:
                return 'success'

            case 2:
                return 'error'

            default:
                break;
        }
    }

    return (
        <FormControl sx={{ width: 300 }}>
            <InputLabel>Workshops</InputLabel>
            <Select
                multiple
                value={usersWorkshop}
                onChange={handleChange}
                input={<OutlinedInput label="Workshops" />}
                MenuProps={MenuProps}
                renderValue={() => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {usersWorkshop.map(({ id, name, image }, index) => {
                            const state = handleWorkshopState(id);
                            return <Chip
                                key={index}
                                label={name}
                                variant={!state ? "outlined" : "filled"}
                                avatar={<Avatar src={image} />}
                                color={state}
                                sx={{ color: state && 'white' }}
                            />
                        })}
                    </Box>
                )}
            >
                {workshops.map((workshop, index) => (
                    <MenuItem key={index} value={workshop}>
                        {workshop.name} ({workshop.attendees.length})
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
