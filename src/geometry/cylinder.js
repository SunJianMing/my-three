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

let cylinder = createMesh(new THREE.CylinderGeometry(10,10,10,10,10))
scene.add(cylinder)
console.log(cylinder.children[0].geometry);
let speed = 0;
renderScene()
function renderScene(){

  cylinder.rotation.y = speed +=0.01
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
  let cylinderParameters = cylinder.children[0].geometry.parameters
  this.radiusTop = cylinderParameters.radiusTop
  this.radiusBottom = cylinderParameters.radiusBottom
  this.height = cylinderParameters.height
  this.radialSegments = cylinderParameters.radialSegments
  this.heightSegments = cylinderParameters.heightSegments
  this.openEnded = false

  this.draw = ()=>{
    scene.remove(cylinder)
    cylinder = createMesh(new THREE.CylinderGeometry(this.radiusTop,this.radiusBottom,this.height,Math.round(this.radialSegments),Math.round(this.heightSegments),this.openEnded))
    scene.add(cylinder)
  }
}
gui.add(controls,'radiusTop',-40,40).onChange(controls.draw)
gui.add(controls,'radiusBottom',-40,40).onChange(controls.draw)
gui.add(controls,'height',0,40).onChange(controls.draw)
gui.add(controls,'radialSegments',3,40).onChange(controls.draw)
gui.add(controls,'heightSegments',3,40).onChange(controls.draw)
gui.add(controls,'openEnded').onChange(controls.draw)
