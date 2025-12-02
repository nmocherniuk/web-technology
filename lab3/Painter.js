export function Painter(color) {
    return function(obj) {
        console.log(`Color: ${color}, Type: ${obj.type || "No 'type' property occurred!"}`);
    };
}

const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

export { PaintBlue, PaintRed, PaintYellow };
