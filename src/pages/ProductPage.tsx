import { useMemo, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItemButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import Footer from '../sections/Footer';
import MainNav from '../sections/MainNav';
import TopBar from '../sections/TopBar';
import { productGroups, productItems } from '../data/siteData';

const sortOptions = [
  { value: 'default', label: 'Mặc định' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'views', label: 'Lượt xem' },
  { value: 'name', label: 'Tên sản phẩm' },
];

export default function ProductPage() {
  const defaultGroup = productGroups.find((group) => group.id === 'ban-do-dia-hinh') ?? productGroups[0];
  const [activeGroup, setActiveGroup] = useState(defaultGroup.id);
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const visibleItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    let items = productItems.filter((item) => item.group === activeGroup);

    if (normalizedSearch) {
      items = items.filter((item) =>
        `${item.title} ${item.category}`.toLowerCase().includes(normalizedSearch)
      );
    }

    if (sortBy === 'newest') {
      items = [...items].sort((a, b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0));
    }

    if (sortBy === 'views') {
      items = [...items].sort((a, b) => b.views - a.views);
    }

    if (sortBy === 'name') {
      items = [...items].sort((a, b) => a.title.localeCompare(b.title));
    }

    return items;
  }, [activeGroup, searchTerm, sortBy]);

  return (
    <Box className="page product-page">
      <TopBar />
      <MainNav />
      <Box className="product-banner">
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
              <Stack spacing={1}>
                <Breadcrumbs aria-label="breadcrumb" className="product-crumbs">
                  <Link href="/" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <HomeOutlinedIcon fontSize="small" />
                    Trang chủ
                  </Link>
                  <Typography color="text.primary">Sản phẩm</Typography>
                </Breadcrumbs>
                <Typography variant="h2">Danh mục sản phẩm dữ liệu</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 560 }}>
                  Tập hợp các bộ dữ liệu bản đồ, ảnh hàng không và sản phẩm chuyên ngành phục vụ khai thác,
                  phân tích và quản lý tài nguyên đất đai.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton className="product-share" aria-label="Facebook">
                  <FacebookOutlinedIcon />
                </IconButton>
                <IconButton className="product-share" aria-label="Cổng thông tin">
                  <LanguageOutlinedIcon />
                </IconButton>
                <IconButton className="product-share" aria-label="Email">
                  <MailOutlineOutlinedIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box className="section product-shell">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Paper className="product-sidebar">
                <Box className="product-sidebar-title">
                  <Typography variant="h4">Nhóm sản phẩm</Typography>
                </Box>
                <List dense disablePadding>
                  {productGroups.map((group) => (
                    <ListItemButton
                      key={group.id}
                      className="product-group-button"
                      selected={group.id === activeGroup}
                      onClick={() => setActiveGroup(group.id)}
                    >
                      <Typography variant="subtitle2">{group.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {group.count}
                      </Typography>
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper className="product-toolbar" sx={{ p: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" width="100%">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2">Sắp xếp</Typography>
                    <FormControl size="small">
                      <Select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                        {sortOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Box sx={{ flex: 1 }} />
                  <TextField
                    size="small"
                    placeholder="Tìm kiếm sản phẩm"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    sx={{ minWidth: 220 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      aria-label="Chế độ danh sách"
                      className="product-view-toggle"
                      onClick={() => setViewMode('list')}
                      color={viewMode === 'list' ? 'primary' : 'default'}
                    >
                      <ViewListOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Chế độ lưới"
                      className="product-view-toggle"
                      onClick={() => setViewMode('grid')}
                      color={viewMode === 'grid' ? 'primary' : 'default'}
                    >
                      <ViewModuleOutlinedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>

              <Box mt={3} className="product-list">
                {visibleItems.length === 0 ? (
                  <Paper className="product-card" sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1">Chưa có sản phẩm cho nhóm dữ liệu này.</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vui lòng chọn nhóm khác hoặc thử lại với từ khóa mới.
                    </Typography>
                  </Paper>
                ) : viewMode === 'grid' ? (
                  <Grid container spacing={2}>
                    {visibleItems.map((item) => (
                      <Grid item xs={12} md={6} key={item.title}>
                        <Paper className="product-card" sx={{ p: 2.5 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                              <Box className={`product-thumb ${item.tone}`} />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                              <Stack spacing={1.5}>
                                <Stack
                                  direction={{ xs: 'column', sm: 'row' }}
                                  justifyContent="space-between"
                                  spacing={1}
                                >
                                  <Typography variant="h4">{item.title}</Typography>
                                  <Button
                                    variant="text"
                                    size="small"
                                    startIcon={<StarOutlineOutlinedIcon />}
                                  >
                                    Ưa thích
                                  </Button>
                                </Stack>
                                <Stack spacing={0.6}>
                                  <Typography variant="body2" color="text.secondary">
                                    Ngày đăng: {item.publishedLabel}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {item.views.toLocaleString('vi-VN')} lượt xem
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Danh mục: {item.category}
                                  </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2} flexWrap="wrap">
                                  <Button variant="contained" startIcon={<ShoppingCartOutlinedIcon />}>
                                    Thêm vào giỏ hàng
                                  </Button>
                                  <Button variant="text">Chi tiết</Button>
                                </Stack>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Stack spacing={2}>
                    {visibleItems.map((item) => (
                      <Paper key={item.title} className="product-card" sx={{ p: 2.5 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={4} md={3}>
                            <Box className={`product-thumb ${item.tone}`} />
                          </Grid>
                          <Grid item xs={12} sm={8} md={9}>
                            <Stack spacing={1.5}>
                              <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                justifyContent="space-between"
                                spacing={1}
                              >
                                <Typography variant="h4">{item.title}</Typography>
                                <Button
                                  variant="text"
                                  size="small"
                                  startIcon={<StarOutlineOutlinedIcon />}
                                >
                                  Thêm vào ưa thích
                                </Button>
                              </Stack>
                              <Stack spacing={0.6}>
                                <Typography variant="body2" color="text.secondary">
                                  Ngày đăng: {item.publishedLabel}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.views.toLocaleString('vi-VN')} lượt xem
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Danh mục: {item.category}
                                </Typography>
                              </Stack>
                              <Stack direction="row" spacing={2} flexWrap="wrap">
                                <Button variant="contained" startIcon={<ShoppingCartOutlinedIcon />}>
                                  Thêm vào giỏ hàng
                                </Button>
                                <Button variant="text">Chi tiết</Button>
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
