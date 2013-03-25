//============================================================
//
// Copyright (C) 2013 Matthew Wagerfield
//
// Twitter: https://twitter.com/mwagerfield
//
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the
// Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions
// of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
// OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
// EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
// AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
// OR OTHER DEALINGS IN THE SOFTWARE.
//
//============================================================

/**
 * Defines the Flat Surface Shader namespace for all the awesomeness to exist upon.
 * @author Matthew Wagerfield
 */
SHARD = {
  FRONT  : 0,
  BACK   : 1,
  DOUBLE : 2,
  SVGNS  : 'http://www.w3.org/2000/svg'
};

/**
 * @class Array
 * @author Matthew Wagerfield
 */
SHARD.Array = typeof Float32Array === 'function' ? Float32Array : Array;

/**
 * Request Animation Frame Polyfill.
 * @author Matthew Wagerfield
 */
window.requestAnimationFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function(callback) {
           window.setTimeout(callback, 1000/60);
         };
})();

/**
 * @object Math Augmentation
 * @author Matthew Wagerfield
 */
Math.PIM2 = Math.PI*2;
Math.PID2 = Math.PI/2;
Math.randomInRange = function(min, max) {
  return min + (max - min) * Math.random();
};
Math.clamp = function(value, min, max) {
  value = Math.max(value, min);
  value = Math.min(value, max);
  return value;
};

/**
 * @object Vector3
 * @author Matthew Wagerfield
 */
SHARD.Vector3 = {
  create: function(x, y, z) {
    var vector = new SHARD.Array(3);
    this.set(vector, x, y, z);
    return vector;
  },
  clone: function(a) {
    var vector = this.create();
    this.copy(vector, a);
    return vector;
  },
  set: function(target, x, y, z) {
    target[0] = x || 0;
    target[1] = y || 0;
    target[2] = z || 0;
    return this;
  },
  setX: function(target, x) {
    target[0] = x || 0;
    return this;
  },
  setY: function(target, y) {
    target[1] = y || 0;
    return this;
  },
  setZ: function(target, z) {
    target[2] = z || 0;
    return this;
  },
  copy: function(target, a) {
    target[0] = a[0];
    target[1] = a[1];
    target[2] = a[2];
    return this;
  },
  add: function(target, a) {
    target[0] += a[0];
    target[1] += a[1];
    target[2] += a[2];
    return this;
  },
  addVectors: function(target, a, b) {
    target[0] = a[0] + b[0];
    target[1] = a[1] + b[1];
    target[2] = a[2] + b[2];
    return this;
  },
  addScalar: function(target, s) {
    target[0] += s;
    target[1] += s;
    target[2] += s;
    return this;
  },
  subtract: function(target, a) {
    target[0] -= a[0];
    target[1] -= a[1];
    target[2] -= a[2];
    return this;
  },
  subtractVectors: function(target, a, b) {
    target[0] = a[0] - b[0];
    target[1] = a[1] - b[1];
    target[2] = a[2] - b[2];
    return this;
  },
  subtractScalar: function(target, s) {
    target[0] -= s;
    target[1] -= s;
    target[2] -= s;
    return this;
  },
  multiply: function(target, a) {
    target[0] *= a[0];
    target[1] *= a[1];
    target[2] *= a[2];
    return this;
  },
  multiplyVectors: function(target, a, b) {
    target[0] = a[0] * b[0];
    target[1] = a[1] * b[1];
    target[2] = a[2] * b[2];
    return this;
  },
  multiplyScalar: function(target, s) {
    target[0] *= s;
    target[1] *= s;
    target[2] *= s;
    return this;
  },
  divide: function(target, a) {
    target[0] /= a[0];
    target[1] /= a[1];
    target[2] /= a[2];
    return this;
  },
  divideVectors: function(target, a, b) {
    target[0] = a[0] / b[0];
    target[1] = a[1] / b[1];
    target[2] = a[2] / b[2];
    return this;
  },
  divideScalar: function(target, s) {
    if (s !== 0) {
      target[0] /= s;
      target[1] /= s;
      target[2] /= s;
    } else {
      target[0] = 0;
      target[1] = 0;
      target[2] = 0;
    }
    return this;
  },
  cross: function(target, a) {
    var x = target[0];
    var y = target[1];
    var z = target[2];
    target[0] = y*a[2] - z*a[1];
    target[1] = z*a[0] - x*a[2];
    target[2] = x*a[1] - y*a[0];
    return this;
  },
  crossVectors: function(target, a, b) {
    target[0] = a[1]*b[2] - a[2]*b[1];
    target[1] = a[2]*b[0] - a[0]*b[2];
    target[2] = a[0]*b[1] - a[1]*b[0];
    return this;
  },
  min: function(target, value) {
    if (target[0] < value) { target[0] = value; }
    if (target[1] < value) { target[1] = value; }
    if (target[2] < value) { target[2] = value; }
    return this;
  },
  max: function(target, value) {
    if (target[0] > value) { target[0] = value; }
    if (target[1] > value) { target[1] = value; }
    if (target[2] > value) { target[2] = value; }
    return this;
  },
  clamp: function(target, min, max) {
    this.min(target, min);
    this.max(target, max);
    return this;
  },
  limit: function(target, min, max) {
    var length = this.length(target);
    if (min !== null && length < min) {
      this.setLength(target, min);
    } else if (max !== null && length > max) {
      this.setLength(target, max);
    }
    return this;
  },
  dot: function(a, b) {
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
  },
  normalise: function(target) {
    return this.divideScalar(target, this.length(target));
  },
  negate: function(target) {
    return this.multiplyScalar(target, -1);
  },
  distanceSquared: function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx*dx + dy*dy + dz*dz;
  },
  distance: function(a, b) {
    return Math.sqrt(this.distanceSquared(a, b));
  },
  lengthSquared: function(a) {
    return a[0]*a[0] + a[1]*a[1] + a[2]*a[2];
  },
  length: function(a) {
    return Math.sqrt(this.lengthSquared(a));
  },
  setLength: function(target, l) {
    var length = this.length(target);
    if (length !== 0 && l !== length) {
      this.multiplyScalar(target, l / length);
    }
    return this;
  }
};

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

/**
 * @class Plane
 * @author Matthew Wagerfield
 */
SHARD.Plane = function(width, height, segments, slices) {
  SHARD.Geometry.call(this);
  this.width = width || 100;
  this.height = height || 100;
  this.segments = segments || 4;
  this.slices = slices || 4;
  this.segmentWidth = this.width / this.segments;
  this.sliceHeight = this.height / this.slices;

  // Cache Variables
  var x, y, v0, v1, v2, v3,
      vertex, triangle, vertices = [],
      offsetX = this.width * -0.5,
      offsetY = this.height * 0.5;

  // Add Vertices
  for (x = 0; x <= this.segments; x++) {
    vertices.push([]);
    for (y = 0; y <= this.slices; y++) {
      vertex = new SHARD.Vertex(offsetX + x*this.segmentWidth, offsetY - y*this.sliceHeight);
      vertices[x].push(vertex);
      this.vertices.push(vertex);
    }
  }

  // Add Triangles
  for (x = 0; x < this.segments; x++) {
    for (y = 0; y < this.slices; y++) {
      v0 = vertices[x+0][y+0];
      v1 = vertices[x+0][y+1];
      v2 = vertices[x+1][y+0];
      v3 = vertices[x+1][y+1];
      t0 = new SHARD.Triangle(v0, v1, v2);
      t1 = new SHARD.Triangle(v2, v1, v3);
      this.triangles.push(t0, t1);
    }
  }
};

SHARD.Plane.prototype = Object.create(SHARD.Geometry.prototype);

/**
 * @class Material
 * @author Matthew Wagerfield
 */
SHARD.Material = function(ambient, diffuse) {
  this.ambient = new SHARD.Color(ambient || '#444444');
  this.diffuse = new SHARD.Color(diffuse || '#FFFFFF');
  this.slave = new SHARD.Color();
};

/**
 * @class Mesh
 * @author Matthew Wagerfield
 */
SHARD.Mesh = function(geometry, material) {
  SHARD.Object.call(this);
  this.geometry = geometry || new SHARD.Geometry();
  this.material = material || new SHARD.Material();
  this.side = SHARD.FRONT;
  this.visible = true;
};

SHARD.Mesh.prototype = Object.create(SHARD.Object.prototype);

SHARD.Mesh.prototype.update = function(lights) {
  var t,triangle, l,light, illuminance;

  // Update Geometry
  this.geometry.update();

  // Iterate through Triangles
  for (t = this.geometry.triangles.length - 1; t >= 0; t--) {
    triangle = this.geometry.triangles[t];

    // Reset Triangle Color
    SHARD.Vector3.set(triangle.color.rgb);

    // Iterate through Lights
    for (l = lights.length - 1; l >= 0; l--) {
      light = lights[l];

      // Calculate Illuminance
      SHARD.Vector3.subtractVectors(light.ray, light.position, triangle.centroid);
      SHARD.Vector3.normalise(light.ray);
      illuminance = SHARD.Vector3.dot(triangle.normal, light.ray);
      if (this.side === SHARD.FRONT) {
        illuminance = Math.max(illuminance, 0);
      } else if (this.side === SHARD.BACK) {
        illuminance = Math.abs(Math.min(illuminance, 0));
      } else if (this.side === SHARD.DOUBLE) {
        illuminance = Math.max(Math.abs(illuminance), 0);
      }

      // Calculate Ambient Light
      SHARD.Vector3.multiplyVectors(this.material.slave.rgb, this.material.ambient.rgb, light.ambient.rgb);
      SHARD.Vector3.add(triangle.color.rgb, this.material.slave.rgb);

      // Calculate Diffuse Light
      SHARD.Vector3.multiplyVectors(this.material.slave.rgb, this.material.diffuse.rgb, light.diffuse.rgb);
      SHARD.Vector3.multiplyScalar(this.material.slave.rgb, illuminance);
      SHARD.Vector3.add(triangle.color.rgb, this.material.slave.rgb);
    }

    // Clamp & Format Color
    SHARD.Vector3.clamp(triangle.color.rgb, 0, 1);
  }
  return this;
};

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

/**
 * @class Canvas Renderer
 * @author Matthew Wagerfield
 */
SHARD.CanvasRenderer = function() {
  SHARD.Renderer.call(this);
  this.element = document.createElement('canvas');
  this.element.style.display = 'block';
  this.context = this.element.getContext('2d');
  this.setSize(this.element.width, this.element.height);
};

SHARD.CanvasRenderer.prototype = Object.create(SHARD.Renderer.prototype);

SHARD.CanvasRenderer.prototype.setSize = function(width, height) {
  SHARD.Renderer.prototype.setSize.call(this, width, height);
  this.element.width = width;
  this.element.height = height;
  this.context.setTransform(1, 0, 0, -1, this.halfWidth, this.halfHeight);
  return this;
};

SHARD.CanvasRenderer.prototype.clear = function() {
  SHARD.Renderer.prototype.clear.call(this);
  this.context.clearRect(-this.halfWidth, -this.halfHeight, this.width, this.height);
  return this;
};

SHARD.CanvasRenderer.prototype.render = function(scene) {
  SHARD.Renderer.prototype.render.call(this, scene);
  var m,mesh, t,triangle, color;

  // Clear Context
  this.clear();

  // Configure Context
  this.context.lineJoin = 'round';
  this.context.lineWidth = 1;

  // Update Meshes
  for (m = scene.meshes.length - 1; m >= 0; m--) {
    mesh = scene.meshes[m];
    if (mesh.visible) {
      mesh.update(scene.lights);

      // Render Triangles
      for (t = mesh.geometry.triangles.length - 1; t >= 0; t--) {
        triangle = mesh.geometry.triangles[t];
        color = triangle.color.format();
        this.context.beginPath();
        this.context.moveTo(triangle.a.position[0], triangle.a.position[1]);
        this.context.lineTo(triangle.b.position[0], triangle.b.position[1]);
        this.context.lineTo(triangle.c.position[0], triangle.c.position[1]);
        this.context.closePath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.stroke();
        this.context.fill();
      }
    }
  }
  return this;
};

/**
 * @class SVG Renderer
 * @author Matthew Wagerfield
 */
SHARD.SVGRenderer = function() {
  SHARD.Renderer.call(this);
  this.element = document.createElementNS(SHARD.SVGNS, 'svg');
  this.element.setAttribute('xmlns', SHARD.SVGNS);
  this.element.setAttribute('version', '1.1');
  this.element.style.display = 'block';
  this.setSize(300, 150);
};

SHARD.SVGRenderer.prototype = Object.create(SHARD.Renderer.prototype);

SHARD.SVGRenderer.prototype.setSize = function(width, height) {
  SHARD.Renderer.prototype.setSize.call(this, width, height);
  this.element.setAttribute('width', width);
  this.element.setAttribute('height', height);
  return this;
};

SHARD.SVGRenderer.prototype.clear = function() {
  SHARD.Renderer.prototype.clear.call(this);
  for (var i = this.element.childNodes.length - 1; i >= 0; i--) {
    this.element.removeChild(this.element.childNodes[i]);
  }
  return this;
};

SHARD.SVGRenderer.prototype.render = function(scene) {
  SHARD.Renderer.prototype.render.call(this, scene);
  var m,mesh, t,triangle, points, style;

  // Update Meshes
  for (m = scene.meshes.length - 1; m >= 0; m--) {
    mesh = scene.meshes[m];
    if (mesh.visible) {
      mesh.update(scene.lights);

      // Render Triangles
      for (t = mesh.geometry.triangles.length - 1; t >= 0; t--) {
        triangle = mesh.geometry.triangles[t];
        if (triangle.polygon.parentNode !== this.element) {
          this.element.appendChild(triangle.polygon);
        }
        points  = this.formatPoint(triangle.a)+' ';
        points += this.formatPoint(triangle.b)+' ';
        points += this.formatPoint(triangle.c);
        style = this.formatStyle(triangle.color.format());
        triangle.polygon.setAttributeNS(null, 'points', points);
        triangle.polygon.setAttributeNS(null, 'style', style);
      }
    }
  }
  return this;
};

SHARD.SVGRenderer.prototype.formatPoint = function(vertex) {
  return (this.halfWidth+vertex.position[0])+','+(this.halfHeight+vertex.position[1]);
};

SHARD.SVGRenderer.prototype.formatStyle = function(color) {
  var style = 'fill:'+color+';';
  style += 'stroke:'+color+';';
  return style;
};
