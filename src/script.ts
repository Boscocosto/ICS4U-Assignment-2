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

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    for (let x = -600; x <= 600; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, -600);
        ctx.lineTo(x, 600);
        ctx.stroke();
    }

    for (let y = -600; y <= 600; y += 20) {
        ctx.beginPath();
        ctx.moveTo(-600, y);
        ctx.lineTo(600, y);
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
})