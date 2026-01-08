import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';

export default function MapAccess() {
  return (
    <Box className="section-tight" id="ban-do">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className="reveal delay-1" sx={{ p: 3, height: '100%' }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <MapOutlinedIcon color="primary" />
                  <Typography variant="h4">Bản đồ trực tuyến</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Truy cập nhanh bản đồ nền, dữ liệu chuyên đề và lớp thông tin địa chính. Hỗ trợ đo đạc,
                  phân tích và chia sẻ liên ngành.
                </Typography>
                <Button variant="contained">Truy cập bản đồ</Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper id="phan-manh" className="reveal delay-2" sx={{ p: 3, height: '100%' }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LayersOutlinedIcon color="primary" />
                  <Typography variant="h4">Số liệu phân mảnh</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Quản lý các lô dữ liệu phân vùng theo tỉnh, huyện, xã với cấu trúc chuẩn hóa và thông tin
                  metadata đầy đủ.
                </Typography>
                <Button variant="outlined">Xem danh mục phân mảnh</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
