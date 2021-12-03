const MAX_ZOOM_LEVEL = 12;

export const heatmapLayer: any = {
  maxzoom: MAX_ZOOM_LEVEL,
  type: "heatmap",
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      1,
      5,
      3,
      9,
      6,
    ],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["exponential", 0.5],
      ["heatmap-density"],
      0,
      "rgba(8, 81, 156,0)",
      0.2,
      "rgb(49, 130, 189)",
      0.4,
      "rgb(107, 174, 214)",
      0.6,
      "rgb(158, 202, 225)",
      0.8,
      "rgb(198, 219, 239)",
      1,
      "rgb(239, 243, 255)",
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": 3,
    // Transition from heatmap to circle layer by zoom level
    "heatmap-opacity": 1,
  },
};
