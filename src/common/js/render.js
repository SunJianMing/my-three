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

renderScene()

function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}

THREE.createMesh = function(geom){
  let meshMaterial = new THREE.MeshNormalMaterial()
  meshMaterial.side = THREE.DoubleSide
  let wireframeMat = new THREE.MeshBasicMaterial()
  wireframeMat.wireframe = true;
  let mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[meshMaterial,wireframeMat])
  return mesh
}
