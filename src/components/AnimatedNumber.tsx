// src/components/AnimatedNumber.tsx
"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface AnimatedNumberProps {
  toValue: number;
}

const AnimatedNumber = ({ toValue }: AnimatedNumberProps) => {
  const nodeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Ambil nilai awal dari teks yang ada atau mulai dari 0
    const fromValue = parseInt(node.textContent || "0", 10);

    const controls = animate(fromValue, toValue, {
      duration: 1, // Durasi animasi 1 detik
      onUpdate(value) {
        // Update teks pada elemen dengan angka yang dianimasikan (dibulatkan)
        node.textContent = value.toFixed(0);
      }
    });

    // Hentikan animasi saat komponen di-unmount
    return () => controls.stop();
  }, [toValue]); // Jalankan ulang animasi setiap kali 'toValue' berubah

  return <p ref={nodeRef} />;
};

export default AnimatedNumber;