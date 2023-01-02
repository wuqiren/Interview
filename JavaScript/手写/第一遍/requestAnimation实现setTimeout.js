const RAF = {
    intervalTimer: null,
    timeoutTimer: null,
    setTimeout (cb, interval) { // 实现setTimeout功能
      let now = Date.now
      let stime = now()
      let etime = stime
      let loop = () => {
        this.timeoutTimer = window.requestAnimationFrame(loop)
        etime = now()
        if (etime - stime >= interval) {
          cb()
          window.cancelAnimationFrame(this.timeoutTimer)
        }
      }
      this.timeoutTimer = window.requestAnimationFrame(loop)
      return this.timeoutTimer
    },
    clearTimeout () {
        window.cancelAnimationFrame(this.timeoutTimer)
    },
    setInterval (cb, interval) { // 实现setInterval功能
      let now = Date.now
      let stime = now()
      let etime = stime
      let loop = () => {
        this.intervalTimer = window.requestAnimationFrame(loop)
        etime = now()
        if (etime - stime >= interval) {
          stime = now()
          etime = stime
          cb()
        }
      }
      this.intervalTimer = window.requestAnimationFrame(loop)
      return this.intervalTimer
    },
    clearInterval () {
        window.cancelAnimationFrame(this.intervalTimer)
    }
  }
