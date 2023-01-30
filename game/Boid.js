class Boid {
    constructor() {
        let version = int(random(1,5))
        if(version==1){
            this.position = createVector(random(0,(width/2)-140), random(height));
        }
        else if(version==2){
            this.position = createVector(random((width/2)+140,width), random(height));
        }
        else if(version==3){
            this.position = createVector(random(width), random((height/2)+140,height));
        }
        else if(version==4){
            this.position = createVector(random(width), random(0,(height/2)-140));
        }
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxSeparationForce = 0.2
        this.maxObjectSeparationForce = 1.5
        this.maxCohesionForce = 0.1
        this.maxAlignForce = 0.1
        this.maxSpeed = 3


        this.alignPerception = 40
        this.cohesionPerception = 50
        this.boidsPerception = 15
        this.objectsPerception = 50

        this.mycolor = color(0,random(155),random(255))
    }

    edges(){
        if(this.position.x > width)
            this.position.x = 0
        else if(this.position.x < 0)
            this.position.x = width

        if(this.position.y > height)
            this.position.y = 0
        else if(this.position.y < 0)
            this.position.y = height
    }

    align(boids) {
        let perceptionRadius = this.alignPerception
        let steering = createVector();
        let total = 0
        for(let other of boids) {
            if(other != this && dist(this.position.x, this.position.y, other.position.x, other.position.y) < perceptionRadius){
                steering.add(other.velocity)
                total++
            }
        }    
        if ( total > 0){
            steering.div(total)
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity)
            steering.limit(this.maxAlignForce)
        }        
        return steering;
    }

    separation(boids) {
        let perceptionRadius = this.boidsPerception
        let steering = createVector();
        let total = 0
        for(let other of boids) {
            if(other != this && dist(this.position.x, this.position.y, other.position.x, other.position.y) < perceptionRadius){
                let diff = p5.Vector.sub(this.position, other.position)
                diff.div(dist(this.position.x, this.position.y, other.position.x, other.position.y))
                steering.add(diff)
                total++
            }
        }    
        if ( total > 0){
            steering.div(total)
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity)
            steering.limit(this.maxSeparationForce)
        }        
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = this.cohesionPerception
        let steering = createVector();
        let total = 0
        let r=red(this.mycolor)
        let g=green(this.mycolor)
        let b=blue(this.mycolor)
        let myr=red(this.mycolor)
        let myg=green(this.mycolor)
        let myb=blue(this.mycolor)

        let colorSpeed = 0.01
        for(let other of boids) {
            if(other != this && dist(this.position.x, this.position.y, other.position.x, other.position.y) < perceptionRadius){
                steering.add(other.position)
                r = r + red(other.mycolor)
                g = g + green(other.mycolor)
                b = b + blue(other.mycolor)
                total++
            }
        }    
        if ( total > 0){
            steering.div(total)
            steering.sub(this.position)
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity)
            steering.limit(this.maxCohesionForce)

            r = r / total
            g = g / total
            b = b / total

            this.mycolor=color(r*colorSpeed+myr*(1-colorSpeed),g*colorSpeed+myg*(1-colorSpeed),b*colorSpeed+myb*(1-colorSpeed))
        }        
        return steering;
    }

    separationObjects(boids) {
        let perceptionRadius = this.objectsPerception
        let steering = createVector();
        let total = 0
        for(let other of boids) {
            if(other != this && dist(this.position.x, this.position.y, other.position.x, other.position.y) < perceptionRadius){
                let diff = p5.Vector.sub(this.position, other.position)
                diff.div(dist(this.position.x, this.position.y, other.position.x, other.position.y))
                steering.add(diff)
                total++
            }
        }    
        if (total > 0){
            steering.div(total)
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity)
            steering.limit(this.maxObjectSeparationForce)
        }        
        return steering;
    }

    flock(boids){
        let alignment = this.align(boids)
        let cohesion = this.cohesion(boids)
        let separation = this.separation(boids)

        this.acceleration.add(alignment)
        this.acceleration.add(cohesion)
        this.acceleration.add(separation)
    }

    flockObjects(objects){
        let sepObjects = this.separationObjects(objects)
        this.acceleration.add(sepObjects)
    }

    update(separationPower,boidsPerception,maxSpeed) {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.acceleration.set(0, 0)
        this.maxSeparationForce = separationPower
        this.boidsPerception = boidsPerception
        this.maxSpeed = maxSpeed
    }

    show() {
        strokeWeight(1)
        stroke(this.mycolor)
        fill(this.mycolor)
        point(this.position.x,this.position.y)
        let distance = dist(this.position.x, this.position.y, 
                            this.velocity.x + this.position.x, this.velocity.y + this.position.y)
        let dx = (this.velocity.x) / distance
        let dy = (this.velocity.y) / distance
        triangle(this.position.x + dy*3, this.position.y - dx*3,
                 this.position.x - dy*3, this.position.y + dx*3,
                 this.position.x + dx*10, this.position.y + dy*10)
    }
}