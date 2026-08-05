import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { TableShowcase } from './components/TableShowcase';
import { FoodSection } from './components/FoodSection';
import { BarSection } from './components/BarSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { VipClubSection } from './components/VipClubSection';
import { DigitalGuestbook } from './components/DigitalGuestbook';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { QuickCallFloat } from './components/QuickCallFloat';
import { LuxuryCursor } from './components/LuxuryCursor';
import { GoldThreadProgressBar } from './components/GoldThreadProgressBar';
import { ProTipToast } from './components/ProTipToast';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTableForBooking, setSelectedTableForBooking] = useState<string | undefined>(undefined);

  const handleOpenBooking = (tableId?: string) => {
    setSelectedTableForBooking(tableId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedTableForBooking(undefined);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col font-sans selection:bg-[#b29762] selection:text-black">
      {/* Editorial Metallic Gold Scroll Progress Bar */}
      <GoldThreadProgressBar />

      {/* Luxury Custom Cursor */}
      <LuxuryCursor />

      {/* Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <AboutSection onOpenBooking={() => handleOpenBooking()} />
        <WhyChooseUs />
        <ServicesSection />
        <TableShowcase onSelectTableForBooking={(tableId) => handleOpenBooking(tableId)} />
        <FoodSection />
        <BarSection />
        <EventsSection onOpenBooking={() => handleOpenBooking()} />
        <GallerySection />
        <TestimonialsSection />
        <VipClubSection />
        <DigitalGuestbook />
        <FaqSection />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Mobile Floating Call/Book Bar */}
      <QuickCallFloat onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preSelectedTableId={selectedTableForBooking}
      />

      {/* Billiard Mastery Pro Tip Toast System */}
      <ProTipToast />
    </div>
  );
}
