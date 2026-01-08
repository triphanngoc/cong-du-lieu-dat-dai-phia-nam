import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import SectionHeader from '../components/SectionHeader';
import { productCatalog } from '../data/siteData';

export default function ProductCatalog() {
  const [tabIndex, setTabIndex] = useState(0);
  const activeCategory = productCatalog[tabIndex];

  return (
    <Box className="section" id="du-lieu">
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <SectionHeader
            eyebrow="Dữ liệu"
            title="Danh mục dữ liệu chủ lực"
            subtitle="Kho dữ liệu chuẩn hóa theo lĩnh vực: trắc địa, ảnh hàng không, bản đồ địa hình, cơ sở dữ liệu nền và mô hình số độ cao."
          />
          <Tabs
            value={tabIndex}
            onChange={(_, value) => setTabIndex(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {productCatalog.map((category) => (
              <Tab key={category.label} label={category.label} />
            ))}
          </Tabs>
          <Grid container spacing={3}>
            {activeCategory.items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card className={`reveal delay-${(index % 4) + 1}`} sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <MapOutlinedIcon color="primary" />
                        <Chip label={activeCategory.label} size="small" />
                      </Stack>
                      <Typography variant="h4">{item}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dữ liệu đã được kiểm định, sẵn sàng cấp theo yêu cầu và quy chuẩn kỹ thuật quốc gia.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
