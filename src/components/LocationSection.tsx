import React from 'react';
import { VENUE_INFO } from '../data/billiardsData';
import { MapPin, Phone, Mail, Clock, MessageSquare, Compass, ShieldCheck, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-[#0a0a0a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-[1px] bg-[#b29762]"></div>
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
                  Sandton Location & Hours
                </span>
              </div>
              <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
                Visit <span className="italic text-[#b29762]">BSS</span>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Conveniently situated inside <strong className="text-white font-normal">The Boma Café</strong> in Paulshof, Sandton. Easily accessible from Witkoppen Road, N1 Western Bypass, Fourways, and Bryanston.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address Card */}
              <div className="p-5 bg-[#121212] border border-white/10 flex items-start space-x-4">
                <div className="p-2.5 border border-[#b29762] text-[#b29762] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Physical Address</h4>
                  <p className="text-white/70 text-xs mt-0.5 leading-relaxed">
                    {VENUE_INFO.location}
                  </p>
                  <a
                    href="https://maps.google.com/?q=The+Boma+Cafe+Paulshof+Sandton"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[10px] text-[#b29762] uppercase tracking-widest font-bold hover:underline mt-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-5 bg-[#121212] border border-white/10 flex items-start space-x-4">
                <div className="p-2.5 border border-[#b29762] text-[#b29762] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Direct Enquiries & Bookings</h4>
                  <a
                    href={`tel:${VENUE_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-[#b29762] hover:text-white text-sm font-bold block font-mono"
                  >
                    {VENUE_INFO.phone}
                  </a>
                  <a
                    href={`https://wa.me/${VENUE_INFO.whatsapp}?text=Hi%20BSS,%20I%20would%20like%20to%20reserve%20a%20table.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest hover:border-[#b29762] hover:text-[#b29762] mt-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#b29762]" />
                    <span>WhatsApp Reservations</span>
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="p-5 bg-[#121212] border border-white/10 flex items-start space-x-4">
                <div className="p-2.5 border border-[#b29762] text-[#b29762] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Operating Hours</h4>
                  <div className="space-y-1 text-xs text-white/70">
                    {VENUE_INFO.hours.map((h, idx) => (
                      <div key={idx} className="flex justify-between border-b border-white/10 pb-1">
                        <span className="text-white/40 uppercase text-[10px]">{h.days}:</span>
                        <strong className="text-[#b29762] font-mono">{h.time}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Map Canvas Simulation */}
          <div className="lg:col-span-7">
            <div className="relative border border-[#b29762]/30 bg-[#0a0a0a] h-[480px]">
              {/* Map Canvas Background */}
              <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                <iframe
                  title="BSS Sandton Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.823901416962!2d28.0432593!3d-26.0392357!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95738805f77861%3A0xa63d3e8ad6f56157!2sPaulshof%2C%20Sandton!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                ></iframe>
              </div>

              {/* Overlay Map Badge */}
              <div className="absolute top-6 left-6 p-4 bg-[#0a0a0a]/95 border border-[#b29762]/40 backdrop-blur-md max-w-xs shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#b29762] animate-ping"></div>
                  <div>
                    <h4 className="text-white font-serif italic text-sm">Basil's Billiards Supplier</h4>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest">Inside The Boma Café, Paulshof</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
