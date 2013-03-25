/**
 * @class Material
 * @author Matthew Wagerfield
 */
SHARD.Material = function(ambient, diffuse) {
  this.ambient = new SHARD.Color(ambient || '#444444');
  this.diffuse = new SHARD.Color(diffuse || '#FFFFFF');
  this.slave = new SHARD.Color();
};
