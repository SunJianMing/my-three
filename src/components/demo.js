import OBJLoader  from 'three-obj-loader'
OBJLoader(THREE)
import Orbitcontrols from 'three-orbitcontrols'


let loader = new THREE.OBJLoader()



let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(-5,20,80)
camera.lookAt(new THREE.Vector3(0,0,0))
let orbit = new Orbitcontrols(camera)

let renderer = new THREE.WebGLRenderer()
renderer.setClearColor(new THREE.Color(0xeeeeee))
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.shadowMap.enabled = true;

let mesh;
loader.load('common/obj/aaa1.obj',function(res){

    let material = new THREE.MeshLambertMaterial({color:0xffffff})
    res.children.map(function(d){

        d.material = material
        d.geometry.computeFaceNormals();
        d.geometry.computeVertexNormals();
    })
    mesh = res
    res.scale.set(5,5,5)
    res.castShadow = true;
    // res.rotation.set(-0.7,-0.7,-0.45)
    scene.add(res)
})



let spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-50,100,30)
spotLight.castShadow = true;
scene.add(spotLight)

document.querySelector('body').appendChild(renderer.domElement)

renderScene()
function renderScene(){
    orbit.update()
    if(mesh){
        // mesh.rotation.y += 0.01
        // mesh.rotation.z += 0.02
    }
    requestAnimationFrame(renderScene)
    renderer.render(scene,camera)
}
