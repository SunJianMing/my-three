import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(-30,40,30)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas')
})
renderer.setClearColor(new THREE.Color(0xeeeeee))
renderer.setSize(window.innerWidth,window.innerHeight)

let circle = createCircle(new THREE.CircleGeometry(5,10,0,2*Math.PI))
scene.add(circle)
console.log(circle);
let gui = new Dat.GUI()
const controls = new function(){

  this.radius = circle.children[0].geometry.parameters.radius
  this.segments = circle.children[0].geometry.parameters.segments
  this.thetaStart = circle.children[0].geometry.parameters.thetaStart
  this.thetaLength = circle.children[0].geometry.parameters.thetaLength
  this.draw = function(){
    scene.remove(circle)
    circle = createCircle(new THREE.CircleGeometry(
      controls.radius,Math.round(controls.segments),
      controls.thetaStart,
      controls.thetaLength,
  ))
  scene.add(circle)
  }
}
gui.add(controls,'radius',0,40).onChange(controls.draw)
gui.add(controls,'segments',0,40).onChange(controls.draw)
gui.add(controls,'thetaStart',0,Math.PI*2).onChange(controls.draw)
gui.add(controls,'thetaLength',0.01,Math.PI*2).onChange(controls.draw)

let speed = 0;
renderScene()
function renderScene(){
  circle.rotation.y = speed+=0.01
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}

function createCircle(geom){
    let colorMesh = new THREE.MeshNormalMaterial()
    colorMesh.side = THREE.DoubleSide
    let circleMesh = new THREE.MeshBasicMaterial()
    circleMesh.wireframe = true
    let mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[colorMesh,circleMesh])
    return mesh
}
