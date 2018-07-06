import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(0,0,100)
camera.lookAt(scene.position);

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas'),
  antialias:true
})
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth,window.innerHeight)

let torusKnot = createMesh(new THREE.TorusKnotGeometry(10,5,20))
scene.add(torusKnot)

renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}

function createSprite(){
  let canvas = document.createElement('canvas')
  canvas.width = 16,canvas.height = 16;
  let ctx = canvas.getContext('2d')
  let grad = ctx.createRadialGradient(canvas.width/2,canvas.height/2,0,canvas.width/2,canvas.height/2,canvas.width/2)
  grad.addColorStop(0,'rgba(255,255,255,1)')
  grad.addColorStop(0.2,'rgba(0,255,255,1)')
  grad.addColorStop(0.4,'rgba(0,0,64,1)')
  grad.addColorStop(1,'rgba(0,0,0,1)')
  ctx.fillStyle = grad
  ctx.fillRect(0,0,canvas.width,canvas.height)
  let texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;
  return texture
}
function createMesh(geom){
  let material = new THREE.MeshNormalMaterial()
  material.side = THREE.DoubleSide
  let mesh = new THREE.Mesh(geom,material)
  return mesh
}
