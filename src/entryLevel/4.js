import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()
// scene.overrideMaterial = new THREE.MeshDepthMaterial();

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,10,150)
camera.position.set(-50,40,50)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas'),
  antialias:true
})
renderer.setClearColor(new THREE.Color(0xffffff))
renderer.setSize(window.innerWidth,window.innerHeight)

const controls = new function(){
  this.addCube = function(){
    let cubeGeometry = new THREE.BoxGeometry(4,4,4)
    let colorMaterial = new THREE.MeshBasicMaterial({
      color:0xffffff,
      transparent:true,
      blending:THREE.MultiplyBlending
    })
    let cubeMaterial = new THREE.MeshDepthMaterial()
    let cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry,[colorMaterial,cubeMaterial])
    cube.position.x = -60 +Math.round(Math.random()*100)
    cube.position.y = Math.round(Math.random()*10)
    cube.position.z = -100 + Math.round(Math.random()*160)
    scene.add(cube)
  }
}
let i=0;
while(i<50){
  controls.addCube()
  i++
}
let gui = new Dat.GUI()
gui.add(controls,'addCube')
renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
