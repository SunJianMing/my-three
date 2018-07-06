let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 20, 100);
camera.lookAt(scene.position);

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight)

let rainy,
    step = 0;

const controls = new function() {
    this.size = 3
    this.transparent = true
    this.opacity = 0.6
    this.color = 0xffffff
    this.sizeAttenuation = true
    this.draw = () => {
        if (scene.getObjectByName('rainy'))
            scene.remove(scene.getObjectByName('rainy'));
        createMesh(this.size, this.transparent, this.opacity, this.sizeAttenuation, this.color)
    }
}
let gui = new Dat.GUI()
gui.add(controls, 'size', 0, 10).onChange(controls.draw)
gui.add(controls, 'transparent').onChange(controls.draw)
gui.add(controls, 'opacity',0,1).onChange(controls.draw)
gui.addColor(controls, 'color').onChange(controls.draw)
gui.add(controls, 'sizeAttenuation').onChange(controls.draw)

controls.draw();
renderScene();
function renderScene() {
    let vertices = rainy.geometry.vertices;

    vertices.forEach(function(v) {

        v.y = v.y - (v.velocityY) * 3;

        v.x = v.x - (v.velocityX) * .5;

        if (v.y <= -60)
            v.y = 60;

        if (v.x <= -20 || v.x >= 20)
            v.velocityX = v.velocityX * -1;

        }
    );
    rainy.geometry.verticesNeedUpdate = true;
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}

function createMesh(size, transparent, opacity, sizeAttenuation, color) {
    let texture = new THREE.TextureLoader().load('assets/img/raindrop-3.png');

    let geometry = new THREE.Geometry()
    let material = new THREE.PointsMaterial({
        size: size,

        transparent: transparent,

        opacity: opacity,

        vertexColors: true,

        sizeAttenuation: sizeAttenuation,
        blending:THREE.AdditiveBlending,
        color: color,

        map: texture,

        depthTest: false //设置解决透明度有问题的情况
    })
    let range = 120;
    for (let i = 0; i < 15000; i++) {
        let particle = new THREE.Vector3(Math.random() * range - range/2, Math.random() * range * 1.5, Math.random() *range- range / 2)
        particle.velocityY = 0.1 + Math.random() / 5;
        particle.velocityX = (Math.random() - 0.5) / 3;
        geometry.vertices.push(particle)
        var color = new THREE.Color(0xffffff);
        geometry.colors.push(color)
    }
    rainy = new THREE.Points(geometry, material)
    rainy.verticesNeedUpdate = true
    rainy.name = 'rainy'
    scene.add(rainy)
}
