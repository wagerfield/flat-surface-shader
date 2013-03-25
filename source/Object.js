/**
 * @class Object
 * @author Matthew Wagerfield
 */
SHARD.Object = function() {
  this.position = SHARD.Vector3.create();
};

SHARD.Object.prototype = {
  setPosition: function(x, y, z) {
    SHARD.Vector3.set(this.position, x, y, z);
    return this;
  }
};
