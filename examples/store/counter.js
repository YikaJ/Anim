const { wedux } = require('../lib/anim.js')
const { observe } = wedux

module.exports = () => {

  class Counter {
    constructor() {
      this.count = 0
    }

    addCount() {
      this.count += 1
    }

    subCount() {
      this.count -= 1
    }
  }

  const counter = new Counter()
  return observe(counter, 'counter')
}