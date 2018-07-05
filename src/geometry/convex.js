import 'three/examples/js/utils/SceneUtils.js'
import 'three/examples/js/QuickHull.js'
import 'three/examples/js/geometries/ConvexGeometry.js'

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(-30, 40, 50);
camera.lookAt(scene.position);

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true})
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth, window.innerHeight);

let spGroup,
    convex;

let Axes = new THREE.AxesHelper(20)
scene.add(Axes);
 createConvex()

let gui = new Dat.GUI()
const controls = new function(){
  this.refresh = ()=>{
    scene.remove(spGroup)
    scene.remove(convex)
    createConvex()
  }
}
gui.add(controls,'refresh')

renderScene()
function renderScene() {
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}

function createConvex() {
    let points = []
    for (let i = 0; i < 30; i++) {
        let randomX = -15 + Math.round(Math.random() * 30)
        let randomY = -15 + Math.round(Math.random() * 30)
        let randomZ = -15 + Math.round(Math.random() * 30)
        points.push(new THREE.Vector3(randomX, randomY, randomZ))
    }
    spGroup = new THREE.Object3D()
    let sphere = new THREE.MeshBasicMaterial({color: 0xff0000})
    points.forEach((point) => {

        var spGeom = new THREE.SphereGeometry(0.2)
        var spMesh = new THREE.Mesh(spGeom, sphere)
        spMesh.position.copy(point)
        spGroup.add(spMesh)
    })
    scene.add(spGroup)

    var hullGeometry = new THREE.ConvexGeometry(points);
    convex = createMesh(hullGeometry);
    scene.add(convex);

}
function createMesh(geom) {

    let meshMater = new THREE.MeshNormalMaterial()
    meshMater.side = THREE.DoubleSide
    meshMater.transparent = true
    meshMater.opacity = 0.5
    let wireMater = new THREE.MeshBasicMaterial()
    wireMater.wireframe = true
    let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMater, wireMater])
    return mesh
}
