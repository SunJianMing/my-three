import 'three/examples/js/utils/SceneUtils.js'

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/innerHeight,1,1000)
camera.position.set(-20,30,40)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas')
})

renderer.setClearColor(0xeeeeee)
renderer.setSize(window.innerWidth,window.innerHeight)

let plane = createPlane(new THREE.PlaneGeometry(10,14,4,4))
scene.add(plane)

renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
console.log(plane);
let gui = new Dat.GUI()
const controls = new function(){
  this.width = plane.children[0].geometry.parameters.width
  this.height = plane.children[0].geometry.parameters.height
  this.widthSegments = (plane.children[0].geometry.parameters.widthSegments)
  this.heightSegments = (plane.children[0].geometry.parameters.heightSegments)
  this.draw = function(){
    scene.remove(plane)
    plane = createPlane(new THREE.PlaneGeometry(controls.width,
      controls.height,
      Math.round(controls.widthSegments),
      Math.round(controls.heightSegments)
    )
    )
    scene.add(plane)
  }
}
gui.add(controls,'width',10,80).onChange(controls.draw)
gui.add(controls,'height',10,80).onChange(controls.draw)
gui.add(controls,'widthSegments',0,10).onChange(controls.draw)
gui.add(controls,'heightSegments',0,10).onChange(controls.draw)

function createPlane(geometry){

  let phongMaterial = new THREE.MeshNormalMaterial()
  phongMaterial.side = THREE.DoubleSide
  let basicMaterial = new THREE.MeshBasicMaterial()
  basicMaterial.wireframe = true
  let planeg = new THREE.SceneUtils.createMultiMaterialObject(geometry,[phongMaterial,basicMaterial])
  return planeg
}
