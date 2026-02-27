const form = document.getElementById("cubic-form") as HTMLFormElement;
const canvas = document.getElementById("graph") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        (document.getElementById("result") as HTMLInputElement).value = "No Roots";
    } else if (discriminant > 0) {
        const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
        const rootTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
        (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, x2=${rootTwo}`;
    } else {
        const rootOne = (-b + Math.sqrt(discriminant)) / (2 * a);
        (document.getElementById("result") as HTMLInputElement).value = `x=${rootOne}`;
    }
    
    ctx.clearRect(0,0,600,600);
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    for (let x = -600; x <= 600; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, -600);
        ctx.lineTo(x, 600);
        ctx.moveTo(-600, x);
        ctx.lineTo(600, x);
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

    ctx.beginPath();

    for (let x = -300; x <= 300; x++) {
        const X = x / 20;
        const y = a * X * X * X + b * X * X + c * X + d;

        if (x === -300) {
            ctx.moveTo(x + 300, 300 - y * 20);
        } else {
            ctx.lineTo(x + 300, 300 - y * 20);
        }
    }

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
})