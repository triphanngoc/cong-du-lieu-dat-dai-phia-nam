import { Box } from '@mui/material';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import MapAccess from './sections/MapAccess';
import MainNav from './sections/MainNav';
import Masthead from './sections/Masthead';
import NewsSection from './sections/NewsSection';
import ProductCatalog from './sections/ProductCatalog';
import ServiceHighlights from './sections/ServiceHighlights';
import StatsSection from './sections/StatsSection';
import SystemOverview from './sections/SystemOverview';
import TopBar from './sections/TopBar';

export default function App() {
  return (
    <Box className="page">
      <TopBar />
      <Masthead />
      <MainNav />
      <Hero />
      <MapAccess />
      <ServiceHighlights />
      <ProductCatalog />
      <SystemOverview />
      <NewsSection />
      <StatsSection />
      <Footer />
    </Box>
  );
}
