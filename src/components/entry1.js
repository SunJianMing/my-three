import OrbitControls from 'three-orbitcontrols'
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
scene.add(camera)
 var orbit = new THREE.OrbitControls(camera);


let renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0x1f2935))
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.shadowMap.enabled= true;



let planeGeometry = new THREE.PlaneGeometry(60,40)
let planeMaterial = new THREE.MeshLambertMaterial({color:0xeeeeee})
let plane = new THREE.Mesh(planeGeometry,planeMaterial)

console.log(plane);
plane.receiveShadow = true;
plane.rotation.x = -0.5*Math.PI;
plane.position.set(0,0,0)
scene.add(plane)


let spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-30,60,-10)
spotLight.castShadow = true;
scene.add(spotLight)

camera.position.x = -30;
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position)

document.querySelector('body').appendChild(renderer.domElement)

const controls = new function(){
    this.cubeSpeed = 0.02;
    this.numberObjects = scene.children.length
    this.removeCube = function(){
        let allCube = scene.children;
        let lastCube = allCube[allCube.length-1];
        if(lastCube instanceof THREE.Mesh){
            scene.remove(lastCube)
            this.numberObjects = scene.children.length
        }
    }
    this.addShpere
    this.addCube = function(){
        let cubeSize = Math.ceil(Math.random()*3)
        let cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize)
        let cubeMaterial = new THREE.MeshLambertMaterial({color:Math.random()*0xffffff})
        let cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
        cube.castShadow = true;

        cube.name = 'cube'+scene.children.length;
        cube.rotation.x = 0.03
        cube.position.x = -30 +Math.round(Math.random()*planeGeometry.parameters.width)
        cube.position.y = Math.round(Math.random()*5)
        cube.position.z = -20 + Math.round(Math.random()*planeGeometry.parameters.height)

        scene.add(cube)

        this.numberObjects = scene.children.length
        console.log(cube);
    }
}

let gui = new Dat.GUI()
gui.add(controls,'cubeSpeed',0.02,0.5)
gui.add(controls,'addCube')
gui.add(controls,'removeCube')
gui.add(controls,'numberObjects').listen()


renderSecne()
function renderSecne(){
    orbit.update()
    scene.traverse(function(e){
        if(e instanceof THREE.Mesh && e != plane){
            e.rotation.x += controls.cubeSpeed
            e.rotation.y += controls.cubeSpeed
            e.rotation.z += controls.cubeSpeed
        }
    })
    // requestAnimationFrame(renderSecne)
    webkitRequestAnimationFrame(renderSecne)
    renderer.render(scene,camera)
}
