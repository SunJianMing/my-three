import 'three/examples/js/utils/SceneUtils.js'
console.log(THREE.SceneUtils.createMultiMaterialObject);
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,10,130)
camera.position.set(-50,40,30)
camera.near = 7
camera.far = 80
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({canvas:document.getElementById('canvas'),antialias:true})
renderer.setClearColor(new THREE.Color(0xffffff))
renderer.setSize(window.innerWidth,window.innerHeight)

let cubeGeometry = new THREE.BoxGeometry(4,4,4)
let colorMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00,
  transparent:true,
  blending:THREE.MultiplyBlending
})
let cubeMaterial = new THREE.MeshDepthMaterial()

let cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry,[colorMaterial,cubeMaterial])
// cube.children[1].scale.set(0.9,0.9,0.9)
scene.add(cube)



renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
