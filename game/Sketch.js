const flock = []
const objects = []

let alignSlider, cohesionSlider, separationSlider, sepObjectsSlider

function setup() {
    createCanvas(1500, 1500);
    alignSlider = createSlider(0,5,1,0.1)
    cohesionSlider = createSlider(0,5,1,0.1)
    separationSlider = createSlider(0,5,1.1,0.1)
    sepObjectsSlider = createSlider(0,5,5,0.1)
    for(let i = 0; i < 200; i++)
        flock.push(new Boid())
    objects.push(new ObjectType(width/2, height/2))
    objects.push(new ObjectType(mouseX, mouseY))
}

function draw() {
    background(51);

    for(let boid of flock){
        boid.edges()
        boid.flock(flock)
        boid.flockObjects(objects)
        boid.update();
        boid.show();
    }

    objects[objects.length - 1].update(mouseX, mouseY)
    for(let object of objects){
        object.show()
    }
}