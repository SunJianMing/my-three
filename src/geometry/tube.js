import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(-50,60,60)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas')
})
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth,window.innerHeight)

let sphereGroup,tube;

let axes = new THREE.AxesHelper(30)
scene.add(axes)

function createTube(points,tubeSegments,radius,radialSegments,closed){
  sphereGroup = new THREE.Object3D()
  let sphereMater = new THREE.MeshBasicMaterial({color:0xff0000})
  points.forEach((point)=>{
    let sphereGeom = new THREE.SphereGeometry(0.2)
    let sphere = new THREE.Mesh(sphereGeom,sphereMater)
    sphere.position.copy(point)
    sphereGroup.add(sphere)
  })
  scene.add(sphereGroup)

  let tubeGeom = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),tubeSegments,radius,radialSegments,closed)

  tube = createMesh(tubeGeom)
  scene.add(tube)
}


const controls = new function(){
  this.tubeLength = 5
  this.radius = 2;
  this.tubularSegments = 64,
  this.radialSegments = 8
  this.closed = false;
  this.points = []
  this.newPoint = ()=>{
    let points = []
    for(let i=0;i<this.tubeLength;i++){
      let randomX = -20 + Math.round(Math.random()*30)
      let randomY = -15 + Math.round(Math.random()*40)
      let randomZ = -20 + Math.round(Math.random()*40)
      points.push(new THREE.Vector3(randomX,randomY,randomZ))
    }
    this.points = points
    this.draw()
  }
  this.draw = ()=>{
    scene.remove(sphereGroup)
    scene.remove(tube)
    createTube(this.points,this.tubularSegments,this.radius,this.radialSegments,this.closed)
  }
}
let gui = new Dat.GUI()
gui.add(controls,'newPoint')
gui.add(controls,'tubeLength',2,10).step(1).onChange(controls.newPoint)
gui.add(controls,'radius',0,10).onChange(controls.draw)
gui.add(controls,'tubularSegments',0,200).step(1).onChange(controls.draw)
gui.add(controls,'radialSegments',3,20).step(1).onChange(controls.draw)
gui.add(controls,'closed').onChange(controls.draw)


controls.newPoint()
renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
function createMesh(geom){
  // let meshMater = new THREE.MeshBasicMaterial({color:0x00ff00,transparent:true,opacity:0.2})
  let meshMater = new THREE.MeshNormalMaterial()
  meshMater.side = THREE.DoubleSide
  meshMater.transparent = true
  // meshMater.opacity = 0.5
  let wireMater = new THREE.MeshBasicMaterial()
  wireMater.wireframe = true;
  let mesh = THREE.SceneUtils.createMultiMaterialObject(geom,[meshMater,wireMater])
  return mesh
}
