let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(0,0,150)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas'),
  anialias:true
})
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth,window.innerHeight)







createPointCloud()

renderScene()
function renderScene(){
  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}

function createPointCloud(){
  let geom = new THREE.Geometry()
  let material = new THREE.PointsMaterial({size:4,vertexColors:true,color:0xffffff})
  for(let x=-5;x<5;x++){
    for(let y=-5;y<5;y++){
      let particle = new THREE.Vector3(x*10,y*10,0)
      geom.vertices.push(particle)
      geom.colors.push(new THREE.Color(Math.random()*0xffffff))
    }
  }
  let points = new THREE.Points(geom,material)
  scene.add(points)
}
