import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { navItems } from '../data/siteData';

export default function MainNav() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const open = Boolean(anchorEl) && activeIndex !== null;
  const activeItem = activeIndex !== null ? navItems[activeIndex] : null;
  const resolveHref = (href: string) => (href.startsWith('#') ? `/${href}` : href);

  const handleOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    if (!navItems[index].children) {
      return;
    }
    setAnchorEl(event.currentTarget);
    setActiveIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveIndex(null);
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(90deg, rgba(11, 61, 145, 0.1), rgba(14, 124, 134, 0.12))',
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" spacing={1} alignItems="center" py={1} sx={{ overflowX: 'auto' }}>
          <Button href="/" sx={{ minWidth: 44, borderRadius: 2 }} startIcon={<HomeOutlinedIcon />}>
            <Typography variant="button">Trang chủ</Typography>
          </Button>
          {navItems.map((item, index) => (
            <Button
              key={item.label}
              href={item.children ? undefined : resolveHref(item.href)}
              onClick={(event) => handleOpen(event, index)}
              endIcon={item.children ? <KeyboardArrowDownIcon fontSize="small" /> : undefined}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ dense: true }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {activeItem?.children?.map((child) => (
          <MenuItem key={child.label} component="a" href={resolveHref(child.href)} onClick={handleClose}>
            {child.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
