import { Expression, BackdropOption, ColorSwatch, LightingRig } from '../types';

export const CHARACTER_NAME = "Maya Lin-Walker";
export const CHARACTER_TITLE = "Pixar-Style 3D Character Portrait";

export const EXPRESSIONS: Expression[] = [
  {
    id: 'warm-smile',
    name: 'Warm Smile',
    mood: 'Friendly & Welcoming',
    description: 'Signature gentle grin with bright sparkling hazel-brown eyes, displaying warmth and childlike enthusiasm.',
    imageUrl: '/src/assets/images/character_portrait_main_1794380735421.jpg',
    eyeFocus: 'Direct to Camera',
    smileType: 'Gentle Open Smile',
    tags: ['Hero Shot', 'Signature', 'Warm'],
  },
  {
    id: 'curious',
    name: 'Curious Spark',
    mood: 'Inquisitive & Witty',
    description: 'Playful three-quarter head tilt with an energetic smirk and golden hoop accessories.',
    imageUrl: '/src/assets/images/character_portrait_curious_1794380736127.jpg',
    eyeFocus: 'Slightly Off-Axis',
    smileType: 'Knowing Grin',
    tags: ['Three-Quarter', 'Dynamic', 'Bright'],
  },
  {
    id: 'joy-laugh',
    name: 'Pure Joy',
    mood: 'Ecstatic & Joyful',
    description: 'Enthusiastic open-mouthed laughter, radiant cheeks with natural freckles and joyful eye crinkles.',
    imageUrl: '/src/assets/images/character_portrait_laughing_1794380737501.jpg',
    eyeFocus: 'Direct to Lens',
    smileType: 'Hearty Laugh',
    tags: ['High Energy', 'Heartwarming', 'Spontaneous'],
  },
  {
    id: 'thinking',
    name: 'Adventurous Smirk',
    mood: 'Clever & Contemplative',
    description: 'Thoughtful gaze looking upwards with a sly explorer smirk, inspired by curiosity and discovery.',
    imageUrl: '/src/assets/images/character_portrait_thinking_1794380737129.jpg',
    eyeFocus: 'Upwards Right',
    smileType: 'Pensive Smirk',
    tags: ['Explorer', 'Inspirational', 'Cinematic'],
  },
];

export const BACKDROPS: BackdropOption[] = [
  {
    id: 'cream-studio',
    name: 'Cream Studio',
    bgClass: 'bg-[#F4ECE1]',
    gradientStyle: 'radial-gradient(circle at 50% 40%, #FFFDF9 0%, #F5ECDD 60%, #E9DFC9 100%)',
    description: 'Authentic warm cream portrait studio backdrop from original Pixar rendering.',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    bgClass: 'bg-[#F9E8CE]',
    gradientStyle: 'radial-gradient(circle at 65% 30%, #FFF0D4 0%, #F6D7A8 50%, #E5B275 100%)',
    description: 'Volumetric sunset sunbeam wash highlighting the hair puffs and hoodie fibers.',
  },
  {
    id: 'ue5-stage',
    name: 'Unreal 5 Slate',
    bgClass: 'bg-[#181920]',
    gradientStyle: 'radial-gradient(circle at 50% 35%, #2D303E 0%, #171822 65%, #0D0E15 100%)',
    description: 'Dark cinematic stage emphasizing subsurface skin illumination and edge rims.',
  },
  {
    id: 'pastel-sky',
    name: 'Soft Lavender',
    bgClass: 'bg-[#EAE4F2]',
    gradientStyle: 'radial-gradient(circle at 50% 40%, #FAF7FD 0%, #E9E1F5 55%, #D4C6EA 100%)',
    description: 'Whimsical animated movie storybook atmosphere.',
  },
];

export const DEFAULT_LIGHTING: LightingRig = {
  keyIntensity: 78,
  keyAngle: 45,
  keyTemperature: 4500, // Balanced warm daylight
  fillIntensity: 42,
  rimIntensity: 65,
  rimColor: '#FDE047', // Warm yellow rim
  depthOfField: 35,
  vignette: 24,
  bloom: 18,
  volumetricDust: true,
};

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Sunburst Fleece Yellow',
    role: 'Hoodie Garment',
    hex: '#F4BC2E',
    rgb: 'rgb(244, 188, 46)',
    hsl: 'hsl(43, 90%, 57%)',
    note: 'Woven micro-fleece texture with warm subsurface light bounce',
  },
  {
    name: 'Cadmium Explorer Red',
    role: 'Backpack Straps',
    hex: '#D13835',
    rgb: 'rgb(209, 56, 53)',
    hsl: 'hsl(1, 63%, 51%)',
    note: 'Durable nylon strap weave with metal tension buckles and star patch',
  },
  {
    name: 'Espresso Cocoa',
    role: 'Puff Hair Curls',
    hex: '#2B1A13',
    rgb: 'rgb(43, 26, 19)',
    hsl: 'hsl(18, 39%, 12%)',
    note: 'Strand-based grooming with high specular highlight curves and volume',
  },
  {
    name: 'Warm Cinnamon Melanin',
    role: 'Subsurface Skin',
    hex: '#965538',
    rgb: 'rgb(150, 85, 56)',
    hsl: 'hsl(19, 46%, 40%)',
    note: 'Multi-layer epidermal scattering with rosiness around cheeks and bridge of nose',
  },
  {
    name: 'Antique Cream Backdrop',
    role: 'Studio Lighting Stage',
    hex: '#F6EEDE',
    rgb: 'rgb(246, 238, 222)',
    hsl: 'hsl(40, 52%, 92%)',
    note: 'Diffused studio cyclorama background with gentle radial falloff',
  },
];

export const TECH_SPECS = [
  { label: 'Render Engine', value: 'Unreal Engine 5.4 Lumen / Pixar RenderMan Style' },
  { label: 'Character Model', value: 'Custom 9-Year-Old Stylized Bust Topology' },
  { label: 'Hair Simulation', value: 'Dual Afro Puffs · 140,000 Dynamic Hair Strands' },
  { label: 'Shading Model', value: 'Subsurface Skin Scattering (BSSRDF) + Micro-Fleece Cloth Shader' },
  { label: 'Lighting Rig', value: '3-Point Volumetric Cinematic Studio Rig + Soft Diffuser' },
  { label: 'Camera Lens', value: '85mm Portrait Prime · f/2.0 Shallow Depth of Field' },
  { label: 'Target Output', value: '8K Ultra High Definition (1:1 Centered Aspect)' },
];

export const CHARACTER_BIO = {
  name: 'Maya',
  age: 9,
  archetype: 'The Curious Tinkerer & Daydreamer',
  favoriteItem: 'Red Solar-Charged Backpack filled with notebooks and gadgets',
  personality: 'Bubbly, tenacious, fiercely imaginative, always the first to ask "why does that work?"',
  wardrobeNotes: 'Oversized sunflower-yellow hoodie with soft fleece texture, paired with candy-colored hair beads.',
};

export const ORIGINAL_PROMPT = `Pixar-style 3D character portrait, 9-year-old girl, curly dark brown hair in two puffs, big brown eyes, warm smile, yellow hoodie, red backpack straps, soft studio lighting, cream background, centered bust shot, 1:1, 8k resolution, highly detailed, vibrant colors, playful expression, volumetric cinematic lighting. sharp focus, intricate texture on clothing, cheerful atmosphere. rendered in Unreal Engine 5 with subtle depth of field effects. , photorealistic style. Masterpiece, cinematic quality, artistic portrait.`;
