import { useEffect, useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastScrollY.current;
      const isNotAtTop = currentY > 200;

      setVisible(isScrollingUp && isNotAtTop);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg transition-all duration-300 ease-out cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? '0' : '20px'})`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-label="맨 위로 스크롤"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
