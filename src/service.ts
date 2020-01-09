import { PrediqtGraph } from '@everipedia/prediqt-js';

import { dateToSeconds, abbreviateNumber, generateYesNoButtons, processOrderBook } from './utils';

import { EOS_PRECISION } from './constants';

const apiGraph = new PrediqtGraph('https://prediqt-api-mainnet.azurewebsites.net/graphql');

export async function getMarkets(limit: number, category?: string) {
  let filters = null;
  if (category) {
    filters = {
      paramName: 'category',
      paramValue: category,
    };
  }

  try {
    const [
      {
        id,
        creator,
        resolver,
        resolution,
        resolution_markettime: resolutionMarketTime,
        ipfs,
        end_time: endTime,
        is_active: isActive,
        is_resolved: isResolved,
        is_verified: isVerified,
        is_hidden: isHidden,
        order_book: orderBook,
        volume,
      },
    ] = await apiGraph.getMarkets(true, 0, limit, 'true', 'prediqtbottt', filters);

    return {
      id,
      creator: creator.name,
      resolver: resolver.name,
      resolution,
      resolutionMarketTime: dateToSeconds(resolutionMarketTime),
      ipfs,
      endOfMarketTime: dateToSeconds(endTime),
      isActive,
      isResolved,
      isVerified,
      isHidden,
      volume: {
        abbreviatedEos: abbreviateNumber(volume.eos / EOS_PRECISION),
        eos: volume.eos,
        isTrending: volume.eos >= EOS_PRECISION * 100, // TODO replace with real condition ( > 100 EOS)
      },
      limitOrder: generateYesNoButtons(processOrderBook(orderBook)),
    };
  } catch (error) {
    return error.message || 'Unknown error has occurred.';
  }
}
