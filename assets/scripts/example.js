(function(){

  //------------------------------
  // Mesh Properties
  //------------------------------
  var MESH = {
    width: 1.2,
    height: 1.2,
    depth: 10,
    segments: 16,
    slices: 8,
    xRange: 0.8,
    yRange: 0.1,
    zRange: 1.0,
    ambient: '#555555',
    diffuse: '#FFFFFF',
    speed: 0.002
  };

  //------------------------------
  // Light Properties
  //------------------------------
  var LIGHT = {
    count: 2,
    xyScalar: 1,
    zOffset: 100,
    ambient: '#880066',
    diffuse: '#FF8800',
    speed: 0.001,
    gravity: 1200,
    dampening: 0.95,
    minLimit: 10,
    maxLimit: null,
    minDistance: 20,
    maxDistance: 400,
    autopilot: false,
    draw: true,
    bounds: FSS.Vector3.create(),
    step: FSS.Vector3.create(
      Math.randomInRange(0.2, 1.0),
      Math.randomInRange(0.2, 1.0),
      Math.randomInRange(0.2, 1.0)
    )
  };

  //------------------------------
  // Export Properties
  //------------------------------
  var EXPORT = {
    width: 2000,
    height: 1000,
    drawLights: false,
    minLightX: 0.4,
    maxLightX: 0.6,
    minLightY: 0.2,
    maxLightY: 0.4,
    export: function() {
      var l, x, y, light,
          depth = MESH.depth,
          zOffset = LIGHT.zOffset,
          autopilot = LIGHT.autopilot,
          scalar = this.width / scene.width;

      LIGHT.autopilot = true;
      LIGHT.draw = this.drawLights;
      LIGHT.zOffset *= scalar;
      MESH.depth *= scalar;

      resize(this.width, this.height);

      for (l = scene.lights.length - 1; l >= 0; l--) {
        light = scene.lights[l];
        x = Math.randomInRange(this.width*this.minLightX, this.width*this.maxLightX);
        y = Math.randomInRange(this.height*this.minLightY, this.height*this.maxLightY);
        FSS.Vector3.set(light.position, x, this.height - y, this.lightZ);
        FSS.Vector3.subtract(light.position, center);
      }

      update();
      render();

      window.open(canvas.toDataURL(), '_blank');

      LIGHT.draw = true;
      LIGHT.autopilot = autopilot;
      LIGHT.zOffset = zOffset;
      MESH.depth = depth;

      resize(container.offsetWidth, container.offsetHeight);
    }
  };

  //------------------------------
  // UI Properties
  //------------------------------
  var UI = {
    show: true
  };

  //------------------------------
  // Global Properties
  //------------------------------
  var now, start = Date.now();
  var center = FSS.Vector3.create();
  var attractor = FSS.Vector3.create();
  var container = document.getElementById('container');
  var controls = document.getElementById('controls');
  var canvas = document.getElementById('canvas');
  var ui = document.getElementById('ui');
  var scene, mesh, geometry, material;
  var gui, autopilotController;

  //------------------------------
  // Methods
  //------------------------------
  function initialise() {
    createScene();
    createMesh();
    createLights();
    addEventListeners();
    addControls();
    resize(container.offsetWidth, container.offsetHeight);
    animate();
  }

  function createScene() {
    scene = new FSS.Scene({canvas:canvas});
    scene.setSize(container.offsetWidth, container.offsetHeight);
  }

  function createMesh() {
    scene.removeMesh(mesh);
    geometry = new FSS.Plane(MESH.width * scene.width, MESH.height * scene.height, MESH.segments, MESH.slices);
    material = new FSS.Material(MESH.ambient, MESH.diffuse);
    mesh = new FSS.Mesh(geometry, material);
    scene.addMesh(mesh);

    // Augment vertices for animation
    var v, vertex;
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      vertex.anchor = FSS.Vector3.clone(vertex.position);
      vertex.step = FSS.Vector3.create(
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0),
        Math.randomInRange(0.2, 1.0)
      );
      vertex.time = Math.randomInRange(0, Math.PIM2);
    }
  }

  function createLights() {
    var l, light;
    for (l = scene.lights.length - 1; l >= 0; l--) {
      light = scene.lights[l];
      scene.removeLight(light);
    }
    for (l = 0; l < LIGHT.count; l++) {
      light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
      light.ambientHex = light.ambient.format();
      light.diffuseHex = light.diffuse.format();
      scene.addLight(light);

      // Augment light for animation
      light.mass = Math.randomInRange(0.5, 1);
      light.velocity = FSS.Vector3.create();
      light.acceleration = FSS.Vector3.create();
      light.force = FSS.Vector3.create();
    }
  }

  function resize(width, height) {
    scene.setSize(width, height);
    FSS.Vector3.set(center, scene.halfWidth, scene.halfHeight);
    createMesh();
  }

  function animate() {
    now = Date.now() - start;
    update();
    render();
    requestAnimationFrame(animate);
  }

  function update() {
    var ox, oy, oz, l, light, v, vertex, offset = MESH.depth/2;

    // Update Bounds
    FSS.Vector3.copy(LIGHT.bounds, center);
    FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);

    // Update Attractor
    FSS.Vector3.setZ(attractor, LIGHT.zOffset);

    // Overwrite the Attractor position
    if (LIGHT.autopilot) {
      ox = Math.sin(LIGHT.step[0] * now * LIGHT.speed);
      oy = Math.cos(LIGHT.step[1] * now * LIGHT.speed);
      FSS.Vector3.set(attractor,
        LIGHT.bounds[0]*ox,
        LIGHT.bounds[1]*oy,
        LIGHT.zOffset);
    }

    // Animate Lights
    for (l = scene.lights.length - 1; l >= 0; l--) {
      light = scene.lights[l];

      // Reset the z position of the light
      FSS.Vector3.setZ(light.position, LIGHT.zOffset);

      // Calculate the force Luke!
      var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), LIGHT.minDistance, LIGHT.maxDistance);
      var F = LIGHT.gravity * light.mass / D;
      FSS.Vector3.subtractVectors(light.force, attractor, light.position);
      FSS.Vector3.normalise(light.force);
      FSS.Vector3.multiplyScalar(light.force, F);

      // Update the light position
      FSS.Vector3.set(light.acceleration);
      FSS.Vector3.add(light.acceleration, light.force);
      FSS.Vector3.add(light.velocity, light.acceleration);
      FSS.Vector3.multiplyScalar(light.velocity, LIGHT.dampening);
      FSS.Vector3.limit(light.velocity, LIGHT.minLimit, LIGHT.maxLimit);
      FSS.Vector3.add(light.position, light.velocity);
    }

    // Animate Vertices
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
      oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
      oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
      FSS.Vector3.set(vertex.position,
        MESH.xRange*geometry.segmentWidth*ox,
        MESH.yRange*geometry.sliceHeight*oy,
        MESH.zRange*offset*oz - offset);
      FSS.Vector3.add(vertex.position, vertex.anchor);
    }

    // Set the Geometry to dirty
    geometry.dirty = true;
  }

  function render() {
    scene.render();

    // Draw Lights
    if (LIGHT.draw) {
      var l, lx, ly, light;
      scene.context.lineWidth = 0.5;
      for (l = scene.lights.length - 1; l >= 0; l--) {
        light = scene.lights[l];
        lx = light.position[0];
        ly = light.position[1];
        scene.context.beginPath();
        scene.context.arc(lx, ly, 10, 0, Math.PIM2);
        scene.context.strokeStyle = light.ambientHex;
        scene.context.stroke();
        scene.context.beginPath();
        scene.context.arc(lx, ly, 4, 0, Math.PIM2);
        scene.context.fillStyle = light.diffuseHex;
        scene.context.fill();
      }
    }
  }

  function addEventListeners() {
    window.addEventListener('resize', onWindowResize);
    container.addEventListener('click', onMouseClick);
    container.addEventListener('mousemove', onMouseMove);
  }

  function addControls() {
    var i, l, light, folder, controller;

    // Create GUI
    gui = new dat.GUI({autoPlace:false});
    controls.appendChild(gui.domElement);

    // Create folders
    uiFolder = gui.addFolder('UI');
    meshFolder = gui.addFolder('Mesh');
    lightFolder = gui.addFolder('Light');
    exportFolder = gui.addFolder('Export');

    // Open folders
    uiFolder.open();
    // meshFolder.open();
    lightFolder.open();
    // exportFolder.open();

    // Add UI Controls
    controller = uiFolder.add(UI, 'show');
    controller.onChange(function(value) {
      ui.className = value ? 'wrapper' : 'wrapper hide';
    });

    // Add Mesh Controls
    controller = meshFolder.addColor(MESH, 'ambient');
    controller.onChange(function(value) {
      for (i = 0, l = scene.meshes.length; i < l; i++) {
        scene.meshes[i].material.ambient.set(value);
      }
    });
    controller = meshFolder.addColor(MESH, 'diffuse');
    controller.onChange(function(value) {
      for (i = 0, l = scene.meshes.length; i < l; i++) {
        scene.meshes[i].material.diffuse.set(value);
      }
    });
    controller = meshFolder.add(MESH, 'width', 0.05, 2);
    controller.onChange(function(value) {
      if (geometry.width !== value * scene.width) { createMesh(); }
    });
    controller = meshFolder.add(MESH, 'height', 0.05, 2);
    controller.onChange(function(value) {
      if (geometry.height !== value * scene.height) { createMesh(); }
    });
    controller = meshFolder.add(MESH, 'depth', 0, 50);
    controller = meshFolder.add(MESH, 'segments', 1, 20);
    controller.step(1);
    controller.onChange(function(value) {
      if (geometry.segments !== value) { createMesh(); }
    });
    controller = meshFolder.add(MESH, 'slices', 1, 20);
    controller.step(1);
    controller.onChange(function(value) {
      if (geometry.slices !== value) { createMesh(); }
    });
    controller = meshFolder.add(MESH, 'xRange', 0, 1);
    controller = meshFolder.add(MESH, 'yRange', 0, 1);
    controller = meshFolder.add(MESH, 'speed', 0, 0.01);

    // Add Light Controls
    autopilotController = lightFolder.add(LIGHT, 'autopilot');
    controller = lightFolder.addColor(LIGHT, 'ambient');
    controller.onChange(function(value) {
      for (i = 0, l = scene.lights.length; i < l; i++) {
        light = scene.lights[i];
        light.ambient.set(value);
        light.ambientHex = light.ambient.format();
      }
    });
    controller = lightFolder.addColor(LIGHT, 'diffuse');
    controller.onChange(function(value) {
      for (i = 0, l = scene.lights.length; i < l; i++) {
        light = scene.lights[i];
        light.diffuse.set(value);
        light.diffuseHex = light.diffuse.format();
      }
    });
    controller = lightFolder.add(LIGHT, 'count', 0, 5);
    controller.step(1);
    controller.onChange(function(value) {
      if (scene.lights.length !== value) { createLights(); }
    });
    controller = lightFolder.add(LIGHT, 'zOffset', 0, 500);
    controller.step(1);

    // Add Export Controls
    controller = exportFolder.add(EXPORT, 'width', 100, 4000);
    controller.step(100);
    controller = exportFolder.add(EXPORT, 'height', 100, 4000);
    controller.step(100);
    controller = exportFolder.add(EXPORT, 'drawLights');
    controller = exportFolder.add(EXPORT, 'minLightX', 0, 1);
    controller = exportFolder.add(EXPORT, 'maxLightX', 0, 1);
    controller = exportFolder.add(EXPORT, 'minLightY', 0, 1);
    controller = exportFolder.add(EXPORT, 'maxLightY', 0, 1);
    controller = exportFolder.add(EXPORT, 'export');
  }

  //------------------------------
  // Callbacks
  //------------------------------
  function onMouseClick(event) {
    FSS.Vector3.set(attractor, event.x, scene.height - event.y);
    FSS.Vector3.subtract(attractor, center);
    LIGHT.autopilot = !LIGHT.autopilot;
    autopilotController.updateDisplay();
  }

  function onMouseMove(event) {
    FSS.Vector3.set(attractor, event.x, scene.height - event.y);
    FSS.Vector3.subtract(attractor, center);
  }

  function onWindowResize(event) {
    resize(container.offsetWidth, container.offsetHeight);
    render();
  }



  // Let there be light!
  initialise();

})();
