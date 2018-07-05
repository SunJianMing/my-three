let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(0,0,150)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas')
})
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth,window.innerHeight)
createSprite()


renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
function createSprite(){
  let material = new THREE.SpriteMaterial();
  for(let x = -5;x<5;x++){
    for(let y = -5;y<5;y++){
      let sprite = new THREE.Sprite(material)
      sprite.position.set(x*10,y*10,0)
      scene.add(sprite)
    }
  }
}
