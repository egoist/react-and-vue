#!/usr/bin/env node
const readline = require('readline')
const axios = require('axios')
const chalk = require('chalk')

const getRecentWeek = res => {
  const lastWeekCount = res.data['daily-trends'].slice(0, 7).reduce((res, v) => res + v, 0) / 7
  const total = res.data.github.stargazers_count
  const remainingDays = (100000 - total) / lastWeekCount
  return {
    lastWeekCount: parseInt(lastWeekCount, 10),
    total,
    remainingDays: remainingDays.toFixed(1)
  }
}

const main = async () => {
  process.stdout.write('> Fetching data, please wait...')
  const [vue, react] = await Promise.all([
    axios.get(`https://bestofjs-api-v1.now.sh/projects/vuejs/vue`)
      .then(getRecentWeek),
    axios.get(`https://bestofjs-api-v1.now.sh/projects/facebook/react`)
      .then(getRecentWeek)
  ])
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  console.log(chalk.dim(`Don't take this serious, this is just for fun, we love both React and Vue from the bottom of our hearts!\n`))
  console.log(`${chalk.bold(`- At this rate:`)}\n${chalk.green(`Vue (${vue.lastWeekCount} stars/week)`)} will take ${chalk.green(vue.remainingDays)} days\n${chalk.blue(`React (${react.lastWeekCount} stars/week)`)} will take ${chalk.blue(react.remainingDays)} days\nto reach ${chalk.yellow(`100K stars`)} on GitHub.\n`)
  console.log('source: ' + chalk.dim.underline('https://github.com/egoist/react-vs-vue'))
}


main().catch(console.error)
