
import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/lovable-uploads/4d99c0ad-21cc-41e3-929d-a7a5717cb4c1.png"
        alt="MindAI Logo"
        className={`h-${size < 16 ? 8 : size < 24 ? 10 : 12} w-auto mr-2`}
      />
      <span className="font-bold text-xl tracking-tight">MindAI Protocol <span className="text-accent">Prototype</span></span>
    </div>
  );
};

export default Logo;
