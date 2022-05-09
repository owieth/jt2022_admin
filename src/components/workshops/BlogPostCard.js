import { Box, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../shared/Iconify';

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

export default function BlogPostCard({ index, workshop }) {
  const { attendees, name, description, date, startTime, endTime, image } = workshop;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle>
          <CoverImgStyle src={image} />
        </CardMediaStyle>

        <CardContent>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {/* {fDate()} */}
          </Typography>

          <TitleStyle
            to={`${index}`}
            state={workshop}
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
              <Iconify icon="eva:people-outline" sx={{ width: 16, height: 16, mr: 0.5 }} />
              <Typography variant="caption">{attendees?.length}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 0,
              }}
            >
              <Iconify icon="eva:pin-outline" sx={{ width: 16, height: 16, mr: 0.5 }} />
              <Typography variant="caption">Gebäude A, 3. Stock</Typography>
            </Box>
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
