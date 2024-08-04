const config = {
  '*.{js,jsx,mjs,cjs,ts,tsx,mts}': ['npm run lint', 'npm run test'],
  '*.{md,json,ts}': 'prettier --write',
};

export default config;
