import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/billiardsData';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = activeFilter === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#b29762] font-bold">
              Atmosphere & Aesthetics
            </span>
            <div className="w-8 h-[1px] bg-[#b29762]"></div>
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight">
            The BSS <span className="italic text-[#b29762]">Visual Experience</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base">
            Take a glimpse into our high-end lounge, championship slate tables, wood-fired gastronomy, and vibrant Sandton nightlife.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'tables', label: 'Billiards Tables' },
            { id: 'lounge', label: 'Executive Lounge' },
            { id: 'food', label: 'Gourmet Food' },
            { id: 'cocktails', label: 'Mixology' },
            { id: 'events', label: 'Tournaments' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#b29762] text-black shadow-md'
                  : 'bg-[#121212] text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-80 overflow-hidden cursor-pointer border border-white/10 hover:border-[#b29762]/60 transition-all duration-500 shadow-xl bg-[#121212]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 right-4 p-2 bg-[#0a0a0a]/80 border border-[#b29762] text-[#b29762] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#b29762]">
                  {item.category}
                </span>
                <h3 className="font-serif italic text-xl font-normal text-white group-hover:text-[#b29762] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 border border-white/20 text-white/60 hover:text-white z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 p-3 border border-white/20 text-white hover:border-[#b29762] hover:text-[#b29762] z-50 hidden sm:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 p-3 border border-white/20 text-white hover:border-[#b29762] hover:text-[#b29762] z-50 hidden sm:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-4">
            <img
              src={filteredGallery[lightboxIndex].imageUrl}
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[70vh] w-auto object-contain border border-[#b29762]/40 shadow-2xl"
            />
            <div className="text-center space-y-1 max-w-xl">
              <h3 className="font-serif italic text-2xl font-normal text-white">
                {filteredGallery[lightboxIndex].title}
              </h3>
              <p className="text-white/60 text-sm">
                {filteredGallery[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
