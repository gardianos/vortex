'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {});

    return () => {
      ctx.current?.revert();
    };
  }, []);

  return ctx;
};

export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement | null>,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.fromTo(
      element,
      { opacity: 0, y: 50, ...animation },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...triggerOptions,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ref, animation, triggerOptions]);
};

export const useParallax = (
  ref: React.RefObject<HTMLElement | null>,
  speed: number = 0.5
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      y: () => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top top',
        end: 'max',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ref, speed]);
};

export const useTextReveal = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const text = element.textContent || '';

    // Split text into characters
    element.innerHTML = text
      .split('')
      .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const chars = element.querySelectorAll('.char');

    gsap.fromTo(
      chars,
      { opacity: 0, y: 50, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      element.textContent = text;
    };
  }, [ref]);
};

export default useGSAP;
