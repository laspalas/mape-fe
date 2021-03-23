import React from 'react';
import hexAlpha from 'hex-alpha';

export const legendValues = {
  SAFEST_GREEN: {
    color: '#008000',
    min_value: 0.8,
    max_value: 1,
    text: 'Najsigurnije',
  },
  YELLOW: {
    color: '#FFFF00',
    min_value: 0.6,
    max_value: 0.8,
  },
  ORANGE: {
    color: '#FFA500',
    min_value: 0.4,
    max_value: 0.6,
  },
  RED: {
    color: '#FF0000',
    min_value: 0.2,
    max_value: 0.4,
  },
  BLACK: {
    color: '#000000',
    min_value: 0,
    max_value: 0.2,
    text: 'Najmanje sigurno',
  },
  NOT_RATED: {
    color: '#808080',
    text: 'Neocenjeno',
  },
};

function range(start, end) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

const StarIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill={color}
      class="bi bi-star-fill"
      viewBox="0 0 16 16"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
};

const Legend = () => {
  return (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
      {Object.keys(legendValues).map((key, idx) => {
        return (
          <div
            style={{
              background: `${hexAlpha(legendValues[key].color, 0.5)}`,
              minHeight: '30px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '5px',
              color: 'black',
              fontWeight: '600',
            }}
          >
            <div
              style={{
                minWidth: '100px',
                height: '8px',
                background: legendValues[key].color,
                opacity: 1,
              }}
            ></div>
            <div style={{ marginLeft: '10px' }}>
              {range(0, 4 - idx).map(() => {
                return <StarIcon color={legendValues[key].color} />;
              })}
            </div>
            <div style={{ alignSelf: 'flex-end', flex: 1, textAlign: 'right' }}>
              {legendValues[key].text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Legend };
