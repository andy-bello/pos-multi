import React from 'react';

export default function Logo({ size = 90 }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <img
          src={'/logo_multiandamios.jpg'}
          alt="Logo MultiAndamios"
          style={{ width: '80%', height: size, objectFit: 'scale-down', maxWidth: 180, marginBottom: 2, background: 'transparent' }}
        />
      </div>
      <span className="mt-1 text-base font-extrabold tracking-widest text-[#000000] w-full text-center break-words leading-tight" style={{ letterSpacing: 1, wordBreak: 'break-word' }}>
        MULTIANDAMIOS
      </span>
    </div>
  );
}
