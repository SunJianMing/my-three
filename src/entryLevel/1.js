//three版本为0.69.0
var dat_gui = require('dat-gui')
console.log(dat_gui);

let stats = initStats()

//场景
let scene =new T.Scene()
//照相机
let camera = new T.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
//渲染器
let renderer = new T.WebGLRenderer();
renderer.setClearColor(new T.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.shadowMapEnabled = true

let axes = new T.AxisHelper( 20 )
scene.add(axes)

let planeGeometry = new T.PlaneGeometry(60,20);
let planeMeterial = new T.MeshLambertMaterial({color:0xffffff});
let plane = new T.Mesh(planeGeometry,planeMeterial)

plane.rotation.x = -0.5*Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane)
plane.receiveShadow = true

let cubeGeometry = new T.CubeGeometry(4,4,4);
let cubeMaterial = new T.MeshLambertMaterial({color:0xff0000});
let cube = new T.Mesh(cubeGeometry,cubeMaterial)
cube.castShadow = true
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube)

let sphereGeometry = new T.SphereGeometry(4,20,20);
let sphereMaterial = new T.MeshLambertMaterial({color:0x7777ff})
let sphere = new T.Mesh(sphereGeometry,sphereMaterial)

sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow = true
scene.add(sphere)


let spotlight = new T.SpotLight(0xffffff)
spotlight.position.set(-30,60,-10)
spotlight.castShadow = true
scene.add(spotlight)


camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position)



document.querySelector('body').appendChild(renderer.domElement)

//动画
var step = 0;
//控制器
let controls = new function(){
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.03;
  this.size = 0;
}
let gui = new dat_gui.GUI()
gui.add(controls,'rotationSpeed',0,0.5)
gui.add(controls,'bouncingSpeed',0,0.5)
renderScene()
function renderScene(){
  stats.update()

  cube.rotation.x += controls.rotationSpeed;
  cube.rotation.y += controls.rotationSpeed;
  cube.rotation.z += controls.rotationSpeed;


  step += controls.bouncingSpeed
  sphere.position.x = 20 +(10*(Math.cos(step)))
  sphere.position.y = 2 +(10*(Math.abs(Math.sin(step))))

  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
//帧频
function initStats(){
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            console.log(stats);
  document.querySelector('#stats-output').appendChild(stats.domElement)
  return stats
}
