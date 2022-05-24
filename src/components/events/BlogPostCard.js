import { Box, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../shared/Iconify';
import { format } from 'date-fns';
import { getHouseByKey } from '../constants/house';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

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

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function BlogPostCard({ index, event }) {
  const { name, date, startTime, endTime, house, isImmutable, image } = event;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative', opacity: isImmutable && 0.5 }}>
        <CardMediaStyle>
          <CoverImgStyle src={image} />
        </CardMediaStyle>

        <CardContent>
          <TitleStyle
            to={!isImmutable ? `${index}` : ''}
            state={event}
            color="inherit"
            variant="subtitle2"
            underline={!isImmutable ? "hover" : "none"}
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
