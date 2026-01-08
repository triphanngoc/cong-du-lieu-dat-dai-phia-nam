import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import { processSteps, systemModules } from '../data/siteData';

export default function SystemOverview() {
  return (
    <Box className="section" id="gioi-thieu">
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <SectionHeader
            eyebrow="Hệ thống"
            title="Kiến trúc dịch vụ dữ liệu đất đai"
            subtitle="Định hướng theo mô hình nền tảng mở, tích hợp API và quản trị xuyên suốt từ hồ sơ, thanh toán đến khai thác dữ liệu."
          />
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                {systemModules.map((module, index) => (
                  <Paper key={module.title} sx={{ p: 2.5 }} className={`reveal delay-${(index % 4) + 1}`}>
                    <Stack spacing={1}>
                      <Typography variant="h4">{module.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {module.detail}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, height: '100%' }} className="reveal delay-2">
                <Stack spacing={2}>
                  <Typography variant="h4">Quy trình xử lý hồ sơ</Typography>
                  {processSteps.map((step, index) => (
                    <Stack key={step.title} direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Stack spacing={0.5}>
                        <Typography variant="subtitle1">{step.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.detail}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
