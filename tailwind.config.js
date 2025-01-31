/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-700', 'bg-green-700', 'bg-yellow-700', 'bg-blue-700','bg-grey-700',
    'bg-white', 'bg-black', 'bg-purple-700',
  ],
}