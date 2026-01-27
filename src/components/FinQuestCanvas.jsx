/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { preloadImages } from '../lib/utils';

const FinQuestCanvas = () => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const frameCount = 192;

  const currentFrame = (index) =>
    `/assets/sequence/frame_${index.toString().padStart(3, '0')}.jpg`;

  useEffect(() => {
    // Generate array of image URLs
    const imageUrls = [];
    for (let i = 0; i < frameCount; i++) {
      imageUrls.push(currentFrame(i));
    }

    // Preload images
    const loadImages = async () => {
      const loadedImages = [];
      let loaded = 0;

      for (const url of imageUrls) {
        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = () => {
              loaded++;
              setLoadProgress((loaded / frameCount) * 100);
              resolve();
            };
            img.onerror = () => {
              // If image fails to load, create a placeholder
              loaded++;
              setLoadProgress((loaded / frameCount) * 100);
              resolve();
            };
            img.src = url;
          });
          loadedImages.push(img);
        } catch (error) {
          console.error(`Failed to load image: ${url}`);
          // Create placeholder image
          const placeholder = new Image();
          loadedImages.push(placeholder);
        }
      }

      setImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    
    // Set canvas size for high-DPI displays
    const setCanvasSize = () => {
      const displayWidth = canvas.offsetWidth;
      const displayHeight = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      
      context.scale(dpr, dpr);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Render frame based on scroll position
    const renderFrame = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => {
        const img = images[frameIndex];
        if (img && img.complete) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          
          // Calculate scaling to cover canvas while maintaining aspect ratio
          const canvasAspect = canvas.offsetWidth / canvas.offsetHeight;
          const imgAspect = img.width / img.height;
          
          let drawWidth, drawHeight, offsetX, offsetY;
          
          if (canvasAspect > imgAspect) {
            drawWidth = canvas.offsetWidth;
            drawHeight = drawWidth / imgAspect;
            offsetX = 0;
            offsetY = (canvas.offsetHeight - drawHeight) / 2;
          } else {
            drawHeight = canvas.offsetHeight;
            drawWidth = drawHeight * imgAspect;
            offsetX = (canvas.offsetWidth - drawWidth) / 2;
            offsetY = 0;
          }
          
          context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      });
    };

    // Initial render
    renderFrame();

    // Update on scroll
    window.addEventListener('scroll', renderFrame);

    return () => {
      window.removeEventListener('scroll', renderFrame);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [images, imagesLoaded]);

  return (
    <div className="relative w-full h-screen">
      {!imagesLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark z-10">
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            Loading animation... {Math.round(loadProgress)}%
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-dark" />
    </div>
  );
};

export default FinQuestCanvas;
