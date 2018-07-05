let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(30, 40, 150);
camera.lookAt(scene.position);

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true})
renderer.setClearColor(0x000000);
renderer.setSize(window.innerWidth, window.innerHeight);
let points,
    step = 0;

const controls = new function() {
    this.size = 15;
    this.transparent = true;
    this.opacity = 0.6;
    this.color = 0xffffff;
    this.rotateSystem = true;
    this.sizeAttenuation = true;
    this.draw = () => {
        if (scene.getObjectByName('texture'))
            scene.remove(scene.getObjectByName('texture'));
        createPoints(this.size, this.transparent, this.opacity, this.color, this.sizeAttenuation)
    }
}
let gui = new Dat.GUI()
gui.add(controls, 'size', 0, 20).onChange(controls.draw)
gui.add(controls, 'transparent').onChange(controls.draw)
gui.add(controls, 'opacity',0,1).onChange(controls.draw)
gui.addColor(controls, 'color').onChange(controls.draw)
gui.add(controls, 'sizeAttenuation').onChange(controls.draw)
gui.add(controls, 'rotateSystem')

controls.draw()
renderScene();
function renderScene() {
    if (controls.rotateSystem) {
        step += 0.01;
        points.rotation.x = step;
        points.rotation.z = step;
    }
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}
function getTexture() {
    let canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    let ctx = canvas.getContext('2d');
    // the body
    ctx.translate(-81, -84);

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    // the eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // the pupils
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}
function createPoints(size, transparent, opacity, color, sizeAttenuation) {
    let geom = new THREE.Geometry()
    let mater = new THREE.PointsMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        map: getTexture(),
        color: color,
        sizeAttenuation: sizeAttenuation
    })
    let range = 500
    for (let i = 0; i < 5000; i++) {
        let particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2)
        geom.vertices.push(particle)
    }

    points = new THREE.Points(geom, mater)
    points.name = 'texture'
    points.sortParticles = true
    scene.add(points)
}
