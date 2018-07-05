import 'three/examples/js/utils/SceneUtils.js'

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(-30,30,40)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas')
})
renderer.setClearColor(new THREE.Color(0xeeeeee))
renderer.setSize(window.innerWidth,window.innerHeight)

let sphere = createMesh(new THREE.SphereGeometry(10,10,10))
scene.add(sphere)

let speed = 0;
renderScene()
function renderScene(){

  sphere.rotation.y = speed +=0.01
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}

function createMesh(geom){
  let meshMaterial = new THREE.MeshNormalMaterial()
  meshMaterial.side = THREE.DoubleSide
  let wireframeMat = new THREE.MeshBasicMaterial()
  wireframeMat.wireframe = true;
  let mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[meshMaterial,wireframeMat])
  return mesh
}



let gui = new Dat.GUI()
const controls = new function(){
  this.radius = sphere.children[0].geometry.parameters.radius
  this.widthSegments = sphere.children[0].geometry.parameters.widthSegments
  this.heightSegments = sphere.children[0].geometry.parameters.heightSegments
  this.phiStart = 0
  this.phiLength = 2 *Math.PI
  this.thetaStart = 0;
  this.thetaLength = Math.PI
  this.draw = ()=>{
    scene.remove(sphere)
    sphere = createMesh(new THREE.SphereGeometry(controls.radius,Math.round(controls.widthSegments),Math.round(controls.heightSegments),this.phiStart,this.phiLength,this.thetaStart,this.thetaLength))
    scene.add(sphere)
  }
}
gui.add(controls,'radius',0,50).onChange(controls.draw)
gui.add(controls,'widthSegments',0,20).onChange(controls.draw)
gui.add(controls,'heightSegments',0,20).onChange(controls.draw)
gui.add(controls,'phiStart',0,Math.PI*2).onChange(controls.draw)
gui.add(controls,'phiLength',0.1,Math.PI*2).onChange(controls.draw)
gui.add(controls,'thetaStart',0,Math.PI*2).onChange(controls.draw)
gui.add(controls,'thetaLength',0.001,Math.PI*2).onChange(controls.draw)
