import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import Iconify from '../shared/Iconify';


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

export default function WorkshopsSelector({ workshops, userWorkshops }) {
    const [usersWorkshop, setUsersWorkshops] = useState([]);

    useEffect(() => {
        setUsersWorkshops(userWorkshops);
    }, [userWorkshops])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setUsersWorkshops(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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
                        {usersWorkshop.map(({ name, image, bonk }, index) => (
                            <Chip
                                key={index}
                                label={name}
                                avatar={<Avatar src={image} />}
                                onDelete={() => { }}
                                //color={(bonk && 'error') || 'success'}
                                deleteIcon={
                                    <IconButton disabled>
                                        <Iconify icon={bonk ? 'eva:checkmark-circle-outline' : 'eva:close-circle-outline'} width={24} height={24} />
                                    </IconButton>
                                }
                            />
                        ))}
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
