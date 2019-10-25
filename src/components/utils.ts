interface Array<T> {
    lerp(fraction: number): number
}
interface Number {
    clamp(min: number, max: number): number
    trunc(): number
}

Array.prototype.lerp = function (fraction: number): number {
    return this[0] + (this[1] - this[0]) * fraction
}
Number.prototype.clamp = function (min: number, max: number): number {
    return this > min ? (this < max ? this : max) : min
}
Number.prototype.trunc = function (): number {
    return Math.trunc(this)
}

