class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2
        this.maxSpeed = 4
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
        let perceptionRadius = 50
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
            steering.limit(this.maxForce)
        }        
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 70
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
            steering.limit(this.maxForce)
        }        
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 50
        let steering = createVector();
        let total = 0
        for(let other of boids) {
            if(other != this && dist(this.position.x, this.position.y, other.position.x, other.position.y) < perceptionRadius){
                steering.add(other.position)
                total++
            }
        }    
        if ( total > 0){
            steering.div(total)
            steering.sub(this.position)
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity)
            steering.limit(this.maxForce)
        }        
        return steering;
    }

    separationObjects(boids) {
        let perceptionRadius = 200
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
            steering.limit(this.maxForce)
        }        
        return steering;
    }

    flock(boids){
        let alignment = this.align(boids)
        let cohesion = this.cohesion(boids)
        let separation = this.separation(boids)

        alignment.mult(alignSlider.value())
        cohesion.mult(cohesionSlider.value())
        separation.mult(separationSlider.value())

        this.acceleration.add(alignment)
        this.acceleration.add(cohesion)
        this.acceleration.add(separation)
    }

    flockObjects(objects){
        let sepObjects = this.separationObjects(objects)
        sepObjects.mult(sepObjectsSlider.value())
        this.acceleration.add(sepObjects)
    }

    update() {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.acceleration.set(0, 0)
    }

    show() {
        strokeWeight(1)
        stroke(255)
        fill(255)
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