import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { agency, topLinks } from '../data/siteData';

export default function TopBar() {
  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'rgba(11, 61, 145, 0.08)',
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={1}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Hotline: {agency.hotline}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Email: {agency.email}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {topLinks.map((link) => (
              <Link key={link.label} href={link.href} underline="none" color="text.secondary" variant="caption">
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
