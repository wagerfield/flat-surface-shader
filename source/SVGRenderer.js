/**
 * @class SVG Renderer
 * @author Matthew Wagerfield
 */
SHARD.SVGRenderer = function() {
  SHARD.Renderer.call(this);
  this.element = document.createElementNS(SHARD.SVGNS, 'svg');
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
