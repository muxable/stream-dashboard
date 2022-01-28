const MAX_ZOOM_LEVEL = 23;

export const heatmapLayer: any = {
  maxzoom: MAX_ZOOM_LEVEL,
  id: "heatmap",
  type: "heatmap",
  source: "bitrate",
  paint: {
    "heatmap-weight": {
      property: "bitrate",
      type: "exponential",
      stops: [
        [1, 0],
        [2500, 0.25],
        [5000, 0.5],
        [7500, 0.75],
        [10000, 1],
      ],
    },
    "heatmap-intensity": 1,
    "heatmap-color": [
      "interpolate",
      ["exponential", 0.5],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.2,
      "rgb(103,169,207)",
      0.4,
      "rgb(209,229,240)",
      0.6,
      "rgb(253,219,199)",
      0.8,
      "rgb(239,138,98)",
      1,
      "rgb(178,24,43)",
    ],
    "heatmap-radius": {
      stops: [
        [11, 10],
        [15, 5],
      ],
    },
    "heatmap-opacity": 1,
  },
};
