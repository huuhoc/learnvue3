export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['"Inter"', 'sans-serif']
    },
    extend: {
      colors: {
        body: '#f3f4f6',
        content: '#6b7280',
        title: '#111827',
        menu: '#4b5563',
        'menu-hover': '#111827',
        brand: '#0065FF'
      }
    }
  },
  plugins: []
}
