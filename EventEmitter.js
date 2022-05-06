class EventEmitter {

  constructor() {
    this._event = {}
  }

  on(eventName, callback) {
    let callbacks = this._event[eventName] || []
    callbacks.push(callback)
    this._event[eventName] = callbacks
  }

  off(eventName, callback) {
    let callbacks = this._event[eventName] || []
    let newCallbacks = callbacks.filter(cb => cb !== callback && cb.initialCB !== callback)
    this._event[eventName] = newCallbacks
  }

  emit(eventName, ...args) {
    let callbacks = this._event[eventName] || []
    callbacks.forEach(cb => cb(...args))
  }

  once(eventName, callback) {
    let once = (...args) => {
      callback(...args)
      this.off(eventName, once)
    }
    once.initialCB = callback
    this.on(eventName, once)
  }

}

let events = new EventEmitter()

events.on('log1', console.log)
events.emit('log1', 'on and emmit')

events.on('log2', console.log)
events.off('log2', console.log)
events.emit('log2', 'on and emmit')

events.once('log3', console.log)
events.emit('log3', 'once and emmit')
events.emit('log3', 'once and emmit')

events.once('log3', console.log)
events.off('log3', console.log)
events.emit('log3', 'once, off and emmit')