# Flat Surface Shader [FSS]

Simple, lightweight **Flat Surface Shader** written in **JavaScript** for rendering lit **Triangles** to a number of contexts. Currently there is support for **WebGL**, **Canvas 2D** and **SVG**. Check out this [demo][demo] to see it in action.

## Understanding Lighting

Simply put, **FSS** uses the [Lambertian Reflectance][lambert] model to calculate the color of a **Triangle** based on an array of **Light** sources within a **Scene**.

### Light

A **Light** is composed of a 3D position **Vector** and 2 **Color** objects defining its **ambient** & **diffuse** emissions. These color channels interact with the **Material** of a **Mesh** to calculate the color of a **Triangle**.

### Triangle

A **Triangle** is constructed from **3 Vertices** which each define the **x, y** and **z** coordinates of a corner. Based on these **3 Vertices**, a forth **3D Vector** is automatically derived at the center of the **Triangle** – this is known as its [**Centroid**][centroid]. Alongside the **Centroid**, a fifth [unit][unit] **Vector** is automatically calculated which defines the surface [**Normal**][normal]. The **Normal** describes the direction that the **Triangle** is facing.

### Geometry

**Geometry** is simply a collection of triangles – nothing more.

### Material

A **Material** is composed of 2 **Color** objects which define the **ambient** & **diffuse** properties of a *surface*.

### Mesh

A **Mesh** is constructed from a **Geometry** object and a **Material** object. All the **Triangles** within the **Geometry** are rendered using the properties of the **Material**.

### Scene

A **Scene** sits at the very top of the stack. It simply manages arrays of **Mesh** & **Light** objects.

### Renderer

The **Renderer** takes all the information in a **Scene** and renders it to a context. Currently **FSS** supports **WebGL**, **Canvas 2D** and **SVG**.

### Calculation

For every **Triangle** in a **Scene** the following calculation is performed:

1. A **Vector** between the Triangle's **Centroid** and the Light's **Position** is calculated and [normalised][normalise]. This can be considered as a single **Ray** travelling from the **Light** to the center of the **Triangle**.
2. The angle beween this **Ray** and the **Normal** of the **Triangle** is then calculated using the [dot product][dotproduct]. This angle is simply a number ranging from -1 to 1. When the **Ray** and the **Normal** are coincident, this value is 0, and when they are perpendicular to one another, this value is 1. This value goes into the negative range when the **Light** is behind the **Triangle**.
3. Firstly, the **diffuse** color of the **Light** is multiplied by the **diffuse** color of the **Material** associated with the **Triangle**. This color is then multiplied by the coincidence angle described above. For example, if the **diffuse** color of the **Light** is **#FFFFFF** `{ R:1, G:1, B:1 }` and the **diffuse** color of the **Material** is **#FF0000** `{ R:1, G:0, B:0 }`, the combined color would be #FF0000 `{ R:1*1=1, G:1*0=0, B:1*0=0 }`. If the coincidence angle was 0.5, the final color of the Triangle would be **#800000** `{ R:1*0.5=0.5, G:0*0.5=0, B:0*0.5=0 }`.
4. In much the same way as above, the **ambient** color of the **Light** is multipled by the **ambient** color of the **Material**. Since **ambient** light is a uniform dissipation of scattered light, it is not modified any further.
5. The final color of the **Triangle** is simply calculated by adding the **diffuse** & **ambient** colors together. Simples.

## Example

**NOTE:** All objects exist within the **FSS** namespace.

```javascript
// 1) Create a Renderer for the context you would like to render to.
//    You can use either the WebGLRenderer, CanvasRenderer or SVGRenderer.
var renderer = new FSS.CanvasRenderer();

// 2) Add the Renderer's element to the DOM:
var container = document.getElementById('container');
container.appendChild(renderer.element);

// 3) Create a Scene:
var scene = new FSS.Scene();

// 4) Create some Geometry & a Material, pass them to a Mesh constructor, and add the Mesh to the Scene:
var geometry = new FSS.Plane(200, 100, 4, 2);
var material = new FSS.Material('#444444', '#FFFFFF');
var mesh = new FSS.Mesh(geometry, material);
scene.add(mesh);

// 5) Create and add a Light to the Scene:
var light = new FSS.Light('#FF0000', '#0000FF');
scene.add(light);

// 6) Finally, render the Scene:
renderer.render(scene);
```

## Building

Install Dependancies:

    npm install uglify-js@2.2.5

Build:

    node build.js

## Inspiration

Please also checkout the [case study on Behance][behance] created by my dear friend [Tobias van Schneider][vanschneider] – [@schneidertobias][schneidertobias].

## Acknowledgments

The architecture of this project was heavily influenced by [three.js][three] and the implementation of the Vector calculations was taken from [glMatrix][glmatrix].

## Author

Matthew Wagerfield: [@mwagerfield][mwagerfield]

## License

Licensed under [MIT][mit]. Enjoy.

[demo]: http://wagerfield.github.com/flat-surface-shader/
[lambert]: http://en.wikipedia.org/wiki/Lambertian_reflectance
[diffuse]: http://en.wikipedia.org/wiki/Diffuse_reflection
[unit]: http://en.wikipedia.org/wiki/Unit_vector
[centroid]: http://en.wikipedia.org/wiki/Centroid
[normal]: http://en.wikipedia.org/wiki/Normal_(geometry)
[normalise]: http://www.fundza.com/vectors/normalize/index.html
[dotproduct]: http://www.mathsisfun.com/algebra/vectors-dot-product.html
[behance]: http://www.behance.net/gallery/Flat-Surface-Shader/7826469
[three]: https://github.com/mrdoob/three.js/
[glmatrix]: https://github.com/toji/gl-matrix
[mwagerfield]: http://twitter.com/mwagerfield
[vanschneider]: http://www.vanschneider.com/
[schneidertobias]: http://twitter.com/schneidertobias
[mit]: http://www.opensource.org/licenses/mit-license.php
