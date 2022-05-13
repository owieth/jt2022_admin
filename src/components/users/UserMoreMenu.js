import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useRef, useState } from 'react';
import Iconify from '../shared/Iconify';

export default function UserMoreMenu({ disabled, handleClose }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleWorkshopAssignment = () => {
    handleClose();
    setIsOpen(false);
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)} disabled={disabled}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleWorkshopAssignment}>
          <ListItemIcon>
            <Iconify icon="eva:person-done-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Workshops bestätigen" />
        </MenuItem>
      </Menu>
    </>
  );
}
