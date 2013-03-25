/**
 * @class Geometry
 * @author Matthew Wagerfield
 */
SHARD.Geometry = function() {
  this.vertices = [];
  this.triangles = [];
  this.dirty = false;
};

SHARD.Geometry.prototype = {
  update: function() {
    if (this.dirty) {
      var t,triangle;
      for (t = this.triangles.length - 1; t >= 0; t--) {
        triangle = this.triangles[t];
        triangle.computeCentroid();
        triangle.computeNormal();
      }
      this.dirty = false;
    }
    return this;
  }
};
