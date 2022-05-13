import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../shared/Iconify';

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

export default function UserWorkshopListToolbar({ numSelected }) {
    return (
        <RootStyle
            sx={{
                color: 'primary.main',
                bgcolor: 'primary.lighter',
            }}>
            <Typography variant="subtitle1">
                {numSelected} Workshops ausgewählt
            </Typography>
            <Tooltip title="Ausgewählte Workshops zuweisen">
                <span >
                    <IconButton color="primary" disabled={numSelected === 0}>
                        <Iconify icon="eva:log-in-outline" />
                    </IconButton>
                </span>
            </Tooltip>
        </RootStyle >
    )
}
