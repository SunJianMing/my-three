let stats = initStats()
let scene = new T.Scene()
scene.fog = new T.Fog(0xffffff,0.015,100)
let camera = new T.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)

scene.add(camera)

let renderer = new T.WebGLRenderer()
renderer.setClearColor(new T.Color(0xEEEEEE))
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.shadowMapEnabled = true;

let planeGeometry = new T.PlaneGeometry(60,40)
let planeMaterial = new T.MeshLambertMaterial({color:0xffffff})
let plane = new T.Mesh(planeGeometry,planeMaterial)
plane.receiveShadow = true;
plane.rotation.x = -0.5*Math.PI;

plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane)

camera.position.x = -40;
camera.position.y = 40;
camera.position.z = 30
camera.lookAt(scene.position)

let spotlight = new T.SpotLight(0xffffff)
spotlight.position.set(-40,60,-10)
spotlight.castShadow = true;
scene.add(spotlight)

let ambientlight = new T.AmbientLight(0x0c0c0c)
scene.add(ambientlight)

document.querySelector('body').appendChild(renderer.domElement)




let controls = new function(){
  this.cubeSteep = 0.02;
  this.numberOfObjects = scene.children.length
  this.removeCube = function(){
    let allChildren = scene.children;
    let lastObject = allChildren[allChildren.length-1]
    if(lastObject instanceof T.Mesh){
      scene.remove(lastObject)
      this.numberOfObjects = scene.children.length
    }
  }
  this.addCube = function(){
    let cubeSize = Math.ceil(Math.random()*3)
    console.log(cubeSize);
    let cubeGeometry = new T.BoxGeometry(cubeSize,cubeSize,cubeSize)
    let cubeMaterial = new T.MeshLambertMaterial({color:Math.random()*0xffffff})
    let cube = new T.Mesh(cubeGeometry,cubeMaterial)

    cube.castShadow = true;
    cube.name = 'cude-'+scene.children.length;

    cube.position.x = -30 + Math.round(Math.random()*planeGeometry.parameters.width)
    cube.position.y = Math.round(Math.random()*5)
    cube.position.z = -20 + Math.round(Math.random()*planeGeometry.parameters.height)



    scene.add(cube)
    this.numberOfObjects = scene.children.length
    console.log(scene.children);
  }
}
let gui = new dat.GUI()
gui.add(controls,'cubeSteep',0.02,0.5)
gui.add(controls,'addCube')
gui.add(controls,'removeCube')
gui.add(controls,'numberOfObjects').listen()

let i=0;
renderScene()
function renderScene(){
  stats.update()
  scene.traverse(function(e){
    if(e instanceof T.Mesh && e != plane){
      e.rotation.x += controls.cubeSteep
      e.rotation.y += controls.cubeSteep
      e.rotation.z -= controls.cubeSteep
    }
  })
  i++;
  if(i<100){
    controls.addCube()
  }
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
function initStats(){
  let stats = new Stats()
  stats.setMode(0)
  stats.domElement.style.position= 'absolute'
  stats.domElement.style.left = 0;
  stats.domElement.style.top = 0;
  document.querySelector('#stats-output').appendChild(stats.domElement)
  return stats
}
