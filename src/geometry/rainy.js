let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(0,40,100)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas'),
  antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)

let rainy;
createMesh()


renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}

function createMesh(){
  // let texture = new THREE.ImageUtils.loadTexture('img/particle/raindrop-3.png');
  console.log(texture);
}
