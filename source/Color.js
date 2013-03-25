/**
 * @class Color
 * @author Matthew Wagerfield
 */
SHARD.Color = function(hex) {
  this.rgb = SHARD.Vector3.create();
  this.hex = hex || '#000000';
  this.set(this.hex);
};

SHARD.Color.prototype = {
  set: function(hex) {
    hex = hex.replace('#', '');
    var size = hex.length / 3;
    this.rgb[0] = parseInt(hex.substring(size*0, size*1), 16) / 255;
    this.rgb[1] = parseInt(hex.substring(size*1, size*2), 16) / 255;
    this.rgb[2] = parseInt(hex.substring(size*2, size*3), 16) / 255;
    return this;
  },
  hexify: function(channel) {
    var hex = Math.ceil(channel*255).toString(16);
    if (hex.length === 1) { hex = '0' + hex; }
    return hex;
  },
  format: function() {
    var r = this.hexify(this.rgb[0]);
    var g = this.hexify(this.rgb[1]);
    var b = this.hexify(this.rgb[2]);
    this.hex = '#' + r + g + b;
    return this.hex;
  }
};
