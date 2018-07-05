import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(30, 40, 50)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true})
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth, window.innerHeight)

let sphereGroup,lathe;


let axes = new THREE.AxesHelper(20)
scene.add(axes)

latheMesh(12, 0.5*Math.PI, Math.PI)

const controls = new function (){
  this.segments = 12;
  this.phiStart = 0.5*Math.PI;
  this.phiLength = Math.PI;
  this.draw = ()=>{
    scene.remove(sphereGroup)
    scene.remove(lathe);
    latheMesh(this.segments,this.phiStart,this.phiLength)
  }
}
let gui = new Dat.GUI()
gui.add(controls,'segments',0,30).onChange(controls.draw)
gui.add(controls,'phiStart',0,2*Math.PI).onChange(controls.draw)
gui.add(controls,'phiLength',0,2*Math.PI).onChange(controls.draw)




renderScene()
function renderScene() {
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}

function createMesh(geom) {
    console.log(geom);
    let meshMater = new THREE.MeshNormalMaterial()
    meshMater.side = THREE.DoubleSide
    let wireMater = new THREE.MeshBasicMaterial()
    wireMater.wireframe = true
    let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMater, wireMater])
    return mesh
}

function latheMesh(segments, phiStart, phiLength) {
    let points = []
    let height = 5;
    let count = 35

    for (let i = 0; i < count; i++) {
        points.push(new THREE.Vector2((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12, (i - count) + count / 2))
    }
    sphereGroup = new THREE.Object3D()

    let sphereMater = new THREE.MeshBasicMaterial({color: 0xff0000})
    points.forEach((point) => {
        let sphereGeom = new THREE.SphereGeometry(0.2)
        let sphere = new THREE.Mesh(sphereGeom, sphereMater)
        sphere.position.x = point.x
        sphere.position.y = point.y
        sphereGroup.add(sphere)
    })
    scene.add(sphereGroup)

    lathe = createMesh(new THREE.LatheGeometry(points, segments, phiStart, phiLength));


    scene.add(lathe);
}
