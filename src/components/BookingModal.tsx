import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BilliardTable, BookingFormData } from '../types';
import { BILLIARD_TABLES, VENUE_INFO } from '../data/billiardsData';
import { CheckCircle2, X, MessageSquare, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedTableId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedTableId
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [refCode, setRefCode] = useState<string>('');

  const [formData, setFormData] = useState<BookingFormData>({
    bookingType: 'table',
    tableId: preSelectedTableId || 'table-championship-1',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:00',
    guests: 4,
    durationHours: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    preOrders: []
  });

  if (!isOpen) return null;

  const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, tableId: e.target.value });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = 'BSS-' + Math.floor(100000 + Math.random() * 900000);
    setRefCode(generatedRef);
    setStep(3);

    // Launch luxury confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#b29762', '#ffffff', '#0a0a0a']
    });
  };

  const selectedTableObj = BILLIARD_TABLES.find(t => t.id === formData.tableId);

  const getWhatsAppBookingUrl = () => {
    const text = `Hello Basil's Billiards Supplier (BSS)!%0A%0AI would like to confirm my table reservation:%0A• *Ref Code:* ${refCode}%0A• *Name:* ${formData.name}%0A• *Table:* ${selectedTableObj?.name || 'General Billiards'}%0A• *Date:* ${formData.date} at ${formData.time}%0A• *Guests:* ${formData.guests} Guests%0A• *Duration:* ${formData.durationHours} Hours%0A• *Phone:* ${formData.phone}%0A${formData.specialRequests ? `• *Special Requests:* ${formData.specialRequests}` : ''}`;
    return `https://wa.me/${VENUE_INFO.whatsapp}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto duration-200" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <div className="bg-[#0a0a0a] border border-[#b29762]/40 max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8 space-y-6 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 border border-white/20 text-white/60 hover:text-white hover:border-[#b29762]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              Instant Reservation Engine
            </span>
          </div>
          <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-white">
            {step === 3 ? 'Reservation Confirmed' : "Reserve Your Table at BSS"}
          </h3>
          <p className="text-white/60 text-xs sm:text-sm">
            Inside The Boma Café, Paulshof, Sandton • Direct WhatsApp & Phone 084 574 8577
          </p>
        </div>

        {/* Progress Bar */}
        {step !== 3 && (
          <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest font-bold text-white/40 border-b border-white/10 pb-4">
            <span className={step === 1 ? 'text-[#b29762]' : 'text-white'}>
              1. Date & Table Selection
            </span>
            <span>→</span>
            <span className={step === 2 ? 'text-[#b29762]' : ''}>
              2. Guest Details
            </span>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Booking Category */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'table', label: 'Billiards Table' },
                { id: 'dining', label: 'Dining & Food' },
                { id: 'vip_lounge', label: 'VIP Lounge Suite' },
                { id: 'corporate', label: 'Corporate Event' }
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, bookingType: type.id as any })}
                  className={`py-2.5 px-3 text-[10px] uppercase font-bold tracking-widest border transition-all ${
                    formData.bookingType === type.id
                      ? 'bg-[#b29762] text-black border-[#b29762]'
                      : 'bg-[#121212] text-white/60 border-white/10 hover:border-[#b29762]'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Select Specific Table */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">
                Choose Preferred Table / Lounge Area
              </label>
              <select
                value={formData.tableId}
                onChange={handleTableChange}
                className="w-full py-3 px-4 bg-[#121212] border border-white/10 text-white text-sm focus:border-[#b29762] outline-none"
              >
                {BILLIARD_TABLES.map((table) => (
                  <option key={table.id} value={table.id} className="bg-[#121212] text-white">
                    {table.name} ({table.hourlyRate})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Table Preview */}
            {selectedTableObj && (
              <div className="p-4 bg-[#121212] border border-white/10 text-xs space-y-2">
                <div className="flex justify-between font-bold text-white">
                  <span className="font-serif italic text-sm">{selectedTableObj.name}</span>
                  <span className="text-[#b29762] font-mono">{selectedTableObj.hourlyRate}</span>
                </div>
                <p className="text-white/60">{selectedTableObj.description}</p>
              </div>
            )}

            {/* Date, Time, Players Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full py-2.5 px-3 bg-[#121212] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Time Slot</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full py-2.5 px-3 bg-[#121212] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
                >
                  <option value="12:00" className="bg-[#121212]">12:00 PM (Lunch)</option>
                  <option value="14:00" className="bg-[#121212]">02:00 PM</option>
                  <option value="16:00" className="bg-[#121212]">04:00 PM</option>
                  <option value="18:00" className="bg-[#121212]">06:00 PM (Early Evening)</option>
                  <option value="19:00" className="bg-[#121212]">07:00 PM (Prime Time)</option>
                  <option value="20:30" className="bg-[#121212]">08:30 PM</option>
                  <option value="22:00" className="bg-[#121212]">10:00 PM (Late Lounge)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Guests / Players</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full py-2.5 px-3 bg-[#121212] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((n) => (
                    <option key={n} value={n} className="bg-[#121212]">{n} Guests</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#b29762] text-black font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-md"
            >
              Continue to Guest Details →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Van Der Merwe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-2.5 px-3 bg-[#121212] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 084 574 8577"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full py-2.5 px-3 bg-[#121212] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. david@example.co.za"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full py-2.5 px-3 bg-[#121212] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block">Special Requests / Occasion</label>
              <textarea
                rows={2}
                placeholder="e.g. Birthday celebration, Tomahawk steak pre-order, preferred sofa seating..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full py-2.5 px-3 bg-[#121212] border border-white/10 text-white text-xs focus:border-[#b29762] outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 border border-white/20 text-white/70 text-[10px] font-bold uppercase tracking-widest hover:border-white hover:text-white"
              >
                ← Back
              </button>

              <button
                type="submit"
                className="flex-1 py-3.5 bg-[#b29762] text-black font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-md"
              >
                Confirm Reservation & Generate Ref
              </button>
            </div>
          </form>
        )}

        {/* STEP 3 - SUCCESS CONFIRMATION */}
        {step === 3 && (
          <div className="text-center space-y-6 py-4 duration-300 max-w-lg mx-auto" style={{ animation: 'zoomIn 0.3s ease-out' }}>
            <div className="w-16 h-16 border border-[#b29762] text-[#b29762] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#b29762]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#b29762] uppercase tracking-widest font-mono">
                Booking Reference: {refCode}
              </span>
              <h4 className="font-serif italic text-2xl font-normal text-white">
                We're Ready to Welcome You, {formData.name}!
              </h4>
              <p className="text-white/70 text-xs sm:text-sm max-w-md mx-auto">
                Your reservation request for <strong>{selectedTableObj?.name}</strong> on <strong>{formData.date} at {formData.time}</strong> has been logged.
              </p>
            </div>

            {/* Direct WhatsApp Confirmation CTA */}
            <div className="p-4 bg-[#121212] border border-white/10 text-left space-y-3">
              <div className="flex items-center space-x-2 text-[#b29762] text-xs font-bold">
                <Sparkles className="w-4 h-4 text-[#b29762]" />
                <span className="uppercase tracking-wider text-[10px]">Instant Mobile Confirmation via WhatsApp</span>
              </div>
              <p className="text-white/60 text-xs">
                Send your pre-filled reference code directly to our reservations team at <strong>084 574 8577</strong> for instant table allocation:
              </p>

              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#b29762] text-black font-bold text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2 transition-all hover:bg-white"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send WhatsApp Confirmation (084 574 8577)</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="py-2.5 px-6 border border-white/20 text-white/60 hover:text-white text-[10px] uppercase tracking-widest font-bold"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
