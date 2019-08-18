/* global AFRAME, THREE */

const vertexShader =`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform vec3 color;
uniform float time;

void main() {
  // Use sin(time), which curves between 0 and 1 over time,
  // to determine the mix of two colors:
  //    (a) Dynamic color where 'R' and 'B' channels come
  //        from a modulus of the UV coordinates.
  //    (b) Base color.
  // 
  // The color itself is a vec4 containing RGBA values 0-1.
  gl_FragColor = mix(
    vec4(1., mod(vUv , 0.05) * 20.0, 1.0),
    vec4(1., mod(vUv , 0.08) * 10.0, 1.0 ),
    sin(time)
  );
}`;


AFRAME.registerComponent('material-displacement', {
  /**
   * Creates a new THREE.ShaderMaterial using the two shaders defined
   * in vertex.glsl and fragment.glsl.
   */
  init: function () {
    this.material  = new THREE.ShaderMaterial({
      uniforms: {time: { value: 0.0 }},
      vertexShader,
      fragmentShader      
    });
    this.el.addEventListener('model-loaded', () => this.update());
  },

  /**
   * Apply the material to the current entity.
   */
  update: function () {
    const mesh = this.el.getObject3D('mesh');
    if (mesh) {
      mesh.material = this.material;
    }
  },

  /**
   * On each frame, update the 'time' uniform in the shaders.
   */
  tick: function (t) {
    this.material.uniforms.time.value = t / 1000;
  }
  
})
