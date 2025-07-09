"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

interface CarouselItem {
 id: string;
 slug: string;
 judul: string;
 url_gambar: string;
}

const BeritaCarousel = () => {
 const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
  Autoplay({ delay: 10000, stopOnInteraction: true })
 ]);

 const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
 const [selectedIndex, setSelectedIndex] = useState(0);
 const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // State untuk hover

 const onDotButtonClick = useCallback((index: number) => {
  if (!emblaApi) return;
  emblaApi.scrollTo(index);
 }, [emblaApi]);

 useEffect(() => {
  if (!emblaApi) return;

  const onSelect = () => {
   if (!emblaApi) return;
   setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  setScrollSnaps(emblaApi.scrollSnapList());
  emblaApi.on('select', onSelect);
  onSelect();

   return () => {
    emblaApi.off('select', onSelect);
   }
 }, [emblaApi]);

 const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
 const [isLoading, setIsLoading] = useState(true);

 const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
 const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);

 useEffect(() => {
  const fetchCarouselData = async () => {
   try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/berita/carousel`);
    if (!res.ok) throw new Error('Gagal memuat data carousel');
    const data = await res.json();
    setCarouselData(data.data || []);
   } catch (error) {
    console.error(error);
   } finally {
    setIsLoading(false);
   }
  };
  fetchCarouselData();
 }, []);

 if (isLoading) {
  return <div className="text-center p-10 h-96 bg-gray-200 rounded-lg animate-pulse"></div>;
 }

 if (carouselData.length === 0) {
  return null;
 }

 return (
  <div className="relative">
   <div className="overflow-hidden rounded-lg" ref={emblaRef}>
    <div className="flex">
     {carouselData.map((item, index) => (
      <div
       className="relative flex-[0_0_100%]"
       key={item.id}
       onMouseEnter={() => setHoveredIndex(index)}
       onMouseLeave={() => setHoveredIndex(null)}
      >
       <Link href={`/berita/${item.slug}`}>
        <img
         src={item.url_gambar}
         alt={item.judul}
         className={`w-full h-64 md:h-96 object-cover transition-transform duration-300 ${
          hoveredIndex === index ? 'scale-105' : 'scale-100'
         }`}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
         <h2 className="text-white text-2xl md:text-3xl font-bold line-clamp-2">
          {item.judul}
         </h2>
        </div>
       </Link>
      </div>
     ))}
    </div>
   </div>

   <button
    className="absolute top-1/2 -translate-y-1/2 left-4 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
    onClick={scrollPrev}
    aria-label="Previous slide"
   >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
   </button>
   <button
    className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
    onClick={scrollNext}
    aria-label="Next slide"
   >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
   </button>

   <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
    {scrollSnaps.map((_, index) => (
     <button
      key={index}
      onClick={() => onDotButtonClick(index)}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
       index === selectedIndex ? 'bg-white scale-125' : 'bg-white/50'
      }`}
      aria-label={`Go to slide ${index + 1}`}
     />
    ))}
   </div>
  </div>
 );
};

export default BeritaCarousel;