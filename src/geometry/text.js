import 'three/examples/js/utils/SceneUtils.js'
import regular from 'three/examples/fonts/helvetiker_regular.typeface.json'




let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(80,50,150)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas')
})
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth,window.innerHeight)

let text;

let axes = new THREE.AxesHelper(20)
scene.add(axes)

let font = new THREE.Font(regular)

const controls = new function(){
  this.text = 'hello world'
  this.size = 10;
  this.height = 5;
  this.weight = 'normal'
  this.font = font;
  this.curveSegments = 12
  this.bevelEnabled = false
  this.bevelThickness = 10
  this.bevelSize = 8
  this.bevelSegments = 3
  this.draw = ()=>{
      if(this.text =='') this.text = 'hello world'
      scene.remove(text)
      let options = {
        size : this.size,
        height:this.height,
        weight:this.weight,
        font:this.font,
        curveSegments:this.curveSegments,
        bevelThickness:this.bevelThickness,
        bevelEnabled : this.bevelEnabled,
        bevelSize : this.bevelSize,
        bevelSegments:this.bevelSegments
      }

      text = createMesh(new THREE.TextGeometry(this.text,options))
      text.position.set(-25,0,0)
      scene.add(text)
  }
}
let gui = new Dat.GUI()
gui.add(controls,'text').onChange(controls.draw)
gui.add(controls,'size',1,120).onChange(controls.draw)
gui.add(controls,'height',1,150).onChange(controls.draw)
gui.add(controls,'weight',['normal','bold']).onChange(controls.draw)
gui.add(controls,'curveSegments',0,20).step(1).onChange(controls.draw)
gui.add(controls,'bevelEnabled').onChange(controls.draw)
gui.add(controls,'bevelSize',0,20).onChange(controls.draw)
gui.add(controls,'bevelSegments',0,20).step(1).onChange(controls.draw)
gui.add(controls,'bevelThickness',0,20).onChange(controls.draw)


controls.draw()





renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
function createMesh(geom) {
            let meshMater = new THREE.MeshNormalMaterial()
            meshMater.side = THREE.DoubleSide
            let wireMater = new THREE.MeshBasicMaterial()
            wireMater.wireframe = true
            var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMater,wireMater]);

            return plane;
        }
