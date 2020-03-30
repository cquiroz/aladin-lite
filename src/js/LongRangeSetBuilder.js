const LongRangeSetBuilder = (function() {
  function t() {
    this.items = [];
  };
  t.prototype.appendRange = function(t, s) {
    for (var i = t; s >= i; i++) i in this.items || this.items.push(i);
  };
  return t;
})();

export default LongRangeSetBuilder;
