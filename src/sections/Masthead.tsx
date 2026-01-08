import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { agency, searchCategories } from '../data/siteData';

export default function Masthead() {
  const [category, setCategory] = useState('all');

  return (
    <Box sx={{ py: 3, position: 'relative' }}>
      <Container maxWidth="lg">
        <Stack spacing={3} className="reveal">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={2}
          >
            <Stack spacing={0.8} maxWidth={640}>
              <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: '0.18em' }}>
                {agency.tagline}
              </Typography>
              <Typography variant="h3">{agency.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {agency.fullName}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Badge badgeContent={2} color="warning">
                <Button variant="outlined" startIcon={<ShoppingCartOutlinedIcon />}>
                  Giỏ yêu cầu
                </Button>
              </Badge>
              <Stack direction="row" spacing={1}>
                <Chip label="VI" color="primary" />
                <Chip label="EN" variant="outlined" />
              </Stack>
            </Stack>
          </Stack>

          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
          >
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                {searchCategories.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              placeholder="Nhập từ khóa tìm kiếm"
              fullWidth
              sx={{ flex: 1, minWidth: 220 }}
            />
            <Button variant="contained" startIcon={<SearchIcon />}>
              Tìm kiếm
            </Button>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
