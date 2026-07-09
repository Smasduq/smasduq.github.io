'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

function activateVisibleElements() {
  document.querySelectorAll('.reveal:not(.active)').forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add('active');
    }
  });
}

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach((element) => {
        element.classList.add('active');
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -5% 0px',
      },
    );

    const observeElements = () => {
      document.querySelectorAll('.reveal').forEach((element) => {
        if (!element.dataset.revealObserved) {
          element.dataset.revealObserved = 'true';
          observer.observe(element);
        }
        if (isInViewport(element)) {
          element.classList.add('active');
        }
      });
    };

    observeElements();
    activateVisibleElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
      activateVisibleElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('scroll', activateVisibleElements, { passive: true });
    window.addEventListener('resize', activateVisibleElements);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', activateVisibleElements);
      window.removeEventListener('resize', activateVisibleElements);
      document.querySelectorAll('[data-reveal-observed]').forEach((element) => {
        delete element.dataset.revealObserved;
      });
    };
  }, [pathname]);

  return null;
}
