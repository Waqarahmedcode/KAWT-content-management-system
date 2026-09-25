import React from 'react';

interface KawtLogoProps {
  variant?: 'full' | 'emblem' | 'horizontal' | 'white';
  size?: number | string;
  className?: string;
  showText?: boolean;
}

export const KawtLogo: React.FC<KawtLogoProps> = ({
  variant = 'full',
  size = 48,
  className = '',
  showText = true,
}) => {
  const isWhite = variant === 'white';
  const redColor = isWhite ? '#FFFFFF' : '#C3202F';
  const greenColor = isWhite ? '#FFFFFF' : '#0C7A4A';
  const textColor = isWhite ? '#FFFFFF' : '#14161A';

  // Vectorized exact emblem reflecting the uploaded KAWT LOGO H.jpeg:
  // - Deep red circular crescent outer rim with calligraphy motifs
  // - Forest green "KA" letters in center
  // - Stylized two clasped hands in compassionate mutual aid inside the KA letters
  const EmblemSvg = (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`inline-block flex-none select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Red Calligraphic Crescent Arc */}
      <path
        d="M 100,10 
           A 90,90 0 1,1 25,145
           A 75,75 0 0,0 85,185
           A 85,85 0 1,0 100,10 Z"
        fill={redColor}
      />

      {/* Decorative Crescent Calligraphic Marks & Dots */}
      <circle cx="50" cy="35" r="4" fill={redColor} />
      <circle cx="38" cy="48" r="3.5" fill={redColor} />
      <circle cx="28" cy="65" r="4" fill={redColor} />
      <circle cx="22" cy="85" r="4.5" fill={redColor} />
      <circle cx="20" cy="110" r="4.5" fill={redColor} />
      <circle cx="24" cy="135" r="4" fill={redColor} />
      
      {/* Crescent Tail Calligraphy Accents (Urdu Khidmat-e-Alam) */}
      <path
        d="M 40,140 C 45,160 65,178 95,188 C 75,184 55,170 42,152 Z"
        fill={redColor}
      />
      <path
        d="M 120,188 C 145,182 168,165 180,140 C 168,160 145,176 120,184 Z"
        fill={redColor}
      />

      {/* Inner Green KA Emblem Box */}
      <g stroke={greenColor} strokeWidth="6" strokeLinejoin="round" fill="none">
        {/* 'K' Letter Structure */}
        <path d="M 52,50 L 52,118 M 52,82 L 80,50 M 66,74 L 88,118" />
        
        {/* 'A' Letter Structure */}
        <path d="M 112,118 L 138,50 L 164,118 M 122,96 L 154,96" />
      </g>

      {/* Two Caring Clasped Hands (Solidarity & Healing) */}
      <g fill="none" stroke={isWhite ? '#FFFFFF' : '#14161A'} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Left hand extending inward */}
        <path d="M 48,78 C 65,74 88,72 108,82 C 114,84 122,86 128,80" />
        <path d="M 50,96 C 68,96 86,96 102,92" />
        <path d="M 98,82 C 104,70 118,65 126,72 C 132,77 128,88 120,94 C 112,100 100,105 88,105 C 76,105 68,98 74,90 C 80,82 92,80 106,85" fill={isWhite ? '#FFFFFF' : '#FFFFFF'} />
        
        {/* Right hand cradling and holding from underneath */}
        <path d="M 160,82 C 146,84 132,88 122,98 C 114,106 106,112 92,112 C 84,112 78,106 82,100" />
        <path d="M 158,98 C 144,100 130,106 116,114" />
      </g>
    </svg>
  );

  if (variant === 'emblem') {
    return EmblemSvg;
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {EmblemSvg}
        {showText && (
          <div className="flex flex-col">
            <span
              className="font-extrabold tracking-wider leading-none text-[15px]"
              style={{ color: textColor, fontFamily: 'Arial, -apple-system, sans-serif' }}
            >
              KHIDMAT-E-ALAM
            </span>
            <div
              className="h-[2px] w-full my-1"
              style={{ backgroundColor: redColor }}
            />
            <span
              className="font-bold tracking-widest text-[10.5px] uppercase"
              style={{ color: greenColor, fontFamily: 'Arial, -apple-system, sans-serif' }}
            >
              WELFARE TRUST
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default 'full' vertical layout (matches official letterhead & stamps)
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {EmblemSvg}
      {showText && (
        <div className="mt-2 flex flex-col items-center">
          <span
            className="font-extrabold tracking-wider text-[14px] leading-tight"
            style={{ color: textColor, letterSpacing: '0.08em' }}
          >
            KHIDMAT-E-ALAM
          </span>
          <div
            className="h-[2px] w-32 my-1"
            style={{ backgroundColor: redColor }}
          />
          <span
            className="font-bold tracking-widest text-[10.5px] uppercase"
            style={{ color: greenColor, letterSpacing: '0.15em' }}
          >
            WELFARE TRUST
          </span>
        </div>
      )}
    </div>
  );
};
