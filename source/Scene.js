/**
 * @class Scene
 * @author Matthew Wagerfield
 */
FSS.Scene = function(options) {
  options = options || {};
  this.canvas = options.canvas || document.createElement('canvas');
  this.canvas.style.display = 'block';
  this.context = this.canvas.getContext('2d');
  this.meshes = [];
  this.lights = [];
  this.width = 0;
  this.height = 0;
  this.halfWidth = 0;
  this.halfHeight = 0;
  this.setSize(canvas.width, canvas.height);
};

FSS.Scene.prototype = {
  addMesh: function(mesh) {
    if (mesh instanceof FSS.Mesh && !~this.meshes.indexOf(mesh)) {
      this.meshes.push(mesh);
    }
    return this;
  },
  removeMesh: function(mesh) {
    if (mesh instanceof FSS.Mesh && ~this.meshes.indexOf(mesh)) {
      this.meshes.splice(this.meshes.indexOf(mesh), 1);
    }
    return this;
  },
  addLight: function(light) {
    if (light instanceof FSS.Light && !~this.lights.indexOf(light)) {
      this.lights.push(light);
    }
    return this;
  },
  removeLight: function(light) {
    if (light instanceof FSS.Light && ~this.lights.indexOf(light)) {
      this.lights.splice(this.lights.indexOf(light), 1);
    }
    return this;
  },
  setSize: function(width, height) {
    if (this.width !== width || this.height !== height) {
      this.width = this.canvas.width = width;
      this.height = this.canvas.height = height;
      this.halfWidth = this.width * 0.5;
      this.halfHeight = this.height * 0.5;
      this.context.setTransform(1, 0, 0, -1, this.halfWidth, this.halfHeight);
    }
    return this;
  },
  clear: function() {
    this.context.clearRect(-this.halfWidth, -this.halfHeight, this.width, this.height);
    return this;
  },
  render: function() {
    this.clear();
    var m, mesh;
    for (m = this.meshes.length - 1; m >= 0; m--) {
      mesh = this.meshes[m];
      if (mesh.visible) {
        mesh.render(this.context, this.lights);
      }
    }
    return this;
  }
};
