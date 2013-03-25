/**
 * @class Light
 * @author Matthew Wagerfield
 */
SHARD.Light = function(ambient, diffuse) {
  SHARD.Object.call(this);
  this.ambient = new SHARD.Color(ambient || '#FFFFFF');
  this.diffuse = new SHARD.Color(diffuse || '#FFFFFF');
  this.ray = SHARD.Vector3.create();
};

SHARD.Light.prototype = Object.create(SHARD.Object.prototype);
