import { Box, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import { partners, stats } from '../data/siteData';

export default function StatsSection() {
  return (
    <Box className="section" id="thong-bao">
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <SectionHeader
            eyebrow="Thống kê"
            title="Hệ sinh thái dữ liệu khu vực"
            subtitle="Chỉ số vận hành thể hiện năng lực xử lý hồ sơ và cung cấp dữ liệu đất đai toàn vùng phía Nam."
          />
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Paper className={`reveal delay-${(index % 4) + 1}`} sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h3">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Paper sx={{ p: 3 }} className="reveal delay-2">
            <Stack spacing={2}>
              <Typography variant="h4">Đơn vị phối hợp & tích hợp</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {partners.map((partner) => (
                  <Chip key={partner} label={partner} variant="outlined" />
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
