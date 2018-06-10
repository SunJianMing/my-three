let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(-25,30,25)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0xEEEEEE))
renderer.setSize(window.innerWidth,window.innerHeight)

let planeGeometry = new THREE.PlaneGeometry(60,20,20,20)
let planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
let plane = new THREE.Mesh(planeGeometry,planeMaterial)

plane.rotation.x = -0.5*Math.PI;
plane.position.set(15,0,0)
scene.add(plane)


let cubeGeometry = new THREE.CubeGeometry(4,4,4)
let cubeMaterial = new THREE.MeshLambertMaterial({color:0xff7777})
let cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
cube.position.set(-4,3,0)
scene.add(cube)

let sphereGeometry = new THREE.SphereGeometry(4,20,20)
let sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff})
let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
sphere.position.set(20,4,2)
scene.add(sphere)


let ambientLight = new THREE.AmbientLight(0x0c0c0c)
scene.add(ambientLight)

let spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-40,60,-10)
scene.add(spotLight)

document.querySelector('body').appendChild(renderer.domElement)

renderScene()
function renderScene(){
    requestAnimationFrame(renderScene)
    renderer.render(scene,camera)
}
