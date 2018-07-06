let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(120, 60, 180)
camera.lookAt(new THREE.Vector3(0, 0, 0))

let renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0xEEEEEE))
renderer.setSize(window.innerWidth, window.innerHeight)

let planeGeometry = new THREE.PlaneGeometry(180, 180)
let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
let plane = new THREE.Mesh(planeGeometry, planeMaterial)

plane.rotation.x = -0.5 * Math.PI
plane.position.set(0, 0, 0)
scene.add(plane)

let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
for (var i = 0; i < planeGeometry.parameters.height / 5; i++) {
    for (var j = 0; j < planeGeometry.parameters.width / 5; j++) {
        var rnd = Math.random() * 0.75 + 0.25
        var cubeMaterial = new THREE.MeshLambertMaterial()
        cubeMaterial.color = new THREE.Color(rnd, 0, 0);
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (i * 5);
        cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (j * 5);
        cube.position.y = 2;
        scene.add(cube)
    }
}
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(-20, 40, 60);
scene.add(directionalLight);

let sphereGeometry = new THREE.SphereGeometry(2)
let sphereMaterial = new THREE.MeshLambertMaterial({color:0xff0000})
let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
scene.add(sphere)


var controls = new function(){
    this.perspective = 'Perspective'
    this.switchCamera = function(){
        if(camera instanceof THREE.PerspectiveCamera){

            camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
            camera.position.set(120,60,180)
            camera.lookAt(scene.position)
            this.perspective = 'Orthographic'
        }else{
            camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
            camera.position.set(120,60,180)
            camera.lookAt(scene.position)
            this.perspective = 'Perspective'
        }
    }
}
var gui = new Dat.GUI()
gui.add(controls,'perspective').listen()
gui.add(controls,'switchCamera')
document.querySelector('body').appendChild(renderer.domElement)

let step = 0;
renderScene()
function renderScene() {
    step += 0.02
    if(camera instanceof THREE.Camera){
        var x = 10 +(100*(Math.sin(step)))
        camera.lookAt(new THREE.Vector3(x,10,0))
        sphere.position.copy(new THREE.Vector3(x,10,0))
    }

    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}
