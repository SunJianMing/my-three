let scene = new THREE.Scene()
let sceneOrtho = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,250)
let cameraOrtho = new THREE.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -10, 10)
camera.position.set(0,0,50)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas'),
  antialias:true
})
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth,window.innerHeight)



let sphereGeom = new THREE.SphereGeometry(15,20,20)
let sphereMater = new THREE.MeshNormalMaterial()
let sphere = new THREE.Mesh(sphereGeom,sphereMater)
scene.add(sphere)

let controls = {
  size:50,
  transparent:true,
  opacity:1,
  color:0xffffff,
  spriteNumber:0,
  draw:function(){
    sceneOrtho.children.forEach((child)=>{
      if(child instanceof THREE.Sprite) sceneOrtho.remove(child)
    })
    createSprite(controls.size,controls.transparent,controls.opacity,controls.color,controls.spriteNumber)
  }
}
let gui = new Dat.GUI()
gui.add(controls,'size',0,120).onChange(controls.draw)
gui.add(controls,'transparent').onChange(controls.draw)
gui.add(controls,'opacity',0,1).onChange(controls.draw)
gui.addColor(controls,'color').onChange(controls.draw)
gui.add(controls,'spriteNumber',0,4).step(1).onChange(controls.draw)
controls.draw()

let step = 0;

renderScene()
function renderScene(){
  camera.position.y = Math.sin(step+=0.01)*20;

  sceneOrtho.children.forEach((v)=>{
    if(v instanceof THREE.Sprite){
      v.position.x += v.velocityX
      if(v.position.x > window.innerWidth){
        v.velocityX = -5
        controls.spriteNumber++;
        v.material.map.offset.set(1/5*(controls.spriteNumber%4),0)
      }
      if(v.position.x < 0){
        v.velocityX = 5
      }
    }
  })

  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
  renderer.autoClear = false
  renderer.render(sceneOrtho,cameraOrtho)
}
function createSprite(size,transparent,opacity,color,spriteNumber){
  let texture = new THREE.TextureLoader().load('./assets/img/sprite-sheet.png');
  let material = new THREE.SpriteMaterial({
    transparent,
    opacity,
    color,
    map:texture
  })

  material.map.offset = new THREE.Vector2(0.2*spriteNumber,0)
  material.map.repeat = new THREE.Vector2(1/5,1)
  material.depthTest = false
  material.blending = THREE.AdditiveBlending

  let sprite = new THREE.Sprite(material)
  sprite.scale.set(size,size,size)
  sprite.position.set(100,50,-0)
  sprite.velocityX = 5;
  sceneOrtho.add(sprite)

}
