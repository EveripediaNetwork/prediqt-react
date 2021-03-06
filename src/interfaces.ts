import { Nullable } from './types';
import { LastTradeBarLineColors, OrderTypes, OrderTypesUppercase } from './enums';

export interface MarketCardProps {
  id: string;
}

export interface BackgroundImageProps {
  backgroundURL: string;
}

export interface LinkToFilterMarketsProps {
  isRelatedMarket: boolean;
  param: {
    type: string;
    value: string;
  };
  className?: string;
}

export interface LastTradeBarProps {
  params: LastTrade;
  className?: string;
}

export interface IconProps {
  size?: number | string;
  height?: number | string;
  width?: number | string;
  className?: string;
}

export interface RelatedMarketProp {
  isRelatedMarket: boolean;
}

export interface CardTitleProps extends RelatedMarketProp {
  isLastTradeBar: boolean;
}

export interface LastTradeBarLineProp {
  color: LastTradeBarLineColors;
  transform: number;
}

interface Volume {
  abbreviatedEos: string;
  eos: number;
  isTrending: boolean;
}

export interface Order {
  id: number;
  creator: string;
  createdTimestamp: Nullable<number>;
  limit: string;
  quantity: number;
  isBid: number;
}

export interface OrderBook {
  order_id: number;
  creator: string;
  price: number;
  currency: string;
  type: string;
  quantity: number;
  symbol: OrderTypesUppercase;
  timestamp: Date;
}

export interface ProcessedOrderBook {
  [OrderTypes.Yes]: Order[];
  [OrderTypes.No]: Order[];
}

export interface LimitOrder {
  yesLimitOrderPrice: number;
  noLimitOrderPrice: number;
}

export interface LastTrade {
  price: number;
  symbol: string;
}

export interface Ipfs {
  hash: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  resolutionDescription: string;
}

export interface Market {
  id: number;
  creator: string;
  resolver: string;
  resolution: string;
  resolutionMarketTime: Nullable<number>;
  ipfs: Ipfs;
  endOfMarketTime: number;
  isActive: boolean;
  isResolved: boolean;
  isVerified: boolean;
  isHidden: boolean;
  limitOrder: LimitOrder;
  lastTrade: Nullable<LastTrade>;
  volume: Volume;
}

//////// MarketStateBadge

export interface MarketStateBadgeProps {
  market: Market;
  isCardHovered: boolean;
}

export interface BadgeProps {
  isHovered: boolean;
}
