const axios = require('axios')

const getRecentWeek = res => {
  const rate =
    res.data['daily-trends'].slice(0, 14).reduce((res, v) => res + v, 0) / 14
  const total = res.data.github.stargazers_count
  const remainingDays = (100000 - total) / rate
  return {
    rate: parseInt(rate, 10),
    total,
    remainingDays: remainingDays.toFixed(1)
  }
}

module.exports = () =>
  Promise.all([
    axios
      .get(`https://bestofjs-api-v1.now.sh/projects/vuejs/vue`)
      .then(getRecentWeek),
    axios
      .get(`https://bestofjs-api-v1.now.sh/projects/facebook/react`)
      .then(getRecentWeek)
  ]).then(([vue, react]) => ({ vue, react }))
