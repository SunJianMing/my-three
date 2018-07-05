import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(-30,40,30)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas'),
  antialias:true
})
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth,window.innerHeight)

let torus = createMesh(new THREE.TorusGeometry(5,2,10,10,2*Math.PI))
scene.add(torus)

let gui = new Dat.GUI()
const controls = new function(){
  let {parameters} = torus.children[0].geometry
  this.radius = parameters.radius
  this.tube = parameters.tube
  this.radialSegments = parameters.radialSegments
  this.tubularSegments = parameters.tubularSegments
  this.arc = parameters.arc
  this.draw = ()=>{
    scene.remove(torus)
    torus = createMesh(new THREE.TorusGeometry(this.radius,this.tube,Math.round(this.radialSegments),Math.round(this.tubularSegments),this.arc))
    scene.add(torus)
  }
}

gui.add(controls,'radius',1,20).onChange(controls.draw)
gui.add(controls,'tube',0.4,20).onChange(controls.draw)
gui.add(controls,'radialSegments',2,30).onChange(controls.draw)
gui.add(controls,'tubularSegments',2,30).onChange(controls.draw)
gui.add(controls,'arc',0,2*Math.PI).onChange(controls.draw)

let speed = 0;
renderScene()
function renderScene(){
  // torus.rotation.y = speed-=0.01
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}

function createMesh(geom){
  let meshMaterial = new THREE.MeshNormalMaterial()
  meshMaterial.side = THREE.DoubleSide
  let wireframeMat = new THREE.MeshBasicMaterial()
  wireframeMat.wireframe = true
  let mesh = THREE.SceneUtils.createMultiMaterialObject(geom,[meshMaterial,wireframeMat])
  return mesh
}
