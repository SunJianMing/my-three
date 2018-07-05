import 'common/js/threebsp.js'
import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
camera.position.set(0,20,20);
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas')
})
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth,window.innerHeight)

let result;



let sphere1 = createMesh(new THREE.SphereGeometry(5,20,20));
sphere1.position.x = -2;
let sphere2 = createMesh(new THREE.SphereGeometry(5,20,30))
sphere2.position.x = 3
let cube = createMesh(new THREE.BoxGeometry(5,5,5))
cube.position.x = -7

scene.add(sphere1)
scene.add(sphere2)
scene.add(cube)

const controls = new  function(){
  this.sphere1PosX = sphere1.position.x
  this.sphere1PosY = sphere1.position.y
  this.sphere1PosZ = sphere1.position.z

  this.sphere2PosX = sphere2.position.x
  this.sphere2PosY = sphere2.position.y
  this.sphere2PosZ = sphere2.position.z

  this.cubePosX = cube.position.x
  this.cubePosY = cube.position.y
  this.cubePosZ = cube.position.z
  this.scaleX = cube.scale.x
  this.scaleY = cube.scale.y
  this.scaleZ = cube.scale.z

  this.actionCube = 'subtract'
  this.actionSphere = 'subtract'

  this.showResult = ()=>{
        drawResult()
  }
  this.hideWireframe = false
  this.rotateResult = false
}
let gui = new Dat.GUI()
let guiSphere1 = gui.addFolder('Sphere1')
guiSphere1.add(controls,'sphere1PosX',-15,15).onChange(()=>{
  sphere1.position.set(controls.sphere1PosX,controls.sphere1PosY,controls.sphere1PosZ)
})
guiSphere1.add(controls,'sphere1PosY',-15,15).onChange(()=>{
  sphere1.position.set(controls.sphere1PosX,controls.sphere1PosY,controls.sphere1PosZ)
})
guiSphere1.add(controls,'sphere1PosZ',-15,15).onChange(()=>{
  sphere1.position.set(controls.sphere1PosX,controls.sphere1PosY,controls.sphere1PosZ)
})

let guiSphere2 = gui.addFolder('Sphere2')
guiSphere2.add(controls,'sphere2PosX',-15,15).onChange(()=>{
  sphere2.position.set(controls.sphere2PosX,controls.sphere2PosY,controls.sphere2PosZ)
})
guiSphere2.add(controls,'sphere2PosY',-15,15).onChange(()=>{
  sphere2.position.set(controls.sphere2PosX,controls.sphere2PosY,controls.sphere2PosZ)
})
guiSphere2.add(controls,'sphere2PosZ',-15,15).onChange(()=>{
  sphere2.position.set(controls.sphere2PosX,controls.sphere2PosY,controls.sphere2PosZ)
})
guiSphere2.add(controls,'actionSphere', ["subtract", "intersect", "union", "none"])

let guiCube = gui.addFolder('Cube');
guiCube.add(controls,'cubePosX',-15,15).onChange(()=>{
  cube.position.set(controls.cubePosX,controls.cubePosY,controls.cubePosZ)
})
guiCube.add(controls,'cubePosY',-15,15).onChange(()=>{
  cube.position.set(controls.cubePosX,controls.cubePosY,controls.cubePosZ)
})
guiCube.add(controls,'cubePosZ',-15,15).onChange(()=>{
  cube.position.set(controls.cubePosX,controls.cubePosY,controls.cubePosZ)
})
guiCube.add(controls,'scaleX',0,10).onChange((e)=>{
  cube.scale.x = e
})
guiCube.add(controls,'scaleY',0,10).onChange((e)=>{
  cube.scale.y = e
})
guiCube.add(controls,'scaleZ',0,10).onChange((e)=>{
  cube.scale.z = e
})
guiCube.add(controls,'actionCube',['subtract','intersect','union','none'])

gui.add(controls,'showResult')
gui.add(controls,'rotateResult')
gui.add(controls,'hideWireframe').onChange(()=>{
  if(!controls.hideWireframe){
    sphere1.material.visible = true
    sphere2.material.visible = true
    cube.material.visible = true
  }else{
    sphere1.material.visible = false
    sphere2.material.visible = false
    cube.material.visible = false

  }
})
let step = 0;
renderScene()
function renderScene(){

  if(controls.rotateResult && result){
    result.rotation.y = step+=0.01
    result.rotation.x = step
  }



  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}

function createMesh(geom){
  let meshMater = new THREE.MeshNormalMaterial()
  meshMater.side = THREE.DoubleSide
  let wireMater = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.5, wireframeLinewidth: 0.5})
  wireMater.wireframe = true;

  let mesh = new THREE.Mesh(geom,wireMater)
  // let mesh = THREE.SceneUtils.createMultiMaterialObject(geom,[meshMater,wireMater])
  return mesh
}

function drawResult(){
    scene.remove(result)
    let sphere1BSP = new ThreeBSP(sphere1)
    let sphere2BSP = new ThreeBSP(sphere2)
    let cubeBSP = new ThreeBSP(cube)

    let resultBSP;
    switch (controls.actionSphere) {
      case 'subtract':
          resultBSP = sphere1BSP.subtract(sphere2BSP)
        break;
      case 'intersect':
        resultBSP = sphere1BSP.intersect(sphere2BSP)
      break;
      case 'union':
        resultBSP = sphere1BSP.union(sphere2BSP)
        break;
      case 'none':

    }

    if(!resultBSP) resultBSP = sphere1BSP;
    switch (controls.actionCube) {
      case 'subtract':
        resultBSP = resultBSP.subtract(cubeBSP)
        break;
      case 'intersect':
        resultBSP = resultBSP.intersect(cubeBSP);
        break;
      case 'union':
        resultBSP = resultBSP.union(cubeBSP);
        break;
      case 'none':
    }
    if(controls.actionSphere == 'none' && controls.actionCube == 'none'){}else{
      result = resultBSP.toMesh()
      result.geometry.computeFaceNormals()
      result.geometry.computeVertexNormals()
      scene.add(result)
    }
}
