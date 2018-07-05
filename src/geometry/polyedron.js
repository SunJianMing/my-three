import 'three/examples/js/utils/SceneUtils.js'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 40, 50)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true})
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth, window.innerHeight)

let aues = new THREE.AxesHelper(20)
scene.add(aues)

let polyhedron = crateMesh(new THREE.IcosahedronGeometry(10, 0))
scene.add(polyhedron)

let gui = new Dat.GUI()

const controls = new function() {
    this.type = 'icosahedron'
    this.radius = 10,
    this.details = 0
    this.draw = () => {
      console.log(this.type);
      scene.remove(polyhedron)
        switch (this.type) {
            case 'icosahedron':
                polyhedron = crateMesh(new THREE.IcosahedronGeometry(this.radius, this.details))
                break;
            case 'dodecahedron':
                polyhedron = crateMesh(new THREE.DodecahedronGeometry(this.radius, this.details))
                break;
            case 'tetrahedron':
                polyhedron = crateMesh(new THREE.TetrahedronGeometry(this.radius, this.details))
                break;
            case 'octahedron':
                polyhedron = crateMesh(new THREE.OctahedronGeometry(this.radius, this.details))
                break;
            case 'polyhedron':
                let verties = [1,0,1,1,0,-1,-1,0,0,0,10]
                let faces = [3,0,1,3,1,2,3,2,0,0,1,2]
                polyhedron = crateMesh(new THREE.PolyhedronGeometry(verties,faces,this.radius, this.details))
                break;
        }
        scene.add(polyhedron)
    }
}
gui.add(controls,'radius',0,20).step(1).onChange(controls.draw)
gui.add(controls,'details',0,3).step(1).onChange(controls.draw)
gui.add(controls, 'type', ['icosahedron', 'dodecahedron', 'tetrahedron', 'octahedron', 'polyhedron']).onChange(controls.draw)

renderScene()
function renderScene() {
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}
function crateMesh(geom) {
    let MeshMater = new THREE.MeshNormalMaterial()
    MeshMater.side = THREE.DoubleSide
    MeshMater.transparent = true
    MeshMater.opacity = 0.5
    let wireMater = new THREE.MeshBasicMaterial()
    wireMater.wireframe = true
    let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [MeshMater, wireMater])
    return mesh
}
