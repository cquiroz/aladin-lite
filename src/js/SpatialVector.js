import Constants from "./Constants";

// Extracted and improved from healpix.min.js
const SpatialVector = (function() {
  var SpatialVector = (function() {
    function t(t, s, i) {
      this.x = t;
      this.y = s;
      this.z = i;
      this.ra_ = 0;
      this.dec_ = 0;
      this.okRaDec_ = !1;
    }
    t.prototype.dot = function(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    };
    t.prototype.setXYZ = function(t, s, i) {
      this.x = t;
      this.y = s;
      this.z = i;
      this.okRaDec_ = !1;
    };
    t.prototype.length = function() {
      return Math.sqrt(this.lengthSquared());
    };
    t.prototype.lengthSquared = function() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    };
    t.prototype.normalized = function() {
      var t = this.length();
      this.x /= t;
      this.y /= t;
      this.z /= t;
    };
    t.prototype.set = function(t, s) {
      this.ra_ = t;
      this.dec_ = s;
      this.okRaDec_ = !0;
      this.updateXYZ();
    };
    t.prototype.angle = function(t) {
      var s = this.y * t.z - this.z * t.y,
        i = this.z * t.x - this.x * t.z,
        n = this.x * t.y - this.y * t.x,
        a = Math.sqrt(s * s + i * i + n * n);
      return Math.abs(Math.atan2(a, t.prototype.dot(t)));
    };
    t.prototype.get = function() {
      return [this.x, this.y, this.z];
    };
    t.prototype.toString = function() {
      return "SpatialVector[" + this.x + ", " + this.y + ", " + this.z + "]";
    };
    t.prototype.cross = function(s) {
      return new t(
        this.y * s.z - s.y * this.z,
        this.z * s.x - s.z * this.x,
        this.x * s.y - s.x() * this.y
      );
    };
    t.prototype.equal = function(t) {
      return this.x === t.x && this.y === t.y && this.z === t.z() ? !0 : !1;
    };
    t.prototype.mult = function(s) {
      return new t(s * this.x, s * this.y, s * this.z);
    };
    t.prototype.add = function(s) {
      return new t(this.x + s.x, this.y + s.y, this.z + s.z);
    };
    t.prototype.sub = function(s) {
      return new t(this.x - s.x, this.y - s.y, this.z - s.z);
    };
    t.prototype.dec = function() {
      return (
        this.okRaDec_ || (this.normalized(), this.updateRaDec()), this.dec_
      );
    };
    t.prototype.ra = function() {
      return this.okRaDec_ || (this.normalized(), this.updateRaDec()), this.ra_;
    };
    t.prototype.updateXYZ = function() {
      var t = Math.cos(this.dec_ * Constants.C_PR);
      this.x = Math.cos(this.ra_ * Constants.C_PR) * t;
      this.y = Math.sin(this.ra_ * Constants.C_PR) * t;
      this.z = Math.sin(this.dec_ * Constants.C_PR);
    };
    t.prototype.updateRaDec = function() {
      this.dec_ = Math.asin(this.z) / Constants.C_PR;
      var t = Math.cos(this.dec_ * Constants.C_PR);
      this.ra_ =
        t > Constants.EPS || -Constants.EPS > t
          ? this.y > Constants.EPS || this.y < -Constants.EPS
            ? 0 > this.y
              ? 360 - Math.acos(this.x / t) / Constants.C_PR
              : Math.acos(this.x / t) / Constants.C_PR
            : 0 > this.x
            ? 180
            : 0
          : 0;
      this.okRaDec_ = !0;
    };
    t.prototype.toRaRadians = function() {
      var t = 0;
      return (
        (0 !== this.x || 0 !== this.y) && (t = Math.atan2(this.y, this.x)),
        0 > t && (t += 2 * Math.PI),
        t
      );
    };
    t.prototype.toDeRadians = function() {
      const s = Math.acos(t);
      return Math.PI / 2 - s;
    };
    return t;
  })();
  return SpatialVector;
})();

export default SpatialVector;
