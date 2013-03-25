/**
 * @class SVG Renderer
 * @author Matthew Wagerfield
 */
FSS.SVGRenderer = function() {
  FSS.Renderer.call(this);
  this.element = document.createElement('div');
  this.shape = document.createElementNS(FSS.SVGNS, 'circle');
  this.shape.setAttributeNS(null, 'fill', 'red');
  this.shape.setAttributeNS(null, 'cx', 250);
  this.shape.setAttributeNS(null, 'cy', 250);
  this.shape.setAttributeNS(null, 'r',  200);
  this.element.appendChild(this.shape);
  this.setSize(300, 150);
};

FSS.SVGRenderer.prototype = Object.create(FSS.Renderer.prototype);

FSS.SVGRenderer.prototype.setSize = function(width, height) {
  FSS.Renderer.prototype.setSize.call(this, width, height);
  this.element.style.width = width + 'px';
  this.element.style.height = height + 'px';
  return this;
};

FSS.SVGRenderer.prototype.clear = function() {
  FSS.Renderer.prototype.clear.call(this);
  return this;
};

FSS.SVGRenderer.prototype.render = function(scene) {
  FSS.Renderer.prototype.render.call(this, scene);
  var m,mesh, t,triangle, color;

  // Update Meshes
  for (m = scene.meshes.length - 1; m >= 0; m--) {
    mesh = scene.meshes[m];
    if (mesh.visible) {
      mesh.update(scene.lights);

      // Render Triangles
      for (t = mesh.geometry.triangles.length - 1; t >= 0; t--) {
        triangle = mesh.geometry.triangles[t];
        color = triangle.color.format();
        // moveTo(triangle.a.position[0], triangle.a.position[1]);
        // lineTo(triangle.b.position[0], triangle.b.position[1]);
        // lineTo(triangle.c.position[0], triangle.c.position[1]);
      }
    }
  }
  return this;
};
