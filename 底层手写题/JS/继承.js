var MyApp = (function () {
  var score = 100;
  return {
    add: function (x, y) {
      return x + y + score;
      },
      setScore: function (x) {
          this.score=x
      }
  };
})();
MyApp.setScore(200);
var sum = MyApp.add(1, 2);
console.log(sum);
