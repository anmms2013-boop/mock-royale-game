module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-dark': '#0a0e27',
        'game-blue': '#3b82f6',
        'game-purple': '#a855f7',
        'game-cyan': '#06b6d4',
        'game-yellow': '#fbbf24',
        'game-pink': '#ec4899',
      },
      fontFamily: {
        'game': ['Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
