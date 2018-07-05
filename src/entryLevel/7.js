let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(-30, 40, 40)
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true})
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(window.innerWidth, window.innerHeight)

let ambientLight = new THREE.AmbientLight(0x0c0c0c)
scene.add(ambientLight)

let spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-40, 60, -10)
scene.add(spotLight)

let points = gosper(4, 60)

let lines = new THREE.Geometry()
const colors = []
let i = 0;
points.forEach(function(e) {
    lines.vertices.push(new THREE.Vector3(e.x,e.z,e.y))
    colors[i] = new THREE.Color(0xffffff)
    colors[i].setHSL(e.x/100+0.5,(e.y*20)/300,0.8)
    i++
})
lines.colors = colors

let material = new THREE.LineBasicMaterial({
  optacity:1,
  linewidth:1,
  vertexColors:THREE.VertexColors
})

let line = new THREE.Line(lines,material)
line.position.set(25,-30,-60)
scene.add(line)


renderScene()
function renderScene() {
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}

function gosper(a, b) {

    var turtle = [0, 0, 0];
    var points = [];
    var count = 0;

    rg(a, b, turtle);

    return points;

    function rt(x) {
        turtle[2] += x;
    }

    function lt(x) {
        turtle[2] -= x;
    }

    function fd(dist) {
        //                ctx.beginPath();
        points.push({
            x: turtle[0],
            y: turtle[1],
            z: Math.sin(count) * 5
        });
        //                ctx.moveTo(turtle[0], turtle[1]);

        var dir = turtle[2] * (Math.PI / 180);
        turtle[0] += Math.cos(dir) * dist;
        turtle[1] += Math.sin(dir) * dist;

        points.push({
            x: turtle[0],
            y: turtle[1],
            z: Math.sin(count) * 5
        });
        //                ctx.lineTo(turtle[0], turtle[1]);
        //                ctx.stroke();

    }

    function rg(st, ln, turtle) {

        st--;
        ln = ln / 2.6457;
        if (st > 0) {
            //                    ctx.strokeStyle = '#111';
            rg(st, ln, turtle);
            rt(60);
            gl(st, ln, turtle);
            rt(120);
            gl(st, ln, turtle);
            lt(60);
            rg(st, ln, turtle);
            lt(120);
            rg(st, ln, turtle);
            rg(st, ln, turtle);
            lt(60);
            gl(st, ln, turtle);
            rt(60);
        }
        if (st == 0) {
            fd(ln);
            rt(60);
            fd(ln);
            rt(120);
            fd(ln);
            lt(60);
            fd(ln);
            lt(120);
            fd(ln);
            fd(ln);
            lt(60);
            fd(ln);
            rt(60)
        }
    }

    function gl(st, ln, turtle) {
        st--;
        ln = ln / 2.6457;
        if (st > 0) {
            //                    ctx.strokeStyle = '#555';
            lt(60);
            rg(st, ln, turtle);
            rt(60);
            gl(st, ln, turtle);
            gl(st, ln, turtle);
            rt(120);
            gl(st, ln, turtle);
            rt(60);
            rg(st, ln, turtle);
            lt(120);
            rg(st, ln, turtle);
            lt(60);
            gl(st, ln, turtle);
        }
        if (st == 0) {
            lt(60);
            fd(ln);
            rt(60);
            fd(ln);
            fd(ln);
            rt(120);
            fd(ln);
            rt(60);
            fd(ln);
            lt(120);
            fd(ln);
            lt(60);
            fd(ln);
        }
    }
}
