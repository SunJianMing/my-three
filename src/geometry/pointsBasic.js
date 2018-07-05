let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)
camera.position.set(30,0,150)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({
  canvas:document.getElementById('canvas'),
  antialias:true
})
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth,window.innerHeight)

let points,step=0;

const controls = new function (){
  this.size = 4;
  this.transparent = true
  this.opacity = 0.6
  this.vertexColors = true
  this.color = 0xffffff;
  this.sizeAttenuation = true;
  this.rotateSystem = true;
  this.draw = ()=>{
      if(scene.getObjectByName('points')) scene.remove(scene.getObjectByName('points'));
      createPoints(this.size,this.transparent,this.opacity,this.vertexColors,this.color,this.sizeAttenuation)
  }
}
let gui = new Dat.GUI()
gui.add(controls,'size',1,10).onChange(controls.draw)
gui.add(controls,'transparent').onChange(controls.draw)
gui.add(controls,'opacity',0,1).step(0.1).onChange(controls.draw)
gui.add(controls,'vertexColors').onChange(controls.draw)
gui.addColor(controls,'color').onChange(controls.draw)
gui.add(controls,'sizeAttenuation').onChange(controls.draw)
gui.add(controls,'rotateSystem')

controls.draw()


renderScene()
function renderScene(){
  if (controls.rotateSystem) {
                step += 0.01;

                points.rotation.x = step;
                points.rotation.z = step;
            }

  requestAnimationFrame(renderScene)
  renderer.render(scene,camera)
}
function createPoints(size,transparent,opacity,vertexColors,color,sizeAttenuation){
  let geometry = new THREE.Geometry()
  let pointsMater = new THREE.PointsMaterial({
    size:size,
    transparent:transparent,
    opacity:opacity,
    color:color,
    vertexColors:vertexColors,
    sizeAttenuation:sizeAttenuation
  })
  let range = 500
  for(let i=0;i<15000;i++){
    let particle = new THREE.Vector3(Math.random()*range-range/2,Math.random()*range-range/2,Math.random()*range-range/2)
    geometry.vertices.push(particle)
    let color = new THREE.Color(0x00ff00)
    color.setHSL(color.getHSL(color).h, color.getHSL(color).s, Math.random() * color.getHSL(color).l);
    geometry.colors.push(color)
  }
  points = new THREE.Points(geometry,pointsMater)
  points.name = 'points'

  scene.add(points)
}
