function _new(Fuc) {
    return function() {
      var obj = {
        __proto__: Fuc.prototype
      }
      Fuc.apply(obj, arguments)
      return obj
    }
  }
