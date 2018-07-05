let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(-30, 40, 40)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')})
renderer.setClearColor(new THREE.Color(0xeeeeee))
renderer.setSize(window.innerWidth, window.innerHeight)

let planeGeometry = new THREE.PlaneGeometry(60, 40)
let planeMaterial = new THREE.MeshBasicMaterial({color: 0x777777})
// planeMaterial.side = THREE.DoubleSide
let plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.set(0.5 * Math.PI, 0, 0)
scene.add(plane)

let group = new THREE.Mesh()

let mats = []
mats.push(new THREE.MeshBasicMaterial({color: 0x009e60}))
mats.push(new THREE.MeshBasicMaterial({color: 0x009e60}))
mats.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))
mats.push(new THREE.MeshBasicMaterial({color: 0x0051ba}))
mats.push(new THREE.MeshBasicMaterial({color: 0xffd500}))
mats.push(new THREE.MeshBasicMaterial({color: 0xffd500}))
mats.push(new THREE.MeshBasicMaterial({color: 0xff5800}))
mats.push(new THREE.MeshBasicMaterial({color: 0xff5800}))
mats.push(new THREE.MeshBasicMaterial({color: 0xC41E3A}))
mats.push(new THREE.MeshBasicMaterial({color: 0xC41E3A}))
mats.push(new THREE.MeshBasicMaterial({color: 0xffffff}))
mats.push(new THREE.MeshBasicMaterial({color: 0xffffff}))
// let faceMaterial = new THREE.MeshFaceMaterial(mats)

for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
            let cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9);
            let cube = new THREE.Mesh(cubeGeom, mats);
            cube.position.set(x * 3 - 3, y * 3+3, z * 3 - 3);
            group.add(cube);
        }
    }
}
scene.add(group)

renderScene()
function renderScene() {
    group.rotation.y += 0.02
    plane.rotation.set(-0.5 * Math.PI, 0, 0)
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}
