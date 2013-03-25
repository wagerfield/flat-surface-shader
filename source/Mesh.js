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
