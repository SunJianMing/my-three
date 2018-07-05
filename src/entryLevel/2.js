
//帧频
let stats = initStats()
//场景
let scene = new T.Scene()
//雾化效果
scene.fog = new T.Fog(0xffffff,0.015,100)
//相机
let camera = new T.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)
scene.add(camera)
//渲染器
let renderer = new T.WebGLRenderer()
renderer.setClearColor(new T.Color(0xEEEEEE,1.0))
renderer.setSize(window.innerWidth,window.innerHeight)
//是否增加阴影
renderer.shadowMapEnabled = true;

//物品--平板
let planeGeometry = new T.PlaneGeometry(60,40)
console.log(planeGeometry);
let planeMaterial = new T.MeshLambertMaterial({color:0xffffff})
let plane = new T.Mesh(planeGeometry,planeMaterial)
//是否接受阴影
plane.receiveShadow = true;
//平板到位置
plane.rotation.x = -0.5*Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane)



// 相机位置
camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position)


//环境光
let ambientlight = new T.AmbientLight(0x0c0c0c)
scene.add(ambientlight)

//灯光
let spotlight = new T.SpotLight(0xffffff)
spotlight.position.set(-40,60,-10)
spotlight.castShadow = true;
scene.add(spotlight)

document.querySelector('body').appendChild(renderer.domElement)

renderScene()
//控制器

let controls = new function(){
  this.rotationSpeed = 0.02;
  this.numberOfObjects = scene.children.length;
  this.removeCube = function(){
    let allchildren = scene.children;
    let lastObject = scene.children[allchildren.length-1]
    if(lastObject instanceof T.Mesh){
      scene.remove(lastObject)
      this.numberOfObjects = scene.children.length
    }
  }
  this.addCube = function(){
    let cubeSize = Math.ceil(Math.random()*3);
    let cubeGeometry = new T.BoxGeometry(cubeSize,cubeSize,cubeSize);
    let cubeMaterial = new T.MeshLambertMaterial({color:Math.random()*0xffffff})
    let cube = new T.Mesh(cubeGeometry,cubeMaterial)
    cube.castShadow = true;
    cube.name = 'cube--'+scene.children.length

    cube.position.x = -30 + Math.round(Math.random()*planeGeometry.parameters.width)
    cube.position.y = Math.round(Math.random()*5)
    cube.position.z = -20 + Math.round(Math.random()*planeGeometry.parameters.height)

    scene.add(cube);
    console.log(scene.children.length,this);
    this.numberOfObjects = scene.children.length
  }
  this.outputObjects = function(){
    console.log(scene.children);
  }
}
let gui = new dat.GUI();
gui.add(controls,'rotationSpeed',0,0.5)
gui.add(controls,'addCube')
gui.add(controls,'removeCube')
gui.add(controls,'outputObjects')
gui.add(controls,'numberOfObjects').listen()

let i = 0;
function renderScene(){
  stats.update()

  scene.traverse(function(e){
    if(e instanceof T.Mesh && e != plane){
      e.rotation.x += controls.rotationSpeed
      e.rotation.y += controls.rotationSpeed
      e.rotation.z += controls.rotationSpeed
    }
  })
  i++
  if(i<100){
    controls.addCube()
  }

  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
function initStats(){

  let stats = new Stats()
  stats.setMode(0)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.let = '0'
  stats.domElement.style.top = '0'
  document.querySelector('#stats-output').appendChild(stats.domElement)
  return stats
}
