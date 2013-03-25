/**
 * @class Triangle
 * @author Matthew Wagerfield
 */
SHARD.Triangle = function(a, b, c) {
  this.a = a || new SHARD.Vertex();
  this.b = b || new SHARD.Vertex();
  this.c = c || new SHARD.Vertex();
  this.u = SHARD.Vector3.create();
  this.v = SHARD.Vector3.create();
  this.centroid = SHARD.Vector3.create();
  this.normal = SHARD.Vector3.create();
  this.color = new SHARD.Color();
  this.polygon = document.createElementNS(SHARD.SVGNS, 'polygon');
  this.polygon.setAttributeNS(null, 'stroke-linejoin', 'round');
  this.polygon.setAttributeNS(null, 'stroke-miterlimit', '1');
  this.polygon.setAttributeNS(null, 'stroke-width', '1');
  this.computeCentroid();
  this.computeNormal();
};

SHARD.Triangle.prototype = {
  computeCentroid: function() {
    this.centroid[0] = this.a.position[0] + this.b.position[0] + this.c.position[0];
    this.centroid[1] = this.a.position[1] + this.b.position[1] + this.c.position[1];
    this.centroid[2] = this.a.position[2] + this.b.position[2] + this.c.position[2];
    SHARD.Vector3.divideScalar(this.centroid, 3);
    return this;
  },
  computeNormal: function() {
    SHARD.Vector3.subtractVectors(this.u, this.b.position, this.a.position);
    SHARD.Vector3.subtractVectors(this.v, this.c.position, this.a.position);
    SHARD.Vector3.crossVectors(this.normal, this.u, this.v);
    SHARD.Vector3.normalise(this.normal);
    return this;
  }
};
