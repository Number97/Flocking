class ObjectType {
    constructor(x,y) {
        this.position = createVector(x, y);
    }

    update(x,y){
        this.position.x = x
        this.position.y = y
    }

    show() {
        strokeWeight(10)
        stroke(255,150,150)
        point(this.position.x,this.position.y)
    }
}