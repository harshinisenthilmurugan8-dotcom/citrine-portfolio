import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect(strength);

  return (
    <div
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove as unknown as (e: ReactMouseEvent<HTMLDivElement>) => void}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="hover"
    >
      {children}
    </div>
  );
}
