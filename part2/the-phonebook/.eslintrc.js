module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    './rules/react',
    './rules/react-a11y',
    ["airbnb", "airbnb/hooks"]
  ].map(require.resolve),
  
	rules: {
    // disable requiring trailing commas because it might be nice to revert to
    // being JSON at some point, and I don't want to make big changes now.
    "comma-dangle": 0,
  }
}

