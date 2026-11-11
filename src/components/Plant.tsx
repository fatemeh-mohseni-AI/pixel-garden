import { memo } from 'react';
import type { PlantStyle } from '../domain/garden';
import { PlantReactions, type PlantReaction } from './PlantReactions';

import { plantSprites } from './PlantSprites';

const crownHeight: Record<PlantStyle['stage'], number> = {
  sprout: 39,
  bush: 40,
  flowering: 20,
  tree: 9,
  rare: 4,
};

export const Plant = memo(function Plant({
  style,
  reaction,
}: {
  style: PlantStyle;
  reaction?: { kind: PlantReaction; revision: number };
}) {
  const Sprite = plantSprites[style.stage];
  const transform = style.flipped ? 'translate(88 0) scale(-1 1)' : undefined;
  return (
    <svg
      viewBox="0 0 88 96"
      data-plant-stage={style.stage}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="var(--plant-soil-shadow, #75647b)"
        opacity=".48"
        d="M14 88h10v-3h41v3h10v5H64v3H24v-3H14Z"
      />
      <path
        fill="var(--plant-soil-light, #ead7b4)"
        opacity=".68"
        d="M23 89h12v-2h20v2h12v4H23Z"
      />
      <g
        className={
          reaction?.kind === 'water' ? 'sprite sprite-watered' : 'sprite'
        }
        key={reaction?.revision}
      >
        <g transform={transform}>
          <Sprite {...style} />
        </g>
      </g>
      {reaction && (
        <PlantReactions
          key={reaction.revision}
          kind={reaction.kind}
          crown={crownHeight[style.stage]}
        />
      )}
      {style.fresh && (
        <path fill="#f6dd89" d="M73 75h3v3h3v3h-3v3h-3v-3h-3v-3h3Z" />
      )}
    </svg>
  );
});
