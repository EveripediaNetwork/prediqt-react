import { Nullable } from './types';

import { Order, OrderBook, ProcessedOrderBook } from './interfaces';

import { EOS_PRECISION } from './constants';
import {OrderTypes} from "./enums";

function sortOrdersDescendingByLimitPrice(currentOrder: Order, nextOrder: Order): number {
  return Number(nextOrder.limit.replace(" EOS", "")) - Number(currentOrder.limit.replace(" EOS", ""));
}

function isBid(typeStr: string): boolean {
  return typeStr.toUpperCase() === "BID";
}

export function dateToSeconds(date: Date): number {
  return Date.parse(date.toString()) / 1000;
}

export function abbreviateNumber(num: number, fixed = 0): string {
  if (!num) {
    return '0';
  }

  let precision = fixed;

  if (fixed < 0) {
    precision = 0;
  }

  const b = num.toPrecision(2).split('e');
  const k = b.length === 1 ? 0 : Math.floor(Math.min(Number(b[1].slice(1)), 14) / 3);
  const c = Number(k < 1 ? num.toFixed(precision) : (num / 10 ** (k * 3)).toFixed(1 + precision));
  const d = c < 0 ? c : Math.abs(c);
  return d + ['', 'K', 'M', 'B', 'T'][k];
}

export function generateYesNoButtons(processedOrderBook: ProcessedOrderBook): object {
  const orderBookNoToBuy = processedOrderBook?.yes && processedOrderBook.yes.length;
  const orderBookYesToBuy = processedOrderBook?.no && processedOrderBook.no.length;
  const noLimitOrderPrice =
    (orderBookNoToBuy &&
      1 - Number(processedOrderBook.yes.sort(sortOrdersDescendingByLimitPrice)[0]?.limit.replace(" EOS", ""))) || 0;
  const yesLimitOrderPrice =
    (orderBookYesToBuy &&
      1 - Number(processedOrderBook.no.sort(sortOrdersDescendingByLimitPrice)[0]?.limit.replace(" EOS", ""))) || 0;

  return {
    yesLimitOrderPrice: yesLimitOrderPrice ? (1 / Number(yesLimitOrderPrice)).toFixed(2) : 0,
    noLimitOrderPrice: noLimitOrderPrice ? (1 / Number(noLimitOrderPrice)).toFixed(2) : 0,
  };
}

export function processOrderBook(orderBook: OrderBook[]): ProcessedOrderBook {
  const processedOrderBook = {
    [OrderTypes.Yes]: [],
    [OrderTypes.No]: [],
  };

  orderBook.forEach(({ order_id, creator, price, currency, quantity, type, symbol, timestamp }) => {
    processedOrderBook[symbol.toLowerCase()].push({
      id: order_id,
      creator,
      createdTimestamp: dateToSeconds(timestamp),
      limit: `${price.toFixed(4)} ${currency}`,
      quantity: quantity / EOS_PRECISION,
      isBid: isBid(type) ? 1 : 0,
    });
  });
  return processedOrderBook;
}
