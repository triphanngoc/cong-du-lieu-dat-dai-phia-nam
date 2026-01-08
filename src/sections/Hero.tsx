import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';

export default function Hero() {
  return (
    <Box className="hero-shell">
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" className="reveal">
          <Grid item xs={12} md={7}>
            <Box className="hero-panel">
              <Stack spacing={3}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip icon={<VerifiedOutlinedIcon />} label="Dữ liệu chuẩn hóa" color="primary" />
                  <Chip icon={<StorageOutlinedIcon />} label="Kho dữ liệu tập trung" variant="outlined" />
                  <Chip icon={<MapOutlinedIcon />} label="Bản đồ trực tuyến" variant="outlined" />
                </Stack>
                <Typography variant="h1">
                  Cổng dữ liệu đất đai thống nhất cho khu vực phía Nam
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Hạ tầng số phục vụ quản lý, chia sẻ và khai thác dữ liệu đất đai theo quy chuẩn quốc gia.
                  Hỗ trợ dịch vụ công trực tuyến, tra cứu hồ sơ, và cấp dữ liệu nhanh chóng cho tổ chức,
                  doanh nghiệp, và người dân.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button variant="contained" size="large">
                    Nộp hồ sơ trực tuyến
                  </Button>
                  <Button variant="outlined" size="large">
                    Tra cứu hồ sơ
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack spacing={2} className="reveal delay-1">
              <Box className="map-panel">
                <div className="glow-orb" />
              </Box>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Stack>
                  <Typography variant="subtitle1">Bản đồ trực tuyến</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Truy cập nhanh các lớp dữ liệu nền và chuyên đề.
                  </Typography>
                </Stack>
                <Button variant="text" endIcon={<MapOutlinedIcon />}>
                  Mở bản đồ
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
