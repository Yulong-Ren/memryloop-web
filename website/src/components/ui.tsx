import type { ReactNode } from 'react';
import { P } from '../design/tokens';

interface BtnProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}

export function Btn({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled,
}: BtnProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all duration-150 cursor-pointer select-none no-underline';
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  const variants = {
    primary: 'text-white hover:opacity-90 active:scale-[0.98]',
    secondary: 'bg-[#f0efff] text-[#5B4DFF] hover:bg-[#e5e3ff] active:scale-[0.98]',
    outline:
      'bg-white border border-[rgba(0,0,0,0.12)] text-[#0a0a0a] hover:border-[rgba(0,0,0,0.2)] active:scale-[0.98]',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} style={variant === 'primary' ? { background: P } : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-50`}
      style={variant === 'primary' ? { background: P } : undefined}
    >
      {children}
    </button>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold leading-4"
      style={{ background: '#f0efff', color: P }}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[1.2px]"
      style={{ color: P }}
    >
      {children}
    </span>
  );
}
