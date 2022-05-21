import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../shared/Iconify';

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

export default function UserWorkshopListToolbar({ numSelected, handleAssignment }) {
    return (
        <RootStyle
            sx={{
                color: 'primary.main',
                bgcolor: 'primary.lighter',
            }}>
            <Typography variant="subtitle1">
                {numSelected} Workshops ausgewählt
            </Typography>
            <div>
                <Tooltip title="Ausgewählte Workshops ablehnen">
                    <span >
                        <IconButton color="primary" disabled={numSelected === 0} onClick={() => handleAssignment(2)}>
                            <Iconify icon="eva:close-circle-outline" />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Ausgewählte Workshops zuweisen">
                    <span >
                        <IconButton color="primary" disabled={numSelected === 0} onClick={() => handleAssignment(1)}>
                            <Iconify icon="eva:checkmark-circle-outline" />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        </RootStyle >
    )
}
