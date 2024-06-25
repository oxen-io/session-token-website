import { REVALIDATIONS } from '@/lib/constants';
import StatsTiles from './StatsTiles';

async function getData(): Promise<string | null> {
  let response: Response | null = null;

  try {
    response = await fetch(`${process.env.DATA_API}/nodes/count`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DATA_API_KEY}`,
      },
      method: 'GET',
      next: { revalidate: REVALIDATIONS['30S'] },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed. Data API status: ${response.status}`);
    }

    const { nodeCount } = await response.json();
    return String(nodeCount);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`internal ${response?.status || ''} error from Data API. Error ${err}`);
    return null;
  }
}

export type StatTile = {
  figure: string;
  copy: string;
  backgroundImage: any;
};

export default async function StatsTilesServer(props: { tiles: Array<StatTile> }) {
  const nodeCount = await getData();
  const tiles: Array<StatTile> = props.tiles.map((tile) => {
    if (nodeCount && tile.copy === 'Nodes') {
      return { ...tile, figure: nodeCount };
    }
    return tile;
  });

  return <StatsTiles tiles={tiles} />;
}
