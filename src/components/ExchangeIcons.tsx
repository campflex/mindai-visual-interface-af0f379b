import React from "react";

type ExchangeType = "binance" | "huobi" | "okx" | "kucoin" | "uniswap" | "pancakeswap" | "quickswap";

interface ExchangeIconsProps {
  exchanges: ExchangeType[];
  className?: string;
}

const exchangeColors: Record<ExchangeType, string> = {
  binance: "#F3BA2F",
  huobi: "#1B9BE0",
  okx: "#000000",
  kucoin: "#24AE8F",
  uniswap: "#FF007A",
  pancakeswap: "#D1884F",
  quickswap: "#418AC9",
};

const exchangeLabels: Record<ExchangeType, string> = {
  binance: "B",
  huobi: "H",
  okx: "O",
  kucoin: "K",
  uniswap: "U",
  pancakeswap: "P",
  quickswap: "Q",
};

const ExchangeIcons: React.FC<ExchangeIconsProps> = ({ exchanges, className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {exchanges.map((exchange) => (
        <div
          key={exchange}
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ backgroundColor: exchangeColors[exchange] }}
          title={exchange.charAt(0).toUpperCase() + exchange.slice(1)}
        >
          {exchangeLabels[exchange]}
        </div>
      ))}
    </div>
  );
};

export default ExchangeIcons;
