import { useState, useEffect, useRef } from 'react';

// `blur` is opt-in: it adds a de-focus to the hidden state so the element
// resolves INTO frame rather than just sliding. Used by the stacked-card
// landing page; every existing caller keeps the original slide-only reveal.
const FadeUp = ({ children, delay = 0, className = "", threshold = 0.15, blur = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? `opacity-100 translate-y-0${blur ? ' blur-0' : ''}`
          : `opacity-0 translate-y-8${blur ? ' blur-[6px]' : ''}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeUp;
