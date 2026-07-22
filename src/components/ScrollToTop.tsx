import { useEffect, useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Tailwind md 브레이크포인트 기준으로 PC/모바일 동작을 나눈다.
const DESKTOP_QUERY = '(min-width: 768px)';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
  );
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // PC에서는 항상 노출되므로 스크롤을 추적할 필요가 없다.
    if (isDesktop) return;

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastScrollY.current;
      const isNotAtTop = currentY > 200;

      setVisible(isScrollingUp && isNotAtTop);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shown = isDesktop || visible;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        'fixed h-12 w-12 bottom-8 right-8 z-50 rounded-full border border-border bg-white text-black shadow-lg cursor-pointer hover:bg-neutral-100',
        isDesktop
          ? 'transition-colors duration-200'
          : 'transition-all duration-300 ease-out'
      )}
      style={{
        opacity: shown ? 1 : 0,
        transform: `translateY(${shown ? '0' : '20px'})`,
        pointerEvents: shown ? 'auto' : 'none',
      }}
      aria-label="맨 위로 스크롤"
    >
      <ArrowUp className="size-6" />
    </Button>
  );
}
