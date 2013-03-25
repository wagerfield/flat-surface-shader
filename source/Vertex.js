/**
 * @class Vertex
 * @author Matthew Wagerfield
 */
SHARD.Vertex = function(x, y, z) {
  this.position = SHARD.Vector3.create(x, y, z);
};

SHARD.Vertex.prototype = {
  setPosition: function(x, y, z) {
    SHARD.Vector3.set(this.position, x, y, z);
    return this;
  }
};
