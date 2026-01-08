import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { agency, footerLinks } from '../data/siteData';

export default function Footer() {
  return (
    <Box
      id="lien-he"
      sx={{
        mt: 6,
        py: 6,
        backgroundColor: '#0b2f5f',
        color: 'rgba(255, 255, 255, 0.86)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack spacing={1.5}>
              <Typography variant="h4" color="white">
                {agency.name}
              </Typography>
              <Typography variant="body2">{agency.fullName}</Typography>
              <Typography variant="body2">{agency.address}</Typography>
              <Typography variant="body2">Hotline: {agency.hotline}</Typography>
              <Typography variant="body2">Email: {agency.email}</Typography>
            </Stack>
          </Grid>
          {footerLinks.map((group) => (
            <Grid item xs={12} sm={4} md={2} key={group.title}>
              <Stack spacing={1.2}>
                <Typography variant="subtitle1" color="white">
                  {group.title}
                </Typography>
                {group.links.map((link) => (
                  <Link key={link} href="#" underline="none" color="inherit" variant="body2">
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
          <Typography variant="caption">
            © 2026 Trung tâm Dữ liệu và Thông tin đất đai (Chi nhánh văn phòng Phía Nam). All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
