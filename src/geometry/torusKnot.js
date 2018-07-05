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

let torusKnot = createMesh(new THREE.TorusKnotGeometry(5,2,10,10,2,3))
scene.add(torusKnot)

let gui = new Dat.GUI()
const controls = new function(){
  let {parameters} = torusKnot.children[0].geometry
  console.log(parameters);
  this.radius = parameters.radius
  this.tube = parameters.tube
  this.radialSegments = parameters.radialSegments
  this.tubularSegments = parameters.tubularSegments
  this.p = parameters.p
  this.q = parameters.q
  this.draw = ()=>{
    scene.remove(torusKnot)
    torusKnot = createMesh(new THREE.TorusKnotGeometry(this.radius,this.tube,Math.round(this.radialSegments),Math.round(this.tubularSegments),Math.round(this.p),Math.round(this.q)))
    scene.add(torusKnot)
  }
}

gui.add(controls,'radius',1,20).onChange(controls.draw)
gui.add(controls,'tube',0.4,20).onChange(controls.draw)
gui.add(controls,'radialSegments',2,30).onChange(controls.draw)
gui.add(controls,'tubularSegments',2,30).onChange(controls.draw)
gui.add(controls,'p',2,30).onChange(controls.draw)
gui.add(controls,'q',3,30).onChange(controls.draw)


let speed = 0;
renderScene()
function renderScene(){
  torusKnot.rotation.y = speed-=0.01
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
