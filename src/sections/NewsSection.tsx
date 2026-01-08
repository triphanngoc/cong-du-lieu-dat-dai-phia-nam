import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SectionHeader from '../components/SectionHeader';
import { newsHighlights } from '../data/siteData';

export default function NewsSection() {
  return (
    <Box className="section" id="tin-tuc">
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <SectionHeader
            eyebrow="Tin tức"
            title="Thông báo và bản tin dữ liệu"
            subtitle="Cập nhật các thông tin quan trọng về dữ liệu đất đai, nâng cấp hệ thống, và hướng dẫn sử dụng dịch vụ công trực tuyến."
          />
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 3, height: '100%' }} className="reveal delay-1">
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CampaignOutlinedIcon color="secondary" />
                    <Typography variant="subtitle1">Thông báo nổi bật</Typography>
                  </Stack>
                  <Typography variant="h3">{newsHighlights.featured.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {newsHighlights.featured.date}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {newsHighlights.featured.summary}
                  </Typography>
                  <Button variant="outlined">Xem chi tiết</Button>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3 }} className="reveal delay-2">
                <Stack spacing={2}>
                  <Typography variant="h4">Tin nhanh</Typography>
                  {newsHighlights.items.map((item) => (
                    <Stack key={item} spacing={0.5}>
                      <Typography variant="subtitle1">{item}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cập nhật định kỳ
                      </Typography>
                    </Stack>
                  ))}
                  <Button variant="text">Xem thêm tin tức</Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
