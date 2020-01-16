import { PrediqtGraph } from '@everipedia/prediqt-js';

import { dateToSeconds, abbreviateNumber, generateYesNoButtons, processOrderBook } from './utils';

import { Market } from './interfaces';

import { EOS_PRECISION } from './constants';

const apiGraph = new PrediqtGraph('https://prediqt-api-mainnet.azurewebsites.net/graphql');

export async function getMarket(marketId: string): Promise<Market | string> {
  try {
    const {
      id,
      creator,
      resolver,
      resolution,
      resolution_markettime: resolutionMarketTime,
      ipfs: { hash, title, description, image_url, category, tags, resolution_description },
      end_time: endTime,
      is_active: isActive,
      is_resolved: isResolved,
      is_verified: isVerified,
      is_hidden: isHidden,
      order_book: orderBook,
      volume,
    } = await apiGraph.getMarket(Number(marketId));

    return {
      id,
      creator: creator.name,
      resolver: resolver.name,
      resolution,
      resolutionMarketTime: resolutionMarketTime ? dateToSeconds(resolutionMarketTime) : null,
      ipfs: {
        hash,
        title,
        description,
        imageUrl: image_url,
        category,
        tags,
        resolutionDescription: resolution_description,
      },
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
