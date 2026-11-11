export interface Expression {
  id: string;
  name: string;
  mood: string;
  description: string;
  imageUrl: string;
  eyeFocus: string;
  smileType: string;
  tags: string[];
}

export interface LightingRig {
  keyIntensity: number; // 0 to 100
  keyAngle: number; // 0 to 360 degrees
  keyTemperature: number; // 2700K (warm) to 6500K (cool)
  fillIntensity: number; // 0 to 100
  rimIntensity: number; // 0 to 100
  rimColor: string; // hex
  depthOfField: number; // 0 (crisp) to 100 (cinematic bokeh)
  vignette: number; // 0 to 100
  bloom: number; // 0 to 100
  volumetricDust: boolean;
}

export interface BackdropOption {
  id: string;
  name: string;
  bgClass: string;
  gradientStyle: string;
  description: string;
}

export interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  hsl: string;
  note: string;
}

export interface ExportSettings {
  format: 'square' | 'circle' | 'poster' | 'polaroid';
  resolution: '1x' | '2x';
  includeWatermark: boolean;
  borderStyle: 'none' | 'thin-white' | 'gold-rim';
}
