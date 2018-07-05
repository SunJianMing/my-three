import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(-30, 40, 30)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')})
renderer.setClearColor(new THREE.Color(0xeeeeee))
renderer.setSize(window.innerWidth, window.innerHeight)

let cube = createMesh(new THREE.BoxGeometry(20, 20, 20, 1, 1, 1))
scene.add(cube)
console.log(cube.children[0].geometry.parameters);
let gui = new Dat.GUI()
const controls = new function() {
    this.width = cube.children[0].geometry.parameters.width
    this.height = cube.children[0].geometry.parameters.height
    this.depth = cube.children[0].geometry.parameters.depth
    this.widthSegments = cube.children[0].geometry.parameters.widthSegments
    this.heightSegments = cube.children[0].geometry.parameters.heightSegments
    this.depthSegments = cube.children[0].geometry.parameters.depthSegments
    this.draw = () => {
        scene.remove(cube)
        cube = createMesh(new THREE.BoxGeometry(controls.width, controls.height, controls.depth,Math.round(controls.widthSegments),Math.round(controls.heightSegments),Math.round(controls.depthSegments)))
        scene.add(cube)
    }
}

gui.add(controls, 'width', 0, 50).onChange(controls.draw)
gui.add(controls, 'height', 0, 50).onChange(controls.draw)
gui.add(controls, 'depth', 0, 50).onChange(controls.draw)
gui.add(controls, 'widthSegments', 0, 50).onChange(controls.draw)
gui.add(controls, 'heightSegments', 0, 50).onChange(controls.draw)
gui.add(controls, 'depthSegments', 0, 50).onChange(controls.draw)

let speed = 0;
renderScene()
function renderScene() {
  cube.rotation.y = speed += 0.01
    cube.rotation.x = speed += 0.01
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}

function createMesh(geom) {
    let meshMaterial = new THREE.MeshNormalMaterial()
    meshMaterial.side = THREE.DoubleSide
    let wireframeMat = new THREE.MeshBasicMaterial()
    wireframeMat.wireframe = true
    let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireframeMat])
    return mesh
}
