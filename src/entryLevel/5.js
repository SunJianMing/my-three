let scene = new THREE.Scene()
    let x = 0,
        y = 30,
        z = 30;
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(-20, 40, 40) //=>一般这个都设置为场景的位置。你别动，我给你发一个，你看一下
    // camera.lookAt(scene.position) 你这样先看一下是什么样子
    camera.lookAt(new THREE.Vector3(0, 10, 0)) //你这样先看一下是什么样子
    //你这样调试。先感受下坐标系的位置以及变化。
    //因为相机的lookAt方向相对于场景，这个时候等于是快门对着场景。然后你调整camera的位置。
    //就可以看见相机位置的转变
    let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true})
    renderer.setClearColor(0xeeeeee)
    renderer.setSize(window.innerWidth, window.innerHeight)

    let GroupGeometry = new THREE.PlaneGeometry(100, 100, 4, 4)
    let GroupMaterial = new THREE.MeshBasicMaterial({color: 0x777777})
    let group = new THREE.Mesh(GroupGeometry, GroupMaterial)
    // plane.rotation.y = 0.5*Math.PI
    group.rotation.x = 0.5 * Math.PI
    GroupMaterial.side = THREE.DoubleSide
    scene.add(group)

    let cubeGeometry = new THREE.BoxGeometry(16, 16, 16)
    let sphereGeometry = new THREE.SphereGeometry(14, 20, 20)
    let planeGeometry = new THREE.PlaneGeometry(14, 14)

    let MeshMaterial = new THREE.MeshNormalMaterial()

    let cube = new THREE.Mesh(cubeGeometry, MeshMaterial)
    let sphere = new THREE.Mesh(sphereGeometry, MeshMaterial)
    let plane = new THREE.Mesh(planeGeometry, MeshMaterial)

    for (var i = 0; i < sphere.geometry.faces.length; i++) {
        let face = sphere.geometry.faces[i]
        let controid = new THREE.Vector3(0, 0, 0)
        controid.add(sphere.geometry.vertices[face.a])
        controid.add(sphere.geometry.vertices[face.b])
        controid.add(sphere.geometry.vertices[face.c])
        controid.divideScalar(3)
        let arrow = new THREE.ArrowHelper(face.normal, controid, 2, 0x3333ff)
        sphere.add(arrow)
    }


    let yLig = 14;
    cube.position.set(0, 9, 0)
    sphere.position.set(0, yLig, 0)
    plane.position.set(0, 8, 0)
    scene.add(cube)

    let axes = new THREE.AxesHelper(50)
    scene.add(axes)

    let controls = new function() {
        this.speed = 0.02
        this.selected = 'cube'
        this.side = 'front'
        this.shadow = MeshMaterial.flatShading
    }

    let gui = new Dat.GUI()
    gui.add(controls, 'speed', 0.02, 2)
    gui.add(controls, 'selected', ['cube', 'sphere', 'plane']).onChange(function(e) {
        console.log(e);
        switch (e) {
            case 'cube':
                scene.remove(sphere)
                scene.remove(plane)
                scene.add(cube)
                break;
            case 'sphere':
                scene.remove(cube)
                scene.remove(plane)
                scene.add(sphere)
                break;
            case 'plane':
                scene.remove(cube)
                scene.remove(sphere)
                scene.add(plane)
                break;
        }
    })
    gui.add(controls, 'side', ['front', 'back', 'double']).onChange(function(e) {
        switch (e) {
            case 'front':
                MeshMaterial.side = THREE.FrontSide
                break;
            case 'back':
                MeshMaterial.side = THREE.BackSide
                break;
            case 'double':
                MeshMaterial.side = THREE.DoubleSide
                break;
        }
    })
    gui.add(controls, 'shadow').onChange(function(e) {
      let oldOps = sphere.position.clone()

      scene.remove(cube)
      scene.remove(sphere)
      scene.remove(plane)
      MeshMaterial = new THREE.MeshNormalMaterial()
      MeshMaterial.flatShading = e;
      sphere = new THREE.Mesh(sphereGeometry,MeshMaterial)
      sphere.position.set(0,yLig,0)

      scene.add(sphere)
    })
    //关于相机视角的问题，你自己通过改变x，y，z的位置来感受一下
    //之后你把plane的位置放开。
    //某个geometry改变位置或者说旋转以后，他的坐标系就跟着自身的旋转一起旋转。
    //你先自己完一完，晚上语音我跟你说好的，lookAt是谁的视角
    // lookat是相机的视角，晚上我仔细跟你说，嗯好的，
    renderSecne()
    function renderSecne() {
        // y+=0.1
        //  if(y>=60)y=-30
        // camera.position.set(x,y,z)
        // console.log(camera.position)
        scene.traverse(function(e) {
            if (e instanceof THREE.Mesh && e != group && e != sphere) {
                e.rotation.y += controls.speed
            }
        })
        renderer.render(scene, camera)
        requestAnimationFrame(renderSecne)
    }
