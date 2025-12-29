import React from "react";

interface DashboardLogoProps {
  size?: number;
  className?: string;
}

const DashboardLogo: React.FC<DashboardLogoProps> = ({ size = 32, className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/lovable-uploads/morpheus-hub-logo.png"
        alt="MorpheusHub Logo"
        className={`h-${size < 16 ? 8 : size < 24 ? 10 : 12} w-auto mr-2`}
      />
      <span className="font-bold text-xl tracking-tight">MIND Agents Dashboard</span>
    </div>
  );
};

export default DashboardLogo;
