import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Logo = () => <RouterLink to="/"><Box component="img" src="/static/logo.png" sx={{ height: 50 }} /></RouterLink>

export default Logo;
