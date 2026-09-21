import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


/* ============================================================
   3D SMART CITY SIMULATOR — V3
   ============================================================ */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x82cbea);

scene.fog = new THREE.Fog(
    0x82cbea,
    55,
    125
);


/* ============================================================
   CAMERA
   ============================================================ */

const camera = new THREE.PerspectiveCamera(
    52,
    window.innerWidth / window.innerHeight,
    0.1,
    400
);

camera.position.set(
    24,
    17,
    24
);


/* ============================================================
   RENDERER
   ============================================================ */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.6)
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.15;

document
    .getElementById("city-container")
    .appendChild(renderer.domElement);


/* ============================================================
   CONTROLS
   ============================================================ */

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.06;

controls.minDistance = 15;
controls.maxDistance = 58;

controls.minPolarAngle = 0.55;
controls.maxPolarAngle = Math.PI / 2.18;

controls.target.set(
    0,
    0,
    0
);


/* ============================================================
   MATERIAL HELPER
   ============================================================ */

function makeMaterial(
    color,
    roughness = 0.8,
    metalness = 0
) {

    return new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness
    });

}


/* ============================================================
   LIGHTING
   ============================================================ */

const ambientLight =
    new THREE.HemisphereLight(
        0xe4f7ff,
        0x315b35,
        1.25
    );

scene.add(
    ambientLight
);


const sun =
    new THREE.DirectionalLight(
        0xffffff,
        2.2
    );

sun.position.set(
    30,
    45,
    20
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

sun.shadow.camera.left = -45;
sun.shadow.camera.right = 45;
sun.shadow.camera.top = 45;
sun.shadow.camera.bottom = -45;

sun.shadow.camera.near = 1;
sun.shadow.camera.far = 120;

sun.shadow.bias = -0.0005;

scene.add(sun);


/* ============================================================
   DAY / NIGHT
   ============================================================ */

let isNight = false;

let targetAmbient = 1.25;
let targetSun = 2.2;


/* ============================================================
   GROUND
   ============================================================ */

const ground =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            80,
            0.5,
            80
        ),
        makeMaterial(
            0x3d7d40,
            1
        )
    );

ground.position.y = -0.25;

ground.receiveShadow = true;

scene.add(ground);


/* ============================================================
   ROADS
   ============================================================ */

const roadMaterial =
    makeMaterial(
        0x20252a,
        0.92
    );


const horizontalRoad =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            80,
            0.14,
            7
        ),
        roadMaterial
    );

horizontalRoad.position.y = 0.05;

horizontalRoad.receiveShadow = true;

scene.add(horizontalRoad);


const verticalRoad =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            7,
            0.14,
            80
        ),
        roadMaterial
    );

verticalRoad.position.y = 0.06;

verticalRoad.receiveShadow = true;

scene.add(verticalRoad);


/* ============================================================
   SIDEWALKS
   ============================================================ */

const sidewalkMaterial =
    makeMaterial(
        0x858d94,
        0.95
    );


function createSidewalk(
    x,
    z,
    width,
    depth
) {

    const sidewalk =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                0.14,
                depth
            ),
            sidewalkMaterial
        );

    sidewalk.position.set(
        x,
        0.13,
        z
    );

    sidewalk.receiveShadow = true;

    scene.add(sidewalk);

}


createSidewalk(0, 4.25, 80, 1.1);
createSidewalk(0, -4.25, 80, 1.1);
createSidewalk(4.25, 0, 1.1, 80);
createSidewalk(-4.25, 0, 1.1, 80);


/* ============================================================
   ROAD MARKINGS
   ============================================================ */

const whiteMaterial =
    makeMaterial(
        0xf5f5f5,
        0.55
    );


function roadMark(
    x,
    z,
    width,
    depth
) {

    const mark =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                0.045,
                depth
            ),
            whiteMaterial
        );

    mark.position.set(
        x,
        0.145,
        z
    );

    scene.add(mark);

}


/* horizontal center */

for (
    let x = -38;
    x <= 38;
    x += 5
) {

    roadMark(
        x,
        0,
        2.7,
        0.08
    );

}


/* vertical center */

for (
    let z = -38;
    z <= 38;
    z += 5
) {

    roadMark(
        0,
        z,
        0.08,
        2.7
    );

}


/* lane lines */

for (
    let x = -38;
    x <= 38;
    x += 6
) {

    roadMark(
        x,
        -1.55,
        2.5,
        0.045
    );

    roadMark(
        x,
        1.55,
        2.5,
        0.045
    );

}


for (
    let z = -38;
    z <= 38;
    z += 6
) {

    roadMark(
        -1.55,
        z,
        0.045,
        2.5
    );

    roadMark(
        1.55,
        z,
        0.045,
        2.5
    );

}


/* ============================================================
   BUILDINGS
   ============================================================ */

const buildingMaterials = [

    makeMaterial(0x727d88, 0.82),
    makeMaterial(0x818c97, 0.82),
    makeMaterial(0x626d78, 0.82),
    makeMaterial(0x929da7, 0.82),
    makeMaterial(0x6e7b86, 0.82)

];


const dayWindowMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x91d5f4,
        roughness: 0.3,
        metalness: 0.1
    });


const nightWindowMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffd76b,
        emissive: 0xffa000,
        emissiveIntensity: 1.25,
        roughness: 0.3
    });


const buildingWindows = [];


function createBuilding(
    x,
    z,
    width,
    height,
    depth,
    index
) {

    const group =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            buildingMaterials[
                index %
                buildingMaterials.length
            ]
        );

    body.position.y =
        height / 2;

    body.castShadow = true;
    body.receiveShadow = true;

    group.add(body);


    /* rooftop */

    const roof =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width * 0.84,
                0.4,
                depth * 0.84
            ),
            makeMaterial(
                0x48545f,
                0.85
            )
        );

    roof.position.y =
        height + 0.2;

    roof.castShadow = true;

    group.add(roof);


    /* rooftop machine */

    const machine =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                Math.min(width * 0.25, 1.4),
                0.65,
                Math.min(depth * 0.25, 1.4)
            ),
            makeMaterial(
                0x5c6873,
                0.8
            )
        );

    machine.position.y =
        height + 0.72;

    machine.castShadow = true;

    group.add(machine);


    /* windows front */

    const cols =
        Math.max(
            2,
            Math.floor(width / 1.25)
        );

    const rows =
        Math.max(
            2,
            Math.floor(height / 1.5)
        );


    for (
        let row = 0;
        row < rows;
        row++
    ) {

        for (
            let col = 0;
            col < cols;
            col++
        ) {

            const win =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.42,
                        0.5,
                        0.045
                    ),
                    dayWindowMaterial
                );

            win.position.set(
                -width / 2 +
                0.7 +
                col * 1.15,

                1.1 +
                row * 1.45,

                depth / 2 + 0.025
            );

            group.add(win);

            buildingWindows.push(win);

        }

    }


    /* windows back */

    for (
        let row = 0;
        row < rows;
        row++
    ) {

        for (
            let col = 0;
            col < cols;
            col++
        ) {

            const win =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.42,
                        0.5,
                        0.045
                    ),
                    dayWindowMaterial
                );

            win.position.set(
                -width / 2 +
                0.7 +
                col * 1.15,

                1.1 +
                row * 1.45,

                -depth / 2 - 0.025
            );

            group.add(win);

            buildingWindows.push(win);

        }

    }


    group.position.set(
        x,
        0,
        z
    );

    scene.add(group);

}


/* ============================================================
   CITY BUILDING LOCATIONS
   ============================================================ */

createBuilding(-12, -12, 6, 11, 6, 0);
createBuilding(-20, -12, 5, 7, 5, 2);

createBuilding(12, -12, 6, 13, 6, 1);
createBuilding(20, -12, 5, 9, 5, 3);

createBuilding(-12, 12, 6, 9, 6, 4);
createBuilding(-20, 12, 5, 12, 5, 1);

createBuilding(12, 12, 6, 14, 6, 0);
createBuilding(20, 12, 5, 8, 5, 2);


/* ============================================================
   SPECIAL BUILDING
   ============================================================ */

function createSpecialBuilding(
    x,
    z,
    color,
    type
) {

    const group =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6,
                5,
                5
            ),
            makeMaterial(
                color,
                0.72
            )
        );

    body.position.y = 2.5;

    body.castShadow = true;
    body.receiveShadow = true;

    group.add(body);


    const roof =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6.5,
                0.35,
                5.5
            ),
            makeMaterial(
                0x36414c,
                0.75
            )
        );

    roof.position.y = 5.15;

    group.add(roof);


    /* entrance */

    const entrance =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.25,
                2,
                0.18
            ),
            makeMaterial(
                0x111a21,
                0.3
            )
        );

    entrance.position.set(
        0,
        1,
        2.55
    );

    group.add(entrance);


    /* glowing sign */

    const sign =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.8,
                0.55,
                0.12
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: color,
                emissiveIntensity: 1.2
            })
        );

    sign.position.set(
        0,
        3.65,
        2.55
    );

    group.add(sign);


    /* hospital cross */

    if (
        type === "hospital"
    ) {

        const crossMat =
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xff2222,
                emissiveIntensity: 1.5
            });


        const vertical =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.34,
                    1.5,
                    0.08
                ),
                crossMat
            );

        vertical.position.set(
            0,
            3.65,
            2.64
        );

        group.add(vertical);


        const horizontal =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    1.1,
                    0.34,
                    0.08
                ),
                crossMat
            );

        horizontal.position.set(
            0,
            3.65,
            2.64
        );

        group.add(horizontal);

    }


    /* smart hub antenna */

    if (
        type === "smart"
    ) {

        const antenna =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.06,
                    0.06,
                    2.4,
                    8
                ),
                makeMaterial(
                    0x222d36,
                    0.65
                )
            );

        antenna.position.y = 6.3;

        group.add(antenna);


        const beacon =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.18,
                    12,
                    12
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x44e6ff,
                    emissive: 0x44e6ff,
                    emissiveIntensity: 3
                })
            );

        beacon.position.y = 7.55;

        group.add(beacon);

    }


    group.position.set(
        x,
        0,
        z
    );

    scene.add(group);

}


createSpecialBuilding(
    -19,
    20,
    0xd83f4b,
    "hospital"
);

createSpecialBuilding(
    19,
    20,
    0x239bc8,
    "smart"
);


/* ============================================================
   TREES
   ============================================================ */

function createTree(
    x,
    z,
    scale = 1
) {

    const tree =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.22,
                0.32,
                1.8,
                10
            ),
            makeMaterial(
                0x5f3c25,
                0.95
            )
        );

    trunk.position.y = 0.9;

    trunk.castShadow = true;

    tree.add(trunk);


    const crown =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                1.2,
                14,
                12
            ),
            makeMaterial(
                0x176d35,
                0.95
            )
        );

    crown.position.y = 2.35;

    crown.castShadow = true;

    tree.add(crown);


    tree.position.set(
        x,
        0,
        z
    );

    tree.scale.setScalar(scale);

    scene.add(tree);

}


/* ============================================================
   TREES
   ============================================================ */

[
    [-8, -10, 1],
    [-18, -6, 0.85],
    [-8, 10, 0.95],
    [-18, 6, 1],

    [8, -10, 1],
    [18, -6, 0.9],
    [8, 10, 1],
    [18, 6, 0.9],

    [-10, -20, 1],
    [10, 20, 1],
    [-15, 16, 0.75],
    [15, 16, 0.75],

    [-10, 20, 0.85],
    [10, -20, 0.85]
].forEach(
    p =>
        createTree(
            p[0],
            p[1],
            p[2]
        )
);


/* ============================================================
   PARK
   ============================================================ */

function createPark(
    x,
    z
) {

    const base =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                8,
                0.16,
                7
            ),
            makeMaterial(
                0x2e8b45,
                1
            )
        );

    base.position.set(
        x,
        0.08,
        z
    );

    base.receiveShadow = true;

    scene.add(base);


    const path =
        makeMaterial(
            0xc6b895,
            0.95
        );


    const p1 =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.1,
                0.04,
                6.5
            ),
            path
        );

    p1.position.set(
        x,
        0.18,
        z
    );

    scene.add(p1);


    const p2 =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7.5,
                0.04,
                1.0
            ),
            path
        );

    p2.position.set(
        x,
        0.19,
        z
    );

    scene.add(p2);


    createTree(x - 2.5, z - 2, 0.65);
    createTree(x + 2.5, z - 2, 0.65);
    createTree(x - 2.5, z + 2, 0.65);
    createTree(x + 2.5, z + 2, 0.65);

}


createPark(
    -24,
    -22
);


/* ============================================================
   BENCHES
   ============================================================ */

function createBench(
    x,
    z,
    rotation = 0
) {

    const group =
        new THREE.Group();


    const wood =
        makeMaterial(
            0x76502f,
            0.8
        );


    const seat =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.5,
                0.14,
                0.42
            ),
            wood
        );

    seat.position.y = 0.65;

    group.add(seat);


    const back =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.5,
                0.55,
                0.12
            ),
            wood
        );

    back.position.set(
        0,
        0.95,
        -0.17
    );

    group.add(back);


    group.position.set(
        x,
        0,
        z
    );

    group.rotation.y =
        rotation;

    scene.add(group);

}


createBench(
    -24,
    -22,
    0
);

createBench(
    -24,
    -20.3,
    Math.PI
);


/* ============================================================
   PARKING
   ============================================================ */

function createParking(
    x,
    z
) {

    const parking =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                9,
                0.12,
                6
            ),
            makeMaterial(
                0x34383c,
                0.9
            )
        );

    parking.position.set(
        x,
        0.07,
        z
    );

    parking.receiveShadow = true;

    scene.add(parking);


    for (
        let i = -3;
        i <= 3;
        i++
    ) {

        const line =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.06,
                    0.04,
                    5.2
                ),
                whiteMaterial
            );

        line.position.set(
            x + i * 1.25,
            0.15,
            z
        );

        scene.add(line);

    }


    /* EV chargers */

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const charger =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.25,
                    0.9,
                    0.25
                ),
                makeMaterial(
                    0x26333c,
                    0.55
                )
            );

        charger.position.set(
            x + i * 1.7,
            0.5,
            z - 2.3
        );

        scene.add(charger);


        const light =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.07,
                    8,
                    8
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x42eaff,
                    emissive: 0x42eaff,
                    emissiveIntensity: 3
                })
            );

        light.position.set(
            x + i * 1.7,
            0.9,
            z - 2.3
        );

        scene.add(light);

    }

}


createParking(
    24,
    -21
);


/* ============================================================
   STREET LIGHTS
   ============================================================ */

const streetLights = [];


function createStreetLight(
    x,
    z
) {

    const group =
        new THREE.Group();


    const pole =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.09,
                0.12,
                3.2,
                10
            ),
            makeMaterial(
                0x1b2228,
                0.7,
                0.2
            )
        );

    pole.position.y = 1.6;

    pole.castShadow = true;

    group.add(pole);


    const arm =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.7,
                0.1,
                0.1
            ),
            makeMaterial(
                0x1b2228,
                0.7
            )
        );

    arm.position.set(
        0.3,
        3.02,
        0
    );

    group.add(arm);


    const lamp =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.2,
                12,
                12
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffffcc,
                emissive: 0xffaa33,
                emissiveIntensity: 2
            })
        );

    lamp.position.set(
        0.65,
        3,
        0
    );

    group.add(lamp);


    const pointLight =
        new THREE.PointLight(
            0xffb45c,
            0,
            10,
            2
        );

    pointLight.position.set(
        0.65,
        3,
        0
    );

    group.add(pointLight);


    group.position.set(
        x,
        0,
        z
    );

    scene.add(group);


    streetLights.push({
        light: pointLight,
        lamp
    });

}


[
    [-7, -7],
    [7, -7],
    [-7, 7],
    [7, 7],
    [-15, -3],
    [15, 3],
    [-3, -15],
    [3, 15]
].forEach(
    p =>
        createStreetLight(
            p[0],
            p[1]
        )
);


/* ============================================================
   BUS STOPS
   ============================================================ */

function createBusStop(
    x,
    z,
    rotation = 0
) {

    const group =
        new THREE.Group();


    const roof =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.4,
                0.18,
                1.5
            ),
            makeMaterial(
                0x26323b,
                0.7,
                0.15
            )
        );

    roof.position.y = 2.6;

    group.add(roof);


    const glass =
        new THREE.MeshStandardMaterial({
            color: 0x63dfff,
            transparent: true,
            opacity: 0.25,
            roughness: 0.15
        });


    [-1.55, 1.55].forEach(
        px => {

            const panel =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.08,
                        2.1,
                        1.35
                    ),
                    glass
                );

            panel.position.set(
                px,
                1.35,
                0
            );

            group.add(panel);

        }
    );


    const seat =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.2,
                0.15,
                0.42
            ),
            makeMaterial(
                0x4c555d,
                0.8
            )
        );

    seat.position.y = 0.75;

    group.add(seat);


    const busSign =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.65,
                0.65,
                0.12
            ),
            new THREE.MeshStandardMaterial({
                color: 0x45dfff,
                emissive: 0x45dfff,
                emissiveIntensity: 2
            })
        );

    busSign.position.set(
        -1.9,
        2.25,
        0
    );

    group.add(busSign);


    group.position.set(
        x,
        0,
        z
    );

    group.rotation.y =
        rotation;

    scene.add(group);

}


createBusStop(
    -20,
    5.2,
    Math.PI / 2
);

createBusStop(
    20,
    -5.2,
    -Math.PI / 2
);


/* ============================================================
   ZEBRA CROSSINGS
   ============================================================ */

function createCrossing(
    x,
    z,
    horizontal
) {

    for (
        let i = -4;
        i <= 4;
        i++
    ) {

        let stripe;


        if (
            horizontal
        ) {

            stripe =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.55,
                        0.07,
                        4.4
                    ),
                    whiteMaterial
                );

            stripe.position.set(
                x + i * 0.68,
                0.17,
                z
            );

        }

        else {

            stripe =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        4.4,
                        0.07,
                        0.55
                    ),
                    whiteMaterial
                );

            stripe.position.set(
                x,
                0.17,
                z + i * 0.68
            );

        }


        scene.add(stripe);

    }

}


createCrossing(
    -4.5,
    0,
    true
);

createCrossing(
    4.5,
    0,
    true
);

createCrossing(
    0,
    -4.5,
    false
);

createCrossing(
    0,
    4.5,
    false
);


/* ============================================================
   TRAFFIC LIGHTS
   ============================================================ */

const trafficLights = [];


function createTrafficLight(
    x,
    z,
    direction
) {

    const group =
        new THREE.Group();


    const pole =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.12,
                4,
                10
            ),
            makeMaterial(
                0x111519,
                0.65
            )
        );

    pole.position.y = 2;

    group.add(pole);


    const box =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.72,
                1.8,
                0.5
            ),
            makeMaterial(
                0x0e1114,
                0.65
            )
        );

    box.position.y = 3.8;

    group.add(box);


    const red =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.18,
                16,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0xff2222,
                emissive: 0xff2222,
                emissiveIntensity: 0.05
            })
        );

    red.position.set(
        0,
        4.25,
        -0.3
    );

    group.add(red);


    const yellow =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.18,
                16,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffff22,
                emissive: 0xffff22,
                emissiveIntensity: 0.05
            })
        );

    yellow.position.set(
        0,
        3.8,
        -0.3
    );

    group.add(yellow);


    const green =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.18,
                16,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0x20ff55,
                emissive: 0x20ff55,
                emissiveIntensity: 0.05
            })
        );

    green.position.set(
        0,
        3.35,
        -0.3
    );

    group.add(green);


    group.position.set(
        x,
        0,
        z
    );

    scene.add(group);


    trafficLights.push({
        red,
        yellow,
        green,
        direction
    });

}


createTrafficLight(
    4,
    4,
    "horizontal"
);

createTrafficLight(
    -4,
    -4,
    "vertical"
);


/* ============================================================
   TRAFFIC STATE
   ============================================================ */

let trafficState =
    "HORIZONTAL_GREEN";

let trafficTimer = 0;

let currentGreenTime = 8;

const YELLOW_TIME = 2;


/* ============================================================
   CARS
   ============================================================ */

const cars = [];

const SAFE_DISTANCE = 3.4;


function createCar(
    color,
    x,
    z,
    direction
) {

    const car =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.7,
                0.55,
                0.9
            ),
            makeMaterial(
                color,
                0.55,
                0.05
            )
        );

    body.position.y = 0.48;

    body.castShadow = true;

    car.add(body);


    const cabin =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.95,
                0.43,
                0.72
            ),
            makeMaterial(
                color,
                0.5,
                0.05
            )
        );

    cabin.position.y = 0.9;

    cabin.castShadow = true;

    car.add(cabin);


    const glass =
        makeMaterial(
            0x142530,
            0.18,
            0.3
        );


    const frontGlass =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.05,
                0.28,
                0.58
            ),
            glass
        );

    frontGlass.position.set(
        0.48,
        0.91,
        0
    );

    car.add(frontGlass);


    const backGlass =
        frontGlass.clone();

    backGlass.position.x =
        -0.48;

    car.add(backGlass);


    const wheelMaterial =
        makeMaterial(
            0x111111,
            0.85
        );


    [
        [-0.62, 0.28, 0.47],
        [0.62, 0.28, 0.47],
        [-0.62, 0.28, -0.47],
        [0.62, 0.28, -0.47]
    ].forEach(
        p => {

            const wheel =
                new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        0.21,
                        0.21,
                        0.14,
                        14
                    ),
                    wheelMaterial
                );

            wheel.rotation.x =
                Math.PI / 2;

            wheel.position.set(
                p[0],
                p[1],
                p[2]
            );

            car.add(wheel);

        }
    );


    car.position.set(
        x,
        0,
        z
    );


    car.userData.direction =
        direction;

    car.userData.baseSpeed =
        3.0 +
        Math.random() * 1.1;

    car.userData.currentSpeed = 0;


    if (
        direction === "right"
    ) {

        car.rotation.y = 0;

    }

    else if (
        direction === "left"
    ) {

        car.rotation.y = Math.PI;

    }

    else if (
        direction === "down"
    ) {

        car.rotation.y =
            Math.PI / 2;

    }

    else {

        car.rotation.y =
            -Math.PI / 2;

    }


    scene.add(car);

    cars.push(car);

}


/* ============================================================
   INITIAL TRAFFIC
   ============================================================ */

createCar(0xe83b3b, -20, -1.5, "right");
createCar(0xf28c28, -12, -1.5, "right");
createCar(0x19c58a, -4, -1.5, "right");

createCar(0x287cff, 20, 1.5, "left");
createCar(0xf4d738, 12, 1.5, "left");
createCar(0xe85aaa, 4, 1.5, "left");

createCar(0xf5f5f5, 1.5, -20, "down");
createCar(0xffb52e, 1.5, -12, "down");
createCar(0x22aadd, 1.5, -4, "down");

createCar(0xaa2222, -1.5, 20, "up");
createCar(0x2288ff, -1.5, 12, "up");
createCar(0x65ad36, -1.5, 4, "up");


/* ============================================================
   AI TRAFFIC DATA
   ============================================================ */

let horizontalTraffic = 6;
let verticalTraffic = 6;

let aiDecision =
    "AI detected balanced traffic";


function calculateTraffic() {

    horizontalTraffic = 0;
    verticalTraffic = 0;


    cars.forEach(
        car => {

            if (
                car.userData.direction === "right" ||
                car.userData.direction === "left"
            ) {

                horizontalTraffic++;

            }

            else {

                verticalTraffic++;

            }

        }
    );

}


/* ============================================================
   AI SIGNAL TIME
   ============================================================ */

function calculateGreenTime(
    traffic
) {

    if (traffic >= 6)
        return 15;

    if (traffic >= 5)
        return 13;

    if (traffic >= 4)
        return 11;

    if (traffic >= 3)
        return 9;

    return 7;

}


/* ============================================================
   SIGNAL SELECTION
   ============================================================ */

function selectNextGreen() {

    calculateTraffic();


    if (
        horizontalTraffic >
        verticalTraffic
    ) {

        trafficState =
            "HORIZONTAL_GREEN";

        currentGreenTime =
            calculateGreenTime(
                horizontalTraffic
            );

        aiDecision =
            "AI prioritised horizontal traffic";

    }

    else if (
        verticalTraffic >
        horizontalTraffic
    ) {

        trafficState =
            "VERTICAL_GREEN";

        currentGreenTime =
            calculateGreenTime(
                verticalTraffic
            );

        aiDecision =
            "AI prioritised vertical traffic";

    }

    else {

        trafficState =
            trafficState.includes(
                "HORIZONTAL"
            )
                ? "VERTICAL_GREEN"
                : "HORIZONTAL_GREEN";

        currentGreenTime = 10;

        aiDecision =
            "AI detected balanced traffic";

    }


    trafficTimer = 0;

}


/* ============================================================
   UPDATE SIGNAL VISUALS
   ============================================================ */

function updateTrafficLights() {

    trafficLights.forEach(
        signal => {

            signal.red.material
                .emissiveIntensity = 0.08;

            signal.yellow.material
                .emissiveIntensity = 0.08;

            signal.green.material
                .emissiveIntensity = 0.08;


            const greenDirection =
                signal.direction ===
                "horizontal"
                    ? "HORIZONTAL"
                    : "VERTICAL";


            if (
                trafficState ===
                greenDirection +
                "_GREEN"
            ) {

                signal.green.material
                    .emissiveIntensity = 3;

            }

            else if (
                trafficState ===
                greenDirection +
                "_YELLOW"
            ) {

                signal.yellow.material
                    .emissiveIntensity = 3;

            }

            else {

                signal.red.material
                    .emissiveIntensity = 3;

            }

        }
    );

}


/* ============================================================
   TRAFFIC SYSTEM
   ============================================================ */

function updateTrafficSystem(
    delta
) {

    if (
        emergencyMode
    ) {

        trafficState =
            "HORIZONTAL_GREEN";

        trafficTimer = 0;

        updateTrafficLights();

        return;

    }


    trafficTimer += delta;


    if (
        trafficState.includes(
            "GREEN"
        )
    ) {

        if (
            trafficTimer >=
            currentGreenTime
        ) {

            trafficState =
                trafficState.includes(
                    "HORIZONTAL"
                )
                    ? "HORIZONTAL_YELLOW"
                    : "VERTICAL_YELLOW";

            trafficTimer = 0;

        }

    }

    else {

        if (
            trafficTimer >=
            YELLOW_TIME
        ) {

            selectNextGreen();

        }

    }


    updateTrafficLights();

}


/* ============================================================
   CAR AHEAD
   ============================================================ */

function getCarAhead(
    current
) {

    let closest = null;

    let distance = Infinity;

    const direction =
        current.userData.direction;


    cars.forEach(
        other => {

            if (
                other === current
            )
                return;


            if (
                other.userData.direction !==
                direction
            )
                return;


            let d = Infinity;


            if (
                direction === "right" &&
                other.position.x >
                current.position.x
            ) {

                d =
                    other.position.x -
                    current.position.x;

            }


            if (
                direction === "left" &&
                other.position.x <
                current.position.x
            ) {

                d =
                    current.position.x -
                    other.position.x;

            }


            if (
                direction === "down" &&
                other.position.z >
                current.position.z
            ) {

                d =
                    other.position.z -
                    current.position.z;

            }


            if (
                direction === "up" &&
                other.position.z <
                current.position.z
            ) {

                d =
                    current.position.z -
                    other.position.z;

            }


            if (
                d > 0 &&
                d < distance
            ) {

                distance = d;
                closest = other;

            }

        }
    );


    return {
        car: closest,
        distance
    };

}


/* ============================================================
   SIGNAL STOP LOGIC
   ============================================================ */

function shouldStop(
    car
) {

    const d =
        car.userData.direction;


    if (
        d === "right"
    ) {

        return (
            trafficState !==
            "HORIZONTAL_GREEN" &&

            car.position.x >= -8 &&

            car.position.x <= -3
        );

    }


    if (
        d === "left"
    ) {

        return (
            trafficState !==
            "HORIZONTAL_GREEN" &&

            car.position.x <= 8 &&

            car.position.x >= 3
        );

    }


    if (
        d === "down"
    ) {

        return (
            trafficState !==
            "VERTICAL_GREEN" &&

            car.position.z >= -8 &&

            car.position.z <= -3
        );

    }


    if (
        d === "up"
    ) {

        return (
            trafficState !==
            "VERTICAL_GREEN" &&

            car.position.z <= 8 &&

            car.position.z >= 3
        );

    }


    return false;

}


/* ============================================================
   MOVE CARS
   ============================================================ */

function moveCars(
    delta
) {

    cars.forEach(
        car => {

            let speed =
                car.userData.baseSpeed;


            const ahead =
                getCarAhead(car);


            if (
                ahead.car &&
                ahead.distance <
                SAFE_DISTANCE
            ) {

                speed = 0;

            }


            if (
                shouldStop(car)
            ) {

                speed = 0;

            }


            if (
                trafficState.includes(
                    "YELLOW"
                )
            ) {

                speed =
                    Math.min(
                        speed,
                        1.0
                    );

            }


            car.userData.currentSpeed =
                speed;


            const move =
                speed * delta;


            switch (
                car.userData.direction
            ) {

                case "right":

                    car.position.x +=
                        move;

                    if (
                        car.position.x > 42
                    )
                        car.position.x = -42;

                    break;


                case "left":

                    car.position.x -=
                        move;

                    if (
                        car.position.x < -42
                    )
                        car.position.x = 42;

                    break;


                case "down":

                    car.position.z +=
                        move;

                    if (
                        car.position.z > 42
                    )
                        car.position.z = -42;

                    break;


                case "up":

                    car.position.z -=
                        move;

                    if (
                        car.position.z < -42
                    )
                        car.position.z = 42;

                    break;

            }

        }
    );

}


/* ============================================================
   AMBULANCE
   ============================================================ */

let ambulance = null;

let emergencyMode = false;


function createAmbulance() {

    ambulance =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.3,
                0.82,
                1.05
            ),
            makeMaterial(
                0xf4f4f4,
                0.5
            )
        );

    body.position.y = 0.58;

    body.castShadow = true;

    ambulance.add(body);


    const redStripe =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.35,
                0.16,
                1.08
            ),
            makeMaterial(
                0xd71920,
                0.5
            )
        );

    redStripe.position.y = 0.75;

    ambulance.add(redStripe);


    const cabin =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.2,
                0.55,
                0.88
            ),
            makeMaterial(
                0xffffff,
                0.45
            )
        );

    cabin.position.y = 1.25;

    ambulance.add(cabin);


    const crossMat =
        new THREE.MeshStandardMaterial({
            color: 0xff2020,
            emissive: 0xff0000,
            emissiveIntensity: 1
        });


    const crossV =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.14,
                0.65,
                0.05
            ),
            crossMat
        );

    crossV.position.set(
        0.15,
        1.27,
        0.47
    );

    ambulance.add(crossV);


    const crossH =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.55,
                0.14,
                0.05
            ),
            crossMat
        );

    crossH.position.set(
        0.15,
        1.27,
        0.47
    );

    ambulance.add(crossH);


    const siren =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.5,
                0.18,
                0.25
            ),
            new THREE.MeshStandardMaterial({
                color: 0xff2020,
                emissive: 0xff0000,
                emissiveIntensity: 2
            })
        );

    siren.position.y = 1.65;

    ambulance.add(siren);

    ambulance.userData.siren =
        siren;


    ambulance.position.set(
        -23,
        0,
        -1.5
    );

    scene.add(ambulance);

}


createAmbulance();


/* ============================================================
   EMERGENCY UI
   ============================================================ */

const emergencyButton =
    document.createElement("button");

emergencyButton.textContent =
    "🚑 Trigger Emergency";

emergencyButton.className =
    "emergency-btn";

document.body.appendChild(
    emergencyButton
);


const emergencyBanner =
    document.createElement("div");

emergencyBanner.className =
    "emergency-banner";

emergencyBanner.textContent =
    "🚨 EMERGENCY MODE ACTIVE";

document.body.appendChild(
    emergencyBanner
);


/* ============================================================
   EMERGENCY
   ============================================================ */

function triggerEmergency() {

    if (
        emergencyMode
    )
        return;


    emergencyMode = true;


    ambulance.position.set(
        -23,
        0,
        -1.5
    );


    trafficState =
        "HORIZONTAL_GREEN";

    trafficTimer = 0;

    currentGreenTime = 15;


    aiDecision =
        "Emergency vehicle detected — signal priority activated";


    emergencyButton.textContent =
        "🚨 EMERGENCY ACTIVE";

    emergencyButton.classList.add(
        "is-active"
    );


    emergencyBanner.classList.add(
        "is-visible"
    );

}


emergencyButton.addEventListener(
    "click",
    triggerEmergency
);


/* ============================================================
   MOVE AMBULANCE
   ============================================================ */

function moveAmbulance(
    delta
) {

    if (
        !emergencyMode
    )
        return;


    ambulance.position.x +=
        3.8 * delta;


    ambulance.userData.siren
        .material
        .emissiveIntensity =
        Math.sin(
            performance.now() *
            0.015
        ) > 0
            ? 3.5
            : 0.2;


    if (
        ambulance.position.x > 43
    ) {

        emergencyMode = false;

        ambulance.position.x = -23;

        emergencyButton.textContent =
            "🚑 Trigger Emergency";

        emergencyButton.classList.remove(
            "is-active"
        );

        emergencyBanner.classList.remove(
            "is-visible"
        );

        selectNextGreen();

    }

}


/* ============================================================
   AI PANEL
   ============================================================ */

const aiPanel =
    document.createElement("div");

aiPanel.className =
    "hud-panel ai-panel";

aiPanel.innerHTML = `

    <div class="ai-panel-title">
        AI Traffic Control
    </div>

    <div class="ai-panel-mode">
        <span class="pulse-dot"></span>
        AI MODE ACTIVE
    </div>

    <div class="ai-metric">
        <span>Horizontal traffic</span>
        <span id="ai-horizontal">6</span>
    </div>

    <div class="ai-metric">
        <span>Vertical traffic</span>
        <span id="ai-vertical">6</span>
    </div>

    <div class="ai-metric">
        <span>Green time</span>
        <span id="ai-green-time">8s</span>
    </div>

    <div class="ai-decision"
         id="ai-decision">
        AI detected balanced traffic
    </div>

`;

document.body.appendChild(
    aiPanel
);


/* ============================================================
   AI UPDATE
   ============================================================ */

function updateAIPanel() {

    calculateTraffic();


    document.getElementById(
        "ai-horizontal"
    ).textContent =
        horizontalTraffic;


    document.getElementById(
        "ai-vertical"
    ).textContent =
        verticalTraffic;


    document.getElementById(
        "ai-green-time"
    ).textContent =
        currentGreenTime +
        "s";


    document.getElementById(
        "ai-decision"
    ).textContent =
        aiDecision;

}


/* ============================================================
   DAY/NIGHT BUTTON
   ============================================================ */

const dayNightButton =
    document.getElementById(
        "day-night-button"
    );


function setDayMode() {

    isNight = false;


    scene.background.set(
        0x82cbea
    );

    scene.fog.color.set(
        0x82cbea
    );


    targetAmbient = 1.25;
    targetSun = 2.2;


    ground.material.color.set(
        0x3d7d40
    );


    streetLights.forEach(
        light => {

            light.light.intensity = 0;

        }
    );


    buildingWindows.forEach(
        window => {

            window.material =
                dayWindowMaterial;

        }
    );


    dayNightButton.textContent =
        "🌙 Switch to Night";

}


function setNightMode() {

    isNight = true;


    scene.background.set(
        0x071323
    );

    scene.fog.color.set(
        0x071323
    );


    targetAmbient = 0.48;
    targetSun = 0.32;


    ground.material.color.set(
        0x183d24
    );


    streetLights.forEach(
        light => {

            light.light.intensity = 2.2;

        }
    );


    buildingWindows.forEach(
        window => {

            window.material =
                nightWindowMaterial;

        }
    );


    dayNightButton.textContent =
        "☀️ Switch to Day";

}


dayNightButton.addEventListener(
    "click",
    () => {

        if (
            isNight
        )
            setDayMode();

        else
            setNightMode();

    }
);


/* ============================================================
   DASHBOARD
   ============================================================ */

let dashboardClock = 0;


/* Actual traffic density */

function calculateDensity() {

    let roadOccupancy = 0;


    cars.forEach(
        car => {

            const x =
                Math.abs(
                    car.position.x
                );

            const z =
                Math.abs(
                    car.position.z
                );


            /* intersection */

            if (
                x < 12 &&
                z < 12
            ) {

                roadOccupancy++;

            }


            /* queue area */

            if (
                (
                    x < 16 &&
                    z < 4
                ) ||
                (
                    z < 16 &&
                    x < 4
                )
            ) {

                roadOccupancy++;

            }

        }
    );


    const maxOccupancy =
        cars.length * 2;


    return Math.min(
        100,
        Math.round(
            (
                roadOccupancy /
                Math.max(
                    maxOccupancy,
                    1
                )
            ) * 100
        )
    );

}


/* actual average speed */

function calculateAverageSpeed() {

    let total = 0;


    cars.forEach(
        car => {

            total +=
                car.userData.currentSpeed;

        }
    );


    const average =
        total /
        Math.max(
            cars.length,
            1
        );


    return Math.round(
        average * 14
    );

}


function updateDashboard() {

    const density =
        calculateDensity();


    const averageSpeed =
        calculateAverageSpeed();


    const vehicles =
        document.getElementById(
            "vehicle-count"
        );


    const densityElement =
        document.getElementById(
            "traffic-density"
        );


    const speedElement =
        document.getElementById(
            "average-speed"
        );


    const signalElement =
        document.getElementById(
            "signal-status"
        );


    const timerElement =
        document.getElementById(
            "signal-timer"
        );


    const dashboard =
        document.getElementById(
            "dashboard"
        );


    vehicles.textContent =
        cars.length;


    densityElement.textContent =
        density + "%";


    speedElement.textContent =
        Math.max(
            0,
            Math.min(
                averageSpeed,
                60
            )
        ) +
        " km/h";


    const yellow =
        trafficState.includes(
            "YELLOW"
        );


    signalElement.textContent =
        yellow
            ? "YELLOW"
            : "GREEN";


    signalElement.classList.toggle(
        "is-caution",
        yellow
    );


    signalElement.classList.toggle(
        "is-go",
        !yellow
    );


    dashboard.classList.toggle(
        "is-caution",
        yellow
    );


    dashboard.classList.toggle(
        "is-go",
        !yellow
    );


    const duration =
        yellow
            ? YELLOW_TIME
            : currentGreenTime;


    const remaining =
        Math.max(
            0,
            Math.ceil(
                duration -
                trafficTimer
            )
        );


    timerElement.textContent =
        remaining + "s";

}


/* ============================================================
   LIGHTING TRANSITION
   ============================================================ */

function updateLighting(
    delta
) {

    ambientLight.intensity =
        THREE.MathUtils.lerp(
            ambientLight.intensity,
            targetAmbient,
            Math.min(
                delta * 2,
                1
            )
        );


    sun.intensity =
        THREE.MathUtils.lerp(
            sun.intensity,
            targetSun,
            Math.min(
                delta * 2,
                1
            )
        );

}


/* ============================================================
   INITIAL STATE
   ============================================================ */

selectNextGreen();

updateTrafficLights();

setDayMode();

updateDashboard();

updateAIPanel();


/* ============================================================
   ANIMATION LOOP
   ============================================================ */

let previousTime =
    performance.now();


function animate() {

    requestAnimationFrame(
        animate
    );


    const now =
        performance.now();


    let delta =
        (
            now -
            previousTime
        ) / 1000;


    previousTime =
        now;


    /* safety against tab lag */

    delta =
        Math.min(
            delta,
            0.05
        );


    controls.update();


    updateTrafficSystem(
        delta
    );


    moveCars(
        delta
    );


    moveAmbulance(
        delta
    );


    updateLighting(
        delta
    );


    dashboardClock +=
        delta;


    if (
        dashboardClock >
        0.15
    ) {

        updateDashboard();

        updateAIPanel();

        dashboardClock = 0;

    }


    renderer.render(
        scene,
        camera
    );

}


animate();


/* ============================================================
   RESIZE
   ============================================================ */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setPixelRatio
            Math.min(
                window.devicePixelRatio,
                1.6
            );

    }
);


/* ============================================================
   VISIBILITY SAFETY
   ============================================================ */

document.addEventListener(
    "visibilitychange",
    () => {

        previousTime =
            performance.now();

    }
);