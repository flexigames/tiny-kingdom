export default (x, y) => new V(x, y)

export class V {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  multiply(other) {
    if (other instanceof V)
      return new V(this.x * other.x, this.y * other.y)

    return new V(this.x * other, this.y * other)
  }

  divide(other) {
    if (other instanceof V)
      return new V(this.x / other.x, this.y / other.y)

    return new V(this.x / other, this.y / other)
  }

  add(other) {
    if (other instanceof V)
      return new V(this.x + other.x, this.y + other.y)

    return new V(this.x + other, this.y + other)
  }

  subtract(other) {
    if (other instanceof V)
      return new V(this.x - other.x, this.y - other.y)

    return new V(this.x - other, this.y - other)
  }

  sub(other) {
    return this.subtract(other)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    const length = this.length()
    if (length === 0) return new V(0, 0)
    return this.divide(new V(length, length))
  }

  distance(other) {
    return this.subtract(other).abs().length()
  }

  neg() {
    return {x: -this.x, y: -this.y}
  }

  round() {
    return this.math("round")
  }

  abs() {
    return this.math("abs")
  }

  math(fn) {
    return new V(Math[fn](this.x), Math[fn](this.y))
  }

  equals(other) {
    return this.x === other.x && this.y === other.y
  }
}
