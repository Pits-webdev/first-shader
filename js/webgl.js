/* three.js */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertex from '../Shaders/vertexShader.glsl';
import fragment from '../Shaders/fragmentShader.glsl';

export const webgl = () => {
  // grab Canvas container
  const canvas = document.querySelector('canvas.webgl');

  // browser sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 2.2);

  //scene
  const scene = new THREE.Scene();

  //geomety "z.b cube or circle"
  const geometry = new THREE.SphereBufferGeometry(1, 32, 32);

  // uniforms for custom Shader
  const uniforms = {
    time: { value: 0.5 },
    speed: { value: 0.25 },
    resolution: { value: 1.2 },
    contrast: { value: 4.0 },
    ringScale: { value: 0.9 },
    noiseScale: { value: 1.5 },
    frequency: { value: 4 },
    color1: {
      value: {
        r: 0.0,
        g: 0.3843137254901961,
        b: 1,
      },
    },
    color2: {
      value: {
        r: 0.00392156862745098,
        g: 0.09411764705882353,
        b: 0.00392156862745098,
      },
    },
  };

  //custom Shader
  const customShaderMateriel = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
  });

  //material
  const material = new THREE.MeshBasicMaterial({
    color: 'blue',
    //transparent: true,
    //wireframe: true,
  });

  //mesh
  const object = new THREE.Mesh(geometry, customShaderMateriel);
  scene.add(object);

  // Lights
  /*  const pointLight = new THREE.PointLight('#00b3ff', 1);
  pointLight.position.x = 3.5;
  pointLight.position.y = 10;
  pointLight.position.z = 4.4;
  scene.add(pointLight); */

  //Orbit Controls
  const controls = new OrbitControls(camera, canvas);
  controls.update();

  //renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const clock = new THREE.Clock();

  //tick
  const tick = () => {
    object.rotation.x += 0.002;
    object.rotation.y += 0.002;
    object.rotation.z += 0.005;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);

    uniforms.time.value = clock.getElapsedTime();
  };
  tick();

  //resize
  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};
