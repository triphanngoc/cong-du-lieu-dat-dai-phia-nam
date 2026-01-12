import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SectionHeader from '../components/SectionHeader';
import { agency, introFocus, introHighlights } from '../data/siteData';

const highlightIcons = [
  <FlagOutlinedIcon key="mission" fontSize="large" color="primary" />,
  <PublicOutlinedIcon key="scope" fontSize="large" color="primary" />,
  <LayersOutlinedIcon key="data" fontSize="large" color="primary" />,
  <ShieldOutlinedIcon key="safety" fontSize="large" color="primary" />,
];

export default function Introduction() {
  return (
    <Box className="section" id="gioi-thieu">
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Stack spacing={3} className="reveal">
              <SectionHeader
                eyebrow="Giới thiệu"
                title="Nền tảng dữ liệu đất đai hợp nhất khu vực phía Nam"
                subtitle="Kết nối liên thông dữ liệu, dịch vụ công, và hệ thống nghiệp vụ để phục vụ điều hành, khai thác và chia sẻ thông tin đất đai."
              />
              <Typography variant="body1" color="text.secondary">
                {agency.fullName} là đầu mối cung cấp dữ liệu chuẩn hóa, hỗ trợ các cơ quan quản lý,
                doanh nghiệp và người dân tra cứu thông tin đất đai minh bạch, nhanh chóng.
              </Typography>
              <Paper sx={{ p: 3 }} className="reveal delay-1">
                <Stack spacing={2}>
                  <Typography variant="h4">Trọng tâm vận hành</Typography>
                  {introFocus.map((item) => (
                    <Stack key={item.title} direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: 'secondary.main',
                          mt: 1,
                        }}
                      />
                      <Stack spacing={0.5}>
                        <Typography variant="subtitle1">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.detail}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {introHighlights.map((item, index) => (
                <Grid item xs={12} sm={6} key={item.title}>
                  <Paper
                    className={`reveal delay-${(index % 4) + 1}`}
                    sx={{ p: 2.5, height: '100%' }}
                  >
                    <Stack spacing={1.5}>
                      {highlightIcons[index]}
                      <Typography variant="h4">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
