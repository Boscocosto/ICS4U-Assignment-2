const cubic = document.getElementById("cubic-form") as HTMLFormElement;
const canvas = document.getElementById("graph") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

document?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(cubic);

    const equationDisplay = document.getElementById("equation") as HTMLParagraphElement;
    const equation = `y = ${(document.getElementById("a") as HTMLInputElement).value}x³ + ${(document.getElementById("b") as HTMLInputElement).value}x² + ${(document.getElementById("c") as HTMLInputElement).value}x + ${(document.getElementById("d") as HTMLInputElement).value}`;
    equationDisplay.innerText = equation;
    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));
    const p = (3 * a * c - Math.pow(b, 2)) / (3 * Math.pow(a, 2));
    const q = ((27 * Math.pow(a, 2) * d - 9 * a * b * c + 2 * Math.pow(b, 3))) / (27 * Math.pow(a, 3))
    const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
    (document.getElementById("discriminant") as HTMLInputElement).value = `${discriminant}`;

    if (discriminant < 0) {
        const angle = (1 / 3) * Math.acos(-q / (2 * (Math.sqrt(-Math.pow(p / 3, 3)))));
        const rootOne = (2 * (Math.sqrt(-p / 3)) * Math.cos(angle)) - (b / (3 * a));
        const rootTwo = (2 * (Math.sqrt(-p / 3)) * Math.cos(angle + (2 * Math.PI) / 3)) - (b / (3 * a));
        const rootThree = (2 * (Math.sqrt(-p / 3)) * Math.cos(angle + (4 * Math.PI) / 3)) - (b / (3 * a));
        (document.getElementById("rootOne") as HTMLInputElement).value = `${rootOne},0`;
        (document.getElementById("rootTwo") as HTMLInputElement).value = `${rootTwo},0`;
        (document.getElementById("rootThree") as HTMLInputElement).value = `${rootThree},0`;
        (document.getElementById("p") as HTMLInputElement).value = `${p}`;
        (document.getElementById("q") as HTMLInputElement).value = `${q}`;
    } else if (discriminant > 0) {
        const u = Math.cbrt((-q / 2) + Math.sqrt(discriminant));
        const v = Math.cbrt((-q / 2) - Math.sqrt(discriminant));
        const rootOne = u + v - (b / (3 * a))
        const rootTwo = "Complex Number";
        const rootThree = "Complex Number";
        (document.getElementById("rootOne") as HTMLInputElement).value = `${rootOne},0`;
        (document.getElementById("rootTwo") as HTMLInputElement).value = `${rootTwo}`;
        (document.getElementById("rootThree") as HTMLInputElement).value = `${rootThree}`;
        (document.getElementById("p") as HTMLInputElement).value = `${p}`;
        (document.getElementById("q") as HTMLInputElement).value = `${q}`;
    } else {
        const r1 = Math.cbrt(q / 2);
        const shift = b / (3 * a);
        const rootOne = r1 - shift;
        const rootTwo = -2 * r1 - shift;
        const rootThree = -2 * r1 - shift;
        (document.getElementById("rootOne") as HTMLInputElement).value = `${rootOne},0`;
        (document.getElementById("rootTwo") as HTMLInputElement).value = `${rootTwo},0`;
        (document.getElementById("rootThree") as HTMLInputElement).value = `${rootThree},0`;
        (document.getElementById("p") as HTMLInputElement).value = `${p}`;
        (document.getElementById("q") as HTMLInputElement).value = `${q}`;
    }

    ctx.clearRect(0, 0, 600, 600);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 600; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.moveTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(600, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 600);
    ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = -300; x <= 300; x++) {
        const X = x / 20;
        const y = a * X * X * X + b * X * X + c * X + d;
        ctx.lineTo(300 + x, 300 - y * 20);
        ctx.stroke();
    }

    const roots = [
        Number((document.getElementById("rootOne") as HTMLInputElement).value),
        Number((document.getElementById("rootTwo") as HTMLInputElement).value),
        Number((document.getElementById("rootThree") as HTMLInputElement).value)
    ];

    ctx.fillStyle = "blue";

    roots.forEach((r) => {
        if (Number.isFinite(r)) {
            ctx.beginPath();
            ctx.arc(300 + r * 20, 300, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    });
})