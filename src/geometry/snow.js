let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 40, 100);
camera.lookAt(scene.position)

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true})
renderer.setClearColor(0x000000);
renderer.setSize(window.innerWidth, window.innerHeight);







createMeshs(5, true, 0.6, true, true, 0xffffff)

renderScene()
function renderScene() {
    scene.children.forEach((child) => {
        if (child instanceof THREE.Points) {
            let vertices = child.geometry.vertices;
            vertices.forEach((v) => {
                v.y = v.y - (v.velocityY);

                v.x = v.x - (v.velocityX) * .5;

                if (v.y <= -60)
                    v.y = 60;

                if (v.x <= -20 || v.x >= 20)
                    v.velocityX = v.velocityX * -1;
                }
            )
        }
        child.geometry.verticesNeedUpdate = true
    })

    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}

function createMeshs(size, transparent, opacity, vertexColors, sizeAttenuation, color) {
    let texture1 = new THREE.TextureLoader().load('./assets/img/snowflake1.png')
    let texture2 = new THREE.TextureLoader().load('./assets/img/snowflake2.png')
    let texture3 = new THREE.TextureLoader().load('./assets/img/snowflake3.png')
    let texture4 = new THREE.TextureLoader().load('./assets/img/snowflake5.png')

    scene.add(createSnow('snowflake1', texture1, size, transparent, opacity, vertexColors, sizeAttenuation, color))
    scene.add(createSnow('snowflake2',texture2,size,transparent,opacity,vertexColors,sizeAttenuation,color))
    scene.add(createSnow('snowflake3',texture3,size,transparent,opacity,vertexColors,sizeAttenuation,color))
    scene.add(createSnow('snowflake4',texture4,size,transparent,opacity,vertexColors,sizeAttenuation,color))
}
function createSnow(name, texture, size, transparent, opacity, vertexColors, sizeAttenuation, color) {
    let geometry = new THREE.Geometry()
    let material = new THREE.PointsMaterial({
        size:size,
        transparent:transparent,
        opacity:opacity,
        vertexColors:vertexColors,
        sizeAttenuation:sizeAttenuation,
        color:color,
        map: texture,
        blending:THREE.AdditiveBlending,
        depthTest:false
    })
    let range = 120;
    for (let i = 0; i < 5000; i++) {
        let particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range * 1.5, Math.random() * range - range / 2)
        particle.velocityY = 0.1 + Math.random() / 5
        particle.velocityX = (Math.random() - 0.5) / 3
        geometry.vertices.push(particle)
        let color = new THREE.Color(0xffffff)
        geometry.colors.push(color)
    }
    let snow = new THREE.Points(geometry, material)
    snow.name = name;
    snow.sortParticles = true
    snow.verticesNeedUpdate = true
    return snow
}
