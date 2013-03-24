/**
 * @class Mesh
 * @author Matthew Wagerfield
 */
FSS.Mesh = function(geometry, material) {
  this.geometry = geometry || new FSS.Geometry();
  this.material = material || new FSS.Material();
  this.side = FSS.FRONT;
  this.visible = true;
};

FSS.Mesh.prototype = {
  render: function(context, lights) {
    var t, triangle, l, light, color, illuminance;

    // Update Geometry
    this.geometry.update();

    // Configure Context
    context.lineJoin = 'round';
    context.lineWidth = 1;

    // Iterate through Triangles
    for (t = this.geometry.triangles.length - 1; t >= 0; t--) {
      triangle = this.geometry.triangles[t];

      // Reset Triangle Color
      FSS.Vector3.set(triangle.color.rgb);

      // Iterate through Lights
      for (l = lights.length - 1; l >= 0; l--) {
        light = lights[l];

        // Calculate Illuminance
        FSS.Vector3.subtractVectors(light.ray, light.position, triangle.centroid);
        FSS.Vector3.normalise(light.ray);
        illuminance = FSS.Vector3.dot(triangle.normal, light.ray);
        if (this.side === FSS.FRONT) {
          illuminance = Math.max(illuminance, 0);
        } else if (this.side === FSS.BACK) {
          illuminance = Math.abs(Math.min(illuminance, 0));
        } else if (this.side === FSS.DOUBLE) {
          illuminance = Math.max(Math.abs(illuminance), 0);
        }

        // Calculate Ambient Light
        FSS.Vector3.multiplyVectors(this.material.slave.rgb, this.material.ambient.rgb, light.ambient.rgb);
        FSS.Vector3.add(triangle.color.rgb, this.material.slave.rgb);

        // Calculate Diffuse Light
        FSS.Vector3.multiplyVectors(this.material.slave.rgb, this.material.diffuse.rgb, light.diffuse.rgb);
        FSS.Vector3.multiplyScalar(this.material.slave.rgb, illuminance);
        FSS.Vector3.add(triangle.color.rgb, this.material.slave.rgb);
      }

      // Clamp & Format Color
      FSS.Vector3.clamp(triangle.color.rgb, 0, 1);
      color = triangle.color.format();

      // Draw Triangle
      triangle.render(context, color);
    }
    return this;
  }
};
