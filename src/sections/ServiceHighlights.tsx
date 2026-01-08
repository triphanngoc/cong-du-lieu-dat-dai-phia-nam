import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SectionHeader from '../components/SectionHeader';
import { quickActions } from '../data/siteData';

const icons = [
  <DescriptionOutlinedIcon key="doc" fontSize="large" color="primary" />,
  <TrackChangesOutlinedIcon key="track" fontSize="large" color="primary" />,
  <PaymentsOutlinedIcon key="pay" fontSize="large" color="primary" />,
  <HelpOutlineOutlinedIcon key="help" fontSize="large" color="primary" />,
];

export default function ServiceHighlights() {
  return (
    <Box className="section" id="dich-vu">
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <SectionHeader
            eyebrow="Dịch vụ công"
            title="Trung tâm phục vụ hồ sơ và dữ liệu"
            subtitle="Tập trung các luồng dịch vụ trọng yếu: nộp hồ sơ, theo dõi xử lý, thanh toán trực tuyến và hướng dẫn khai thác dữ liệu đất đai."
          />
          <Grid container spacing={3}>
            {quickActions.map((item, index) => (
              <Grid item xs={12} md={6} lg={3} key={item.title}>
                <Card className={`reveal delay-${index + 1}`} sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      {icons[index]}
                      <Typography variant="h4">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button variant="text">{item.action}</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
