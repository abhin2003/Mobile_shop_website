import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Brands from '@/components/Brands';
import FinanceOptions from '@/components/FinanceOptions';
import AdminOffers from '@/components/AdminOffers';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Brands />
        <FinanceOptions />
        <AdminOffers />
        <Gallery />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
