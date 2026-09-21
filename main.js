import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// ============================================================
// SMART CITY SIMULATOR
// Complete Main.js
// ============================================================


// ============================================================
// SCENE
// ============================================================

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x87ceeb);


// ============================================================
// CAMERA
// ============================================================

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );

camera.position.set(
    20,
    22,
    20
);


// ============================================================
// RENDERER
// ============================================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

document
    .getElementById("city-container")
    .appendChild(
        renderer.domElement
    );


// ============================================================
// CONTROLS
// ============================================================

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping =
    true;

controls.target.set(
    0,
    0,
    0
);


// ============================================================
// LIGHT
// ============================================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.7
    );

scene.add(
    ambientLight
);


const sunlight =
    new THREE.DirectionalLight(
        0xffffff,
        1
    );

sunlight.position.set(
    20,
    30,
    10
);

scene.add(
    sunlight
);


// ============================================================
// DAY NIGHT
// ============================================================

let isNight = false;


// ============================================================
// GROUND
// ============================================================

const ground =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            50,
            0.5,
            50
        ),

        new THREE.MeshStandardMaterial({
            color: 0x4f984f
        })

    );

ground.position.y =
    -0.25;

scene.add(
    ground
);


// ============================================================
// ROADS
// ============================================================

const roadMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x292929
    });


const horizontalRoad =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            50,
            0.1,
            6
        ),

        roadMaterial

    );

horizontalRoad.position.y =
    0.05;

scene.add(
    horizontalRoad
);


const verticalRoad =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            6,
            0.1,
            50
        ),

        roadMaterial

    );

verticalRoad.position.y =
    0.06;

scene.add(
    verticalRoad
);


// ============================================================
// ROAD MARKINGS
// ============================================================

const lineMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    });


function createRoadLine(
    x,
    z,
    width,
    depth
) {

    const line =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                width,
                0.12,
                depth
            ),

            lineMaterial

        );

    line.position.set(
        x,
        0.13,
        z
    );

    scene.add(
        line
    );
}


// Horizontal road

for (
    let x = -24;
    x <= 24;
    x += 8
) {

    createRoadLine(
        x,
        0,
        4,
        0.12
    );

}


// Vertical road

for (
    let z = -24;
    z <= 24;
    z += 8
) {

    createRoadLine(
        0,
        z,
        0.12,
        4
    );

}


// ============================================================
// BUILDINGS
// ============================================================

function createBuilding(
    x,
    z,
    width,
    height,
    depth
) {

    const building =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),

            new THREE.MeshStandardMaterial({
                color: 0xb4c0d0
            })

        );

    building.position.set(
        x,
        height / 2,
        z
    );

    scene.add(
        building
    );


    // Windows

    for (
        let row = 0;
        row < Math.floor(height / 2);
        row++
    ) {

        for (
            let col = 0;
            col < Math.floor(width / 1.5);
            col++
        ) {

            const windowMesh =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        0.35,
                        0.45,
                        0.05
                    ),

                    new THREE.MeshStandardMaterial({
                        color: 0x9fd8ff
                    })

                );

            windowMesh.position.set(

                x -
                width / 2 +
                0.8 +
                col * 1.4,

                1.2 +
                row * 1.8,

                z -
                depth / 2 -
                0.03

            );

            windowMesh.userData.cityWindow =
                true;

            scene.add(
                windowMesh
            );

        }

    }

}


// Buildings

createBuilding(
    -12,
    -12,
    6,
    10,
    6
);

createBuilding(
    -20,
    -12,
    5,
    7,
    5
);

createBuilding(
    12,
    -12,
    6,
    12,
    6
);

createBuilding(
    20,
    -12,
    5,
    8,
    5
);

createBuilding(
    -12,
    12,
    6,
    8,
    6
);

createBuilding(
    -20,
    12,
    5,
    11,
    5
);

createBuilding(
    12,
    12,
    6,
    13,
    6
);

createBuilding(
    20,
    12,
    5,
    7,
    5
);


// ============================================================
// TREES
// ============================================================

function createTree(
    x,
    z
) {

    const group =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.25,
                0.35,
                2,
                10
            ),

            new THREE.MeshStandardMaterial({
                color: 0x6b3e26
            })

        );

    trunk.position.y =
        1;

    group.add(
        trunk
    );


    const leaves =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                1.4,
                12,
                12
            ),

            new THREE.MeshStandardMaterial({
                color: 0x1f7a3a
            })

        );

    leaves.position.y =
        2.7;

    group.add(
        leaves
    );


    group.position.set(
        x,
        0,
        z
    );

    scene.add(
        group
    );
}


[
    [-8, -10],
    [-18, -5],
    [-8, 10],
    [-18, 6],
    [8, -10],
    [18, -5],
    [8, 10],
    [18, 6],
    [-10, -20],
    [10, 20],
    [-19, 16],
    [-15, 16],
    [-19, 19],
    [-15, 19]
].forEach(
    p => createTree(
        p[0],
        p[1]
    )
);


// ============================================================
// STREET LIGHTS
// ============================================================

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
                0.12,
                0.12,
                3,
                12
            ),

            new THREE.MeshStandardMaterial({
                color: 0x222222
            })

        );

    pole.position.y =
        1.5;

    group.add(
        pole
    );


    const lamp =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.25,
                16,
                16
            ),

            new THREE.MeshStandardMaterial({
                color: 0xffffcc,
                emissive: 0xffaa00,
                emissiveIntensity: 2
            })

        );

    lamp.position.y =
        3.1;

    group.add(
        lamp
    );


    const light =
        new THREE.PointLight(
            0xffaa55,
            0,
            8
        );

    light.position.y =
        3;

    group.add(
        light
    );


    group.position.set(
        x,
        0,
        z
    );

    scene.add(
        group
    );


    streetLights.push({
        light
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
    p => createStreetLight(
        p[0],
        p[1]
    )
);


// ============================================================
// ZEBRA CROSSING
// ============================================================

const zebraMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    });


function createZebraCrossing(
    x,
    z,
    direction
) {

    const group =
        new THREE.Group();


    for (
        let i = -3;
        i <= 3;
        i++
    ) {

        let stripe;


        if (
            direction ===
            "horizontal"
        ) {

            stripe =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        0.5,
                        0.08,
                        4
                    ),

                    zebraMaterial

                );

            stripe.position.x =
                i * 0.7;

        }

        else {

            stripe =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        4,
                        0.08,
                        0.5
                    ),

                    zebraMaterial

                );

            stripe.position.z =
                i * 0.7;

        }


        group.add(
            stripe
        );

    }


    group.position.set(
        x,
        0.16,
        z
    );

    scene.add(
        group
    );
}


// Four crossings

createZebraCrossing(
    -4.5,
    0,
    "horizontal"
);

createZebraCrossing(
    4.5,
    0,
    "horizontal"
);

createZebraCrossing(
    0,
    -4.5,
    "vertical"
);

createZebraCrossing(
    0,
    4.5,
    "vertical"
);


// ============================================================
// TRAFFIC LIGHTS
// ============================================================

const trafficLights = [];


function createTrafficLight(
    x,
    z,
    controls
) {

    const group =
        new THREE.Group();


    const pole =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.15,
                0.15,
                4,
                16
            ),

            new THREE.MeshStandardMaterial({
                color: 0x222222
            })

        );

    pole.position.y =
        2;

    group.add(
        pole
    );


    const box =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.8,
                1.8,
                0.5
            ),

            new THREE.MeshStandardMaterial({
                color: 0x111111
            })

        );

    box.position.y =
        3.8;

    group.add(
        box
    );


    const sphere =
        new THREE.SphereGeometry(
            0.18,
            16,
            16
        );


    const red =
        new THREE.Mesh(
            sphere,
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x550000
            })
        );

    red.position.set(
        0,
        4.25,
        -0.3
    );

    group.add(
        red
    );


    const yellow =
        new THREE.Mesh(
            sphere,
            new THREE.MeshStandardMaterial({
                color: 0xffff00,
                emissive: 0x555500
            })
        );

    yellow.position.set(
        0,
        3.8,
        -0.3
    );

    group.add(
        yellow
    );


    const green =
        new THREE.Mesh(
            sphere,
            new THREE.MeshStandardMaterial({
                color: 0x00ff00,
                emissive: 0x005500
            })
        );

    green.position.set(
        0,
        3.35,
        -0.3
    );

    group.add(
        green
    );


    group.position.set(
        x,
        0,
        z
    );

    scene.add(
        group
    );


    trafficLights.push({
        red,
        yellow,
        green,
        controls
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


// ============================================================
// TRAFFIC STATE
// ============================================================

let trafficState =
    "HORIZONTAL_GREEN";

let trafficTimer =
    0;

let currentGreenTime =
    8;

const YELLOW_TIME =
    2;


// ============================================================
// CARS
// ============================================================

const cars = [];


const SAFE_DISTANCE =
    3.5;


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
                1.8,
                0.6,
                1
            ),

            new THREE.MeshStandardMaterial({
                color
            })

        );

    body.position.y =
        0.5;

    car.add(
        body
    );


    const roof =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1,
                0.45,
                0.8
            ),

            new THREE.MeshStandardMaterial({
                color
            })

        );

    roof.position.y =
        1;

    car.add(
        roof
    );


    const wheelGeometry =
        new THREE.CylinderGeometry(
            0.22,
            0.22,
            0.15,
            16
        );


    const wheelMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111111
        });


    [
        [-0.65, 0.25, 0.5],
        [0.65, 0.25, 0.5],
        [-0.65, 0.25, -0.5],
        [0.65, 0.25, -0.5]
    ].forEach(
        p => {

            const wheel =
                new THREE.Mesh(
                    wheelGeometry,
                    wheelMaterial
                );

            wheel.rotation.x =
                Math.PI / 2;

            wheel.position.set(
                p[0],
                p[1],
                p[2]
            );

            car.add(
                wheel
            );

        }
    );


    car.position.set(
        x,
        0,
        z
    );


    car.userData.direction =
        direction;


    scene.add(
        car
    );

    cars.push(
        car
    );
}


// ============================================================
// INITIAL CARS
// ============================================================

// Horizontal

createCar(
    0xff0000,
    -20,
    -1.5,
    "right"
);

createCar(
    0xff8800,
    -12,
    -1.5,
    "right"
);

createCar(
    0x00cc88,
    -4,
    -1.5,
    "right"
);


createCar(
    0x0066ff,
    20,
    1.5,
    "left"
);

createCar(
    0xffff00,
    12,
    1.5,
    "left"
);

createCar(
    0xff55aa,
    4,
    1.5,
    "left"
);


// Vertical

createCar(
    0xffffff,
    1.5,
    -20,
    "down"
);

createCar(
    0xffcc00,
    1.5,
    -12,
    "down"
);

createCar(
    0x00aaff,
    1.5,
    -4,
    "down"
);


createCar(
    0xaa0000,
    -1.5,
    20,
    "up"
);

createCar(
    0x0088ff,
    -1.5,
    12,
    "up"
);

createCar(
    0x55aa00,
    -1.5,
    4,
    "up"
);


// ============================================================
// PEDESTRIANS
// ============================================================

const pedestrians = [];


function createPedestrian(
    x,
    z,
    direction
) {

    const person =
        new THREE.Group();


    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.35,
                0.8,
                0.35
            ),

            new THREE.MeshStandardMaterial({
                color: 0x3366ff
            })

        );

    body.position.y =
        0.65;

    person.add(
        body
    );


    const head =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.22,
                12,
                12
            ),

            new THREE.MeshStandardMaterial({
                color: 0xffcc99
            })

        );

    head.position.y =
        1.25;

    person.add(
        head
    );


    person.position.set(
        x,
        0,
        z
    );


    person.userData.direction =
        direction;

    person.userData.crossing =
        false;


    scene.add(
        person
    );

    pedestrians.push(
        person
    );
}


// These pedestrians cross
// the horizontal road.

createPedestrian(
    -4.5,
    -4.5,
    "up"
);

createPedestrian(
    4.5,
    4.5,
    "down"
);


// ============================================================
// PEDESTRIAN CROSSING CONTROL
// ============================================================

let pedestrianCrossingActive =
    false;


function isPedestrianCrossing() {

    return pedestrians.some(
        person =>
            person.userData.crossing
    );

}


// ============================================================
// GET CAR AHEAD
// ============================================================

function getCarAhead(
    currentCar
) {

    const direction =
        currentCar.userData.direction;


    let closestCar =
        null;

    let closestDistance =
        Infinity;


    cars.forEach(
        other => {

            if (
                other ===
                currentCar
            ) {

                return;

            }


            if (
                other.userData.direction !==
                direction
            ) {

                return;

            }


            let distance =
                Infinity;


            if (
                direction === "right" &&
                other.position.x >
                currentCar.position.x
            ) {

                distance =
                    other.position.x -
                    currentCar.position.x;

            }


            if (
                direction === "left" &&
                other.position.x <
                currentCar.position.x
            ) {

                distance =
                    currentCar.position.x -
                    other.position.x;

            }


            if (
                direction === "down" &&
                other.position.z >
                currentCar.position.z
            ) {

                distance =
                    other.position.z -
                    currentCar.position.z;

            }


            if (
                direction === "up" &&
                other.position.z <
                currentCar.position.z
            ) {

                distance =
                    currentCar.position.z -
                    other.position.z;

            }


            if (
                distance > 0 &&
                distance <
                closestDistance
            ) {

                closestDistance =
                    distance;

                closestCar =
                    other;

            }

        }
    );


    return {
        car:
            closestCar,
        distance:
            closestDistance
    };

}


// ============================================================
// HARD PEDESTRIAN BARRIER
// ============================================================
//
// IMPORTANT:
// Cars are stopped BEFORE entering the crosswalk.
// They don't wait until they are already on the pedestrian.
//
// ============================================================

function pedestrianBarrier(
    car
) {

    const direction =
        car.userData.direction;


    for (
        const person of pedestrians
    ) {

        if (
            !person.userData.crossing
        ) {

            continue;

        }


        const px =
            person.position.x;

        const pz =
            person.position.z;


        // ====================================================
        // HORIZONTAL CAR
        // ====================================================

        if (
            direction === "right" ||
            direction === "left"
        ) {

            // Pedestrian is crossing
            // horizontal road.

            if (
                Math.abs(
                    pz
                ) < 3
            ) {

                // LEFT CROSSING
                //
                // Crossing center = x -4.5

                if (
                    Math.abs(
                        px + 4.5
                    ) < 3
                ) {

                    if (
                        direction === "right"
                    ) {

                        // Stop BEFORE x = -6

                        if (
                            car.position.x <
                            -2.8
                        ) {

                            return true;

                        }

                    }


                    if (
                        direction === "left"
                    ) {

                        if (
                            car.position.x >
                            -6.2
                        ) {

                            return true;

                        }

                    }

                }


                // RIGHT CROSSING
                //
                // Crossing center = x +4.5

                if (
                    Math.abs(
                        px - 4.5
                    ) < 3
                ) {

                    if (
                        direction === "right"
                    ) {

                        if (
                            car.position.x <
                            2.8
                        ) {

                            return true;

                        }

                    }


                    if (
                        direction === "left"
                    ) {

                        if (
                            car.position.x >
                            6.2
                        ) {

                            return true;

                        }

                    }

                }

            }

        }


        // ====================================================
        // VERTICAL CAR
        // ====================================================

        if (
            direction === "up" ||
            direction === "down"
        ) {

            // Safety around intersection

            if (
                Math.abs(px) < 3 &&
                Math.abs(pz) < 5
            ) {

                if (
                    Math.abs(
                        car.position.x -
                        px
                    ) < 3
                ) {

                    if (
                        direction === "down"
                    ) {

                        if (
                            car.position.z <
                            6
                        ) {

                            return true;

                        }

                    }


                    if (
                        direction === "up"
                    ) {

                        if (
                            car.position.z >
                            -6
                        ) {

                            return true;

                        }

                    }

                }

            }

        }

    }


    return false;

}


// ============================================================
// MOVE PEDESTRIANS
// ============================================================

function movePedestrians() {

    pedestrianCrossingActive =
        false;


    pedestrians.forEach(
        person => {

            // Pedestrians may only STEP OFF the curb
            // when horizontal traffic is RED. But once
            // they're already on the crosswalk, they
            // keep walking (and stay protected) until
            // they reach the other side, even if the
            // light changes underneath them.

            const safePhase =
                trafficState ===
                "VERTICAL_GREEN";


            if (
                !person.userData.crossing
            ) {

                if (
                    !safePhase
                ) {

                    return;

                }

                person.userData.crossing =
                    true;

            }


            pedestrianCrossingActive =
                true;


            const speed =
                0.025;


            if (
                person.userData.direction ===
                "up"
            ) {

                person.position.z +=
                    speed;


                if (
                    person.position.z >
                    4.5
                ) {

                    person.position.z =
                        -4.5;

                    person.userData.crossing =
                        false;

                }

            }


            if (
                person.userData.direction ===
                "down"
            ) {

                person.position.z -=
                    speed;


                if (
                    person.position.z <
                    -4.5
                ) {

                    person.position.z =
                        4.5;

                    person.userData.crossing =
                        false;

                }

            }

        }
    );

}


// ============================================================
// TRAFFIC COUNTER
// ============================================================

let horizontalTraffic =
    0;

let verticalTraffic =
    0;

let aiDecision =
    "AI analyzing traffic...";


function calculateTraffic() {

    horizontalTraffic =
        0;

    verticalTraffic =
        0;


    cars.forEach(
        car => {

            if (
                car.userData.direction ===
                "right" ||

                car.userData.direction ===
                "left"
            ) {

                horizontalTraffic++;

            }

            else {

                verticalTraffic++;

            }

        }
    );

}


// ============================================================
// AI GREEN TIME
// ============================================================

function calculateAIGreenTime(
    count
) {

    if (
        count >= 5
    ) {

        return 12;

    }

    if (
        count >= 4
    ) {

        return 10;

    }

    if (
        count >= 2
    ) {

        return 8;

    }

    return 6;

}


// ============================================================
// SELECT NEXT SIGNAL
// ============================================================

function selectNextGreen() {

    calculateTraffic();


    if (
        horizontalTraffic >
        verticalTraffic
    ) {

        trafficState =
            "HORIZONTAL_GREEN";

        currentGreenTime =
            calculateAIGreenTime(
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
            calculateAIGreenTime(
                verticalTraffic
            );

        aiDecision =
            "AI prioritised vertical traffic";

    }

    else {

        if (
            trafficState.includes(
                "HORIZONTAL"
            )
        ) {

            trafficState =
                "VERTICAL_GREEN";

        }

        else {

            trafficState =
                "HORIZONTAL_GREEN";

        }

        currentGreenTime =
            8;

        aiDecision =
            "AI detected balanced traffic";

    }


    trafficTimer =
        0;

}


// ============================================================
// UPDATE SIGNAL LIGHTS
// ============================================================

function updateTrafficLights() {

    trafficLights.forEach(
        signal => {

            signal.red.material
                .emissiveIntensity =
                0.1;

            signal.yellow.material
                .emissiveIntensity =
                0.1;

            signal.green.material
                .emissiveIntensity =
                0.1;


            const isGreen =
                trafficState ===
                (signal.controls === "horizontal"
                    ? "HORIZONTAL_GREEN"
                    : "VERTICAL_GREEN");

            const isYellow =
                trafficState ===
                (signal.controls === "horizontal"
                    ? "HORIZONTAL_YELLOW"
                    : "VERTICAL_YELLOW");


            if (
                isGreen
            ) {

                signal.green.material
                    .emissiveIntensity =
                    1;

            }

            else if (
                isYellow
            ) {

                signal.yellow.material
                    .emissiveIntensity =
                    1;

            }

            else {

                signal.red.material
                    .emissiveIntensity =
                    1;

            }

        }
    );

}


// ============================================================
// TRAFFIC SYSTEM
// ============================================================

function updateTrafficSystem(
    deltaTime
) {

    // While the ambulance is still moving through
    // the intersection, keep the signal pinned to
    // HORIZONTAL_GREEN no matter how long it takes
    // (e.g. if it got briefly stuck behind traffic).

    if (
        emergencyMode
    ) {

        trafficState =
            "HORIZONTAL_GREEN";

        trafficTimer =
            0;

        updateTrafficLights();

        return;

    }


    trafficTimer +=
        deltaTime;


    if (
        trafficState ===
        "HORIZONTAL_GREEN" ||

        trafficState ===
        "VERTICAL_GREEN"
    ) {

        if (
            trafficTimer >=
            currentGreenTime
        ) {

            if (
                trafficState ===
                "HORIZONTAL_GREEN"
            ) {

                trafficState =
                    "HORIZONTAL_YELLOW";

            }

            else {

                trafficState =
                    "VERTICAL_YELLOW";

            }

            trafficTimer =
                0;

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


// ============================================================
// SIGNAL STOP
// ============================================================

function shouldStopAtSignal(
    car
) {

    const direction =
        car.userData.direction;


    // ========================================================
    // PEDESTRIAN BARRIER HAS PRIORITY
    // ========================================================

    if (
        pedestrianBarrier(
            car
        )
    ) {

        return true;

    }


    // ========================================================
    // NORMAL SIGNAL
    // ========================================================

    if (
        direction === "right"
    ) {

        if (
            trafficState !==
            "HORIZONTAL_GREEN" &&

            car.position.x >=
            -8 &&

            car.position.x <=
            -3
        ) {

            return true;

        }

    }


    if (
        direction === "left"
    ) {

        if (
            trafficState !==
            "HORIZONTAL_GREEN" &&

            car.position.x <=
            8 &&

            car.position.x >=
            3
        ) {

            return true;

        }

    }


    if (
        direction === "down"
    ) {

        if (
            trafficState !==
            "VERTICAL_GREEN" &&

            car.position.z >=
            -8 &&

            car.position.z <=
            -3
        ) {

            return true;

        }

    }


    if (
        direction === "up"
    ) {

        if (
            trafficState !==
            "VERTICAL_GREEN" &&

            car.position.z <=
            8 &&

            car.position.z >=
            3
        ) {

            return true;

        }

    }


    return false;

}


// ============================================================
// MOVE CARS
// ============================================================

function moveCars() {

    cars.forEach(
        car => {

            const direction =
                car.userData.direction;


            let speed =
                0.05;


            // =================================================
            // CAR AHEAD
            // =================================================

            const ahead =
                getCarAhead(
                    car
                );


            if (
                ahead.car &&
                ahead.distance <
                SAFE_DISTANCE
            ) {

                speed =
                    0;

            }


            // =================================================
            // SIGNAL + PEDESTRIAN
            // =================================================

            if (
                shouldStopAtSignal(
                    car
                )
            ) {

                speed =
                    0;

            }


            // =================================================
            // YELLOW
            // =================================================

            if (
                trafficState.includes(
                    "YELLOW"
                )
            ) {

                speed =
                    Math.min(
                        speed,
                        0.02
                    );

            }


            // =================================================
            // MOVE RIGHT
            // =================================================

            if (
                direction === "right"
            ) {

                car.position.x +=
                    speed;


                if (
                    car.position.x >
                    25
                ) {

                    car.position.x =
                        -25;

                }

            }


            // =================================================
            // MOVE LEFT
            // =================================================

            if (
                direction === "left"
            ) {

                car.position.x -=
                    speed;


                if (
                    car.position.x <
                    -25
                ) {

                    car.position.x =
                        25;

                }

            }


            // =================================================
            // MOVE DOWN
            // =================================================

            if (
                direction === "down"
            ) {

                car.position.z +=
                    speed;


                if (
                    car.position.z >
                    25
                ) {

                    car.position.z =
                        -25;

                }

            }


            // =================================================
            // MOVE UP
            // =================================================

            if (
                direction === "up"
            ) {

                car.position.z -=
                    speed;


                if (
                    car.position.z <
                    -25
                ) {

                    car.position.z =
                        25;

                }

            }

        }
    );

}


// ============================================================
// AMBULANCE
// ============================================================

let ambulance =
    null;

let emergencyMode =
    false;


function createAmbulance() {

    ambulance =
        new THREE.Group();


    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                2.2,
                0.8,
                1.1
            ),

            new THREE.MeshStandardMaterial({
                color: 0xffffff
            })

        );

    body.position.y =
        0.6;

    ambulance.add(
        body
    );


    const stripe =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                2.25,
                0.18,
                1.12
            ),

            new THREE.MeshStandardMaterial({
                color: 0xff0000
            })

        );

    stripe.position.y =
        0.75;

    ambulance.add(
        stripe
    );


    const roof =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1.2,
                0.5,
                0.9
            ),

            new THREE.MeshStandardMaterial({
                color: 0xffffff
            })

        );

    roof.position.y =
        1.25;

    ambulance.add(
        roof
    );


    const siren =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.5,
                0.18,
                0.25
            ),

            new THREE.MeshStandardMaterial({

                color: 0xff0000,

                emissive: 0xff0000,

                emissiveIntensity: 2

            })

        );

    siren.position.y =
        1.55;

    ambulance.add(
        siren
    );


    ambulance.position.set(
        -23,
        0,
        -1.5
    );


    scene.add(
        ambulance
    );

}


createAmbulance();


// ============================================================
// EMERGENCY BUTTON
// ============================================================

const emergencyButton =
    document.createElement(
        "button"
    );

emergencyButton.textContent =
    "🚑 Trigger Emergency";

emergencyButton.className =
    "emergency-btn";

document.body.appendChild(
    emergencyButton
);


// ============================================================
// EMERGENCY PANEL
// ============================================================

const emergencyPanel =
    document.createElement(
        "div"
    );

emergencyPanel.className =
    "emergency-banner";

emergencyPanel.innerHTML =
    "🚨 EMERGENCY MODE ACTIVE";

document.body.appendChild(
    emergencyPanel
);


// ============================================================
// EMERGENCY
// ============================================================

function triggerEmergency() {

    emergencyMode =
        true;


    ambulance.position.x =
        -23;

    ambulance.position.z =
        -1.5;


    trafficState =
        "HORIZONTAL_GREEN";

    trafficTimer =
        0;

    currentGreenTime =
        15;


    aiDecision =
        "Emergency vehicle detected - signal priority activated";


    emergencyButton.textContent =
        "🚨 EMERGENCY ACTIVE";

    emergencyButton.classList.add(
        "is-active"
    );


    emergencyPanel.classList.add(
        "is-visible"
    );

}


emergencyButton.addEventListener(
    "click",
    triggerEmergency
);


// ============================================================
// AMBULANCE SAFETY
// ============================================================

function ambulanceCarAhead() {

    let closest =
        null;

    let distance =
        Infinity;


    cars.forEach(
        car => {

            if (
                car.userData.direction !==
                "right"
            ) {

                return;

            }


            if (
                Math.abs(
                    car.position.z -
                    ambulance.position.z
                ) > 1
            ) {

                return;

            }


            if (
                car.position.x <=
                ambulance.position.x
            ) {

                return;

            }


            const d =
                car.position.x -
                ambulance.position.x;


            if (
                d <
                distance
            ) {

                distance =
                    d;

                closest =
                    car;

            }

        }
    );


    return {
        car:
            closest,
        distance
    };

}


// ============================================================
// MOVE AMBULANCE
// ============================================================

function moveAmbulance() {

    if (
        !emergencyMode
    ) {

        return;

    }


    const ahead =
        ambulanceCarAhead();


    let speed =
        0.07;


    if (
        ahead.car &&
        ahead.distance <
        4.5
    ) {

        speed =
            0;

    }


    ambulance.position.x +=
        speed;


    if (
        ambulance.position.x >
        26
    ) {

        emergencyMode =
            false;


        ambulance.position.x =
            -23;


        emergencyButton.textContent =
            "🚑 Trigger Emergency";


        emergencyButton.classList.remove(
            "is-active"
        );


        emergencyPanel.classList.remove(
            "is-visible"
        );


        selectNextGreen();

    }

}


// ============================================================
// AI PANEL
// ============================================================

const aiPanel =
    document.createElement(
        "div"
    );

aiPanel.className =
    "hud-panel ai-panel";


aiPanel.innerHTML = `

<div class="ai-panel-title">
AI Traffic Control
</div>

<div class="ai-panel-mode">
<span class="pulse-dot"></span>
AI mode active
</div>

<div class="ai-metric">
<span>Horizontal traffic</span>
<span id="ai-horizontal">0</span>
</div>

<div class="ai-metric">
<span>Vertical traffic</span>
<span id="ai-vertical">0</span>
</div>

<div class="ai-metric">
<span>Green time</span>
<span id="ai-green-time">8s</span>
</div>

<div class="ai-decision" id="ai-decision">
AI analyzing traffic...
</div>

`;

document.body.appendChild(
    aiPanel
);


// ============================================================
// AI PANEL UPDATE
// ============================================================

function updateAIPanel() {

    calculateTraffic();


    document
        .getElementById(
            "ai-horizontal"
        )
        .textContent =
        horizontalTraffic;


    document
        .getElementById(
            "ai-vertical"
        )
        .textContent =
        verticalTraffic;


    document
        .getElementById(
            "ai-green-time"
        )
        .textContent =
        currentGreenTime +
        "s";


    document
        .getElementById(
            "ai-decision"
        )
        .textContent =
        aiDecision;

}


// ============================================================
// DAY NIGHT
// ============================================================

const dayNightButton =
    document.getElementById(
        "day-night-button"
    );


function updateWindows() {

    scene.traverse(
        object => {

            if (
                object.userData &&
                object.userData.cityWindow
            ) {

                if (
                    isNight
                ) {

                    object.material.color.set(
                        0xffd966
                    );

                    object.material.emissive.set(
                        0xff9900
                    );

                    object.material.emissiveIntensity =
                        1.2;

                }

                else {

                    object.material.color.set(
                        0x9fd8ff
                    );

                    object.material.emissive.set(
                        0x000000
                    );

                    object.material.emissiveIntensity =
                        0;

                }

            }

        }
    );

}


function setDayMode() {

    isNight =
        false;


    scene.background =
        new THREE.Color(
            0x87ceeb
        );


    ambientLight.intensity =
        0.7;

    sunlight.intensity =
        1;


    ground.material.color.set(
        0x4f984f
    );


    streetLights.forEach(
        item => {

            item.light.intensity =
                0;

        }
    );


    if (
        dayNightButton
    ) {

        dayNightButton.textContent =
            "🌙 Switch to Night";

    }


    updateWindows();

}


function setNightMode() {

    isNight =
        true;


    scene.background =
        new THREE.Color(
            0x07111f
        );


    ambientLight.intensity =
        0.18;

    sunlight.intensity =
        0.15;


    ground.material.color.set(
        0x183d24
    );


    streetLights.forEach(
        item => {

            item.light.intensity =
                3;

        }
    );


    if (
        dayNightButton
    ) {

        dayNightButton.textContent =
            "☀️ Switch to Day";

    }


    updateWindows();

}


if (
    dayNightButton
) {

    dayNightButton.addEventListener(
        "click",
        () => {

            if (
                isNight
            ) {

                setDayMode();

            }

            else {

                setNightMode();

            }

        }
    );

}


// ============================================================
// DASHBOARD
// ============================================================

function updateDashboard() {

    const vehicleCount =
        document.getElementById(
            "vehicle-count"
        );


    if (
        vehicleCount
    ) {

        vehicleCount.textContent =
            cars.length;

    }


    let nearby =
        0;


    cars.forEach(
        car => {

            const distance =
                Math.sqrt(

                    car.position.x *
                    car.position.x +

                    car.position.z *
                    car.position.z

                );


            if (
                distance < 12
            ) {

                nearby++;

            }

        }
    );


    const density =
        Math.round(

            nearby /
            cars.length *
            100

        );


    const densityElement =
        document.getElementById(
            "traffic-density"
        );


    if (
        densityElement
    ) {

        densityElement.textContent =
            density +
            "%";

    }


    const speedElement =
        document.getElementById(
            "average-speed"
        );


    if (
        speedElement
    ) {

        speedElement.textContent =
            "50 km/h";

    }


    const signalElement =
        document.getElementById(
            "signal-status"
        );


    if (
        signalElement
    ) {

        const isYellow =
            trafficState.includes(
                "YELLOW"
            );


        signalElement.textContent =
            isYellow
                ? "YELLOW"
                : "GREEN";

        signalElement.classList.toggle(
            "is-caution",
            isYellow
        );

        signalElement.classList.toggle(
            "is-go",
            !isYellow
        );


        const dashboardPanel =
            document.getElementById(
                "dashboard"
            );


        if (
            dashboardPanel
        ) {

            dashboardPanel.classList.toggle(
                "is-caution",
                isYellow
            );

            dashboardPanel.classList.toggle(
                "is-go",
                !isYellow
            );

        }

    }


    const totalTime =
        trafficState.includes(
            "YELLOW"
        )
            ? YELLOW_TIME
            : currentGreenTime;


    const remaining =
        Math.max(

            0,

            Math.ceil(
                totalTime -
                trafficTimer
            )

        );


    const timerElement =
        document.getElementById(
            "signal-timer"
        );


    if (
        timerElement
    ) {

        timerElement.textContent =
            remaining +
            "s";

    }

}


// ============================================================
// INITIAL STATE
// ============================================================

updateTrafficLights();

calculateTraffic();

updateAIPanel();

updateDashboard();

setDayMode();


// ============================================================
// ANIMATION
// ============================================================

let lastTime =
    performance.now();


function animate() {

    requestAnimationFrame(
        animate
    );


    const now =
        performance.now();


    const deltaTime =
        (
            now -
            lastTime
        ) / 1000;


    lastTime =
        now;


    controls.update();


    updateTrafficSystem(
        deltaTime
    );


    movePedestrians();


    moveCars();


    moveAmbulance();


    updateDashboard();


    updateAIPanel();


    renderer.render(
        scene,
        camera
    );

    
}


animate();


// ============================================================
// RESIZE
// ============================================================

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

    }
);