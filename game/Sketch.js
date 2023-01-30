let flock = []
let objects = []
let separationPower = 0.2
let boidsPerception = 15
let maxSpeed = 3
let t = 0
let t2 = 0

var canvas;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0)
    canvas.style('z-index','-1')
    for(let i = 0 ; i < 200 ; i++) {
        flock.push(new Boid())
    }
    /*
    for(let i = 0 ; i <= 22 ; i++) {
        objects.push(new ObjectType(width/2 - 110 +i*10, height/2 +  140)) 
    }
    for(let i = 0 ; i <= 22 ; i++) {
        objects.push(new ObjectType(width/2 - 110      , height/2 +  140 -i*10)) 
    }
    for(let i = 0 ; i <= 22 ; i++) {
        objects.push(new ObjectType(width/2 + 110      , height/2 +  140 -i*10)) 
    }
    for(let i = 0 ; i <= 27 ; i++) {
        objects.push(new ObjectType(width/2 - 135 +i*10, height/2 - 130)) 
    }
    objects.push(new ObjectType(width/2 + 135, height/2 - 120)) 
    objects.push(new ObjectType(width/2 + 135, height/2 - 110)) 
    objects.push(new ObjectType(width/2 + 135, height/2 - 100)) 
    objects.push(new ObjectType(width/2 + 135, height/2 - 90)) 

    objects.push(new ObjectType(width/2 - 135, height/2 - 120)) 
    objects.push(new ObjectType(width/2 - 135, height/2 - 110)) 
    objects.push(new ObjectType(width/2 - 135, height/2 - 100)) 
    objects.push(new ObjectType(width/2 - 135, height/2 - 90))

    objects.push(new ObjectType(width/2 - 120, height/2 - 80))
    objects.push(new ObjectType(width/2 - 130, height/2 - 80))

    objects.push(new ObjectType(width/2 + 120, height/2 - 80))
    objects.push(new ObjectType(width/2 + 130, height/2 - 80))*/
}

function draw() {
    background(0);

    for(let boid of flock){
        boid.edges()
        boid.flock(flock)
        boid.flockObjects(objects)
        boid.update(separationPower,boidsPerception,maxSpeed);
        boid.show();
    }


    if(t>1)
    {
        t=t-1
    }
    else if(t==1)
    {
        t=t-1
        separationPower = 0.2
        boidsPerception = 15
        for(let boid of flock){
            boid.mycolor = color(0,random(155),random(255))
        }
    }

    t2++
    if(t2==1000)
    {
        t2=0
        separationPower = 1
        boidsPerception = 100
        t=25
    }


    //objects[objects.length - 1].update(mouseX, mouseY)
    /*for(let object of objects){
        object.show()
    }*/
}

function mousePressed(){
    separationPower = 1
    boidsPerception = 100
    t=25
    t2=0
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseOn(){
    /*
    separationPower = 1
    boidsPerception = 100
    t2 = 0
    */
    maxSpeed = 1
}

function mouseOut(){
    /*
    separationPower = 0.2
    boidsPerception = 15
    */
    maxSpeed = 3
}