import type { Config } from 'tailwindcss';
import { dsPreset } from '../packages/react/src/tailwind.preset';

const config: Config = {
  presets: [dsPreset],
  content: [
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
    '../packages/react/src/**/*.{js,ts,jsx,tsx}',
    '../packages/react/dist/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
