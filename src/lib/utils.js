import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';

/**
 * Utility function to merge Tailwind CSS classes
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Trigger confetti celebration effect
 * @param {Object} options - Confetti options
 */
export function triggerConfetti(options = {}) {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#c8ff00', '#ffffff', '#b3e600'],
  };

  confetti({
    ...defaults,
    ...options,
  });
}

/**
 * Trigger multiple confetti bursts
 */
export function triggerConfettiBurst() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#c8ff00', '#ffffff', '#b3e600'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#c8ff00', '#ffffff', '#b3e600'],
    });
  }, 250);
}

/**
 * Format currency in Indian Rupees
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format large numbers with Indian numbering system
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Debounce function to limit function execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 */
export function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

/**
 * Get random number in range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Preload images
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 * @returns {Promise} Promise that resolves when all images are loaded
 */
export function preloadImages(imageUrls) {
  const promises = imageUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  });
  return Promise.all(promises);
}
