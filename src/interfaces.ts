import { Nullable } from './types';
import { OrderTypes } from './enums';

export interface PrediqtMarketCardProps {
  id: string;
}
export interface RelatedMarketsProp {
  relatedMarkets: boolean;
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
  symbol: OrderTypes;
  timestamp: Date;
}

export interface ProcessedOrderBook {
  yes: Order[];
  no: Order[];
}

export interface Market {
  id: number;
  creator: string;
  resolver: string;
  resolution: string;
  resolutionMarketTime: number;
  ipfs: object;
  endOfMarketTime: number;
  isActive: boolean;
  isResolved: boolean;
  isVerified: boolean;
  isHidden: boolean;
  limitOrder: object;
  volume: Volume;
}

//////// MarketStateBadge

export interface MarketStateBadge {
  market: Market;
  isCardHovered: boolean;
}

export interface BadgeProps {
  isHovered: boolean;
}
