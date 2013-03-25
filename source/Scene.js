/**
 * @class Scene
 * @author Matthew Wagerfield
 */
SHARD.Scene = function() {
  this.meshes = [];
  this.lights = [];
};

SHARD.Scene.prototype = {
  add: function(object) {
    if (object instanceof SHARD.Mesh && !~this.meshes.indexOf(object)) {
      this.meshes.push(object);
    } else if (object instanceof SHARD.Light && !~this.lights.indexOf(object)) {
      this.lights.push(object);
    }
    return this;
  },
  remove: function(object) {
    if (object instanceof SHARD.Mesh && ~this.meshes.indexOf(object)) {
      this.meshes.splice(this.meshes.indexOf(object), 1);
    } else if (object instanceof SHARD.Light && ~this.lights.indexOf(object)) {
      this.lights.splice(this.lights.indexOf(object), 1);
    }
    return this;
  }
};
