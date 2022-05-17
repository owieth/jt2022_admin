import { Box, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../shared/Iconify';
import { format } from 'date-fns';
import { getHouseByKey } from '../constants/house';

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

export default function BlogPostCard({ index, event }) {
  const { name, date, startTime, endTime, house } = event;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {/* {fDate()} */}
          </Typography>

          <TitleStyle
            to={`${index}`}
            state={event}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {name}
          </TitleStyle>


          <InfoStyle>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 0,
              }}
            >
              <Iconify icon="eva:clock-outline" sx={{ width: 16, height: 16, mr: 0.5 }} />
              <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                {format(date, 'dd MMM. Y')} ({format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')})
              </Typography>
            </Box>
          </InfoStyle>

          <InfoStyle>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 0,
              }}
            >
              <Iconify icon="eva:pin-outline" sx={{ width: 16, height: 16, mr: 0.5 }} />
              <Typography variant="caption">{getHouseByKey(house)}</Typography>
            </Box>
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
