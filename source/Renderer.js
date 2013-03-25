/**
 * @class Renderer
 * @author Matthew Wagerfield
 */
SHARD.Renderer = function() {
  this.width = 0;
  this.height = 0;
  this.halfWidth = 0;
  this.halfHeight = 0;
};

SHARD.Renderer.prototype = {
  setSize: function(width, height) {
    if (this.width === width && this.height === height) return;
    this.width = width;
    this.height = height;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;
    return this;
  },
  clear: function() {
    return this;
  },
  render: function(scene) {
    return this;
  }
};
