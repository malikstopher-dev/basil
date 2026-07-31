import React, { useState } from 'react';
import { BILLIARD_TABLES } from '../data/billiardsData';
import { BilliardTable } from '../types';
import { Table3DVisualization } from './Table3DVisualization';
import { Calendar, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface TableShowcaseProps {
  onSelectTableForBooking: (tableId: string) => void;
}

export const TableShowcase: React.FC<TableShowcaseProps> = ({ onSelectTableForBooking }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'championship' | 'english' | 'vip' | 'patio'>('all');
  const [selectedTableModal, setSelectedTableModal] = useState<BilliardTable | null>(null);

  const filteredTables = activeTab === 'all'
    ? BILLIARD_TABLES
    : BILLIARD_TABLES.filter(t => t.category === activeTab);

  return (
    <section id="tables" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-[1px] bg-[#b29762]"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
                Tournament & Lounge Specs
              </span>
            </div>

            <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
              Premium Billiards <span className="italic text-[#b29762]">Tables</span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base">
              Hand-selected imported slate, Hainsworth Match wool, and shadowless LED perimeter illumination. Each table delivers consistent roll speed and unmatched responsiveness.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#121212] border border-white/10">
            {[
              { id: 'all', label: 'All Tables' },
              { id: 'championship', label: 'Championship 9ft' },
              { id: 'vip', label: 'Executive VIP' },
              { id: 'english', label: 'English 8-Ball' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#b29762] text-black shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* High-Fidelity 3D Interactive Table Craftsmanship Inspector */}
        <Table3DVisualization onReserveClick={() => onSelectTableForBooking(filteredTables[0]?.id || 't1')} />

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className="group bg-[#121212] border border-white/10 hover:border-[#b29762]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={table.imageUrl}
                    alt={table.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />

                  {table.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#b29762] text-black text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {table.badge}
                    </div>
                  )}

                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#0a0a0a] border border-[#b29762] text-[#b29762] text-[11px] font-mono font-bold shadow-lg">
                    {table.hourlyRate}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif italic text-2xl font-normal text-white drop-shadow-md">
                      {table.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body & Specs */}
                <div className="p-6 space-y-4">
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    {table.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 px-4 bg-[#0a0a0a] border border-white/10 text-xs">
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">Cloth Spec</span>
                      <span className="text-white font-medium text-xs">{table.clothColor}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">Slate Thickness</span>
                      <span className="text-white font-medium text-xs">{table.slateThickness}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">Canopy Lighting</span>
                      <span className="text-[#b29762] font-medium text-xs">{table.lighting}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">Capacity</span>
                      <span className="text-[#b29762] font-medium text-xs">{table.capacity}</span>
                    </div>
                  </div>

                  {/* Included Amenities List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-[#b29762] uppercase tracking-widest block">Included Privileges</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {table.features.map((feat, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-white/70">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#b29762] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => onSelectTableForBooking(table.id)}
                  className="flex-1 py-3 px-4 bg-[#b29762] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table</span>
                </button>

                <button
                  onClick={() => setSelectedTableModal(table)}
                  className="py-3 px-3 border border-white/20 text-white/80 hover:text-[#b29762] hover:border-[#b29762] text-xs font-semibold transition-colors flex items-center justify-center"
                  title="View Details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0a0a0a] border border-[#b29762]/40 max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#b29762]">Table Specifications</span>
                <h3 className="font-serif italic text-2xl font-normal text-white mt-1">
                  {selectedTableModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTableModal(null)}
                className="text-white/60 hover:text-white p-1 border border-white/20"
              >
                ✕
              </button>
            </div>

            <img
              src={selectedTableModal.imageUrl}
              alt={selectedTableModal.name}
              className="w-full h-48 object-cover border border-white/10"
            />

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              {selectedTableModal.description}
            </p>

            <div className="space-y-2 text-xs text-white/80 bg-[#121212] p-4 border border-white/10">
              <div className="flex justify-between"><span className="text-white/40 uppercase text-[10px]">Rate:</span> <strong className="text-[#b29762]">{selectedTableModal.hourlyRate}</strong></div>
              <div className="flex justify-between"><span className="text-white/40 uppercase text-[10px]">Slate:</span> <span>{selectedTableModal.slateThickness}</span></div>
              <div className="flex justify-between"><span className="text-white/40 uppercase text-[10px]">Cloth:</span> <span>{selectedTableModal.clothColor}</span></div>
              <div className="flex justify-between"><span className="text-white/40 uppercase text-[10px]">Lighting:</span> <span>{selectedTableModal.lighting}</span></div>
              {selectedTableModal.minSpend && (
                <div className="flex justify-between text-[#b29762]"><span className="text-white/40 uppercase text-[10px]">Min Spend:</span> <span>{selectedTableModal.minSpend}</span></div>
              )}
            </div>

            <button
              onClick={() => {
                const id = selectedTableModal.id;
                setSelectedTableModal(null);
                onSelectTableForBooking(id);
              }}
              className="w-full py-3.5 bg-[#b29762] text-black font-bold uppercase text-[11px] tracking-widest hover:bg-white transition-all shadow-lg"
            >
              Book This Table Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
