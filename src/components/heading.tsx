import React, { useEffect } from 'react'
import Zdog, { Shape } from 'zdog'
import Zfont from 'zfont'
import '../components/utils'

// module augmentation of module `'zdog'`
// see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module 'zdog' {
    export interface Font {

    }
    export class Text extends Shape {

    }
}

let font: Zdog.Shape | null = null
let i: Zdog.Illustration | null = null;
let textShapes:Zdog.Shape[] = [];
let viewRotation = new Zdog.Vector()

// animate
function animate() {

    textShapes.forEach( shape => {
        shape.rotate.set( viewRotation )
    })

    i.updateRenderGraph();
    requestAnimationFrame(animate);
}

const createIllustration = () => {
    let i = new Zdog.Illustration({
        element: `#zdog-canvas`,
        // rotate: { x: 0.1, y: 0.1, z: 0.0 },
        // zoom: 1,
        dragRotate: true,
        // centered: true,
        resize: true,
    });

    var x = 0.0;
    const positions: { x: number, y: number }[] = [
        { x: -200, y: 0 },
        { x: -162, y: 0 },
        { x: -150, y: 0 },
        { x: -89, y: 0 },
        { x: -67, y: 0 },
        { x: 0, y: 0 },
        { x: 48, y: 0 },
        { x: 91, y: 0 },
        { x: 141, y: 0 },
        { x: 188, y: 0 },
    ];

    textShapes = [..."NielsGabel"].map((char, index) => {

        const p = positions[index]

        const text = new Zdog.Text({
            addTo: i,
            font: font!,
            value: char,
            fontSize: 45,
            // textAlign: 'center',
            // textBaseline: 'bottom',
            color: 'rgb(255, 255, 255)',
            fill: true,
            rotate: { x: -0.1, y: 0.2, z: 0.0 },
            translate: { x: p.x, y: p.y + 50 },
        });

        // console.log(x);

        for (var index = 1; index < 5.0; ++index) {
            const progress = index / 5.0;
            const r = (255).toString()
            const b = [255, 200].lerp(progress).clamp(0, 255).trunc().toString()
            const g = [255, 0].lerp(progress).clamp(0, 255).trunc().toString()
            text.copy({
                addTo: text,
                rotate: {},
                translate: { z: -30 * index },
                // color: `rgb(200, 200, ${String(Math.trunc(clamp(0, 255, lerp(255, 150, progress))))})`,
                color: `rgb(${r}, ${g}, ${b})`
            });
        }

        return text;
    })

    let dragStartRX = 0.0
    let dragStartRY = 0.0

    new Zdog.Dragger({
        startElement: i.element,
        onDragStart: function() {
          // keep track of rotation
          dragStartRX = viewRotation.x
          dragStartRY = viewRotation.y
        },
        onDragMove: function( pointer, moveX, moveY ) {
          // move rotation
          let moveRX = moveY / i.width * Zdog.TAU * -1;
          let moveRY = moveX / i.width * Zdog.TAU * -1;
          viewRotation.x = dragStartRX + moveRX;
          viewRotation.y = dragStartRY + moveRY;
        },
      });

    i.updateGraph()

    return i
};

const renderZDog = () => {

    font = font ?? new Zdog.Font({
        src: '/static/webfonts/3A6B95_0_0.ttf'
    });

    i = i ?? createIllustration()

    // i.renderGraph()
    animate();
}

export default () => {

    useEffect(() => {
        Zfont.init(Zdog);
        renderZDog();
        window.addEventListener("resize", renderZDog);
        return () => window.removeEventListener("resize", renderZDog);
    }, [])

    return <canvas style={{ width: '100%', height: '200px' }} id={`zdog-canvas`} width={480} height={66}></canvas>
}
