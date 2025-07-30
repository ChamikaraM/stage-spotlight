let canvas, ctx, animationFrameId;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;

const defaultOptions = {
  spotlightRadius: 180,
  darknessOpacity: 0.7,
  blur: 150,
  lightColor: "#ffffff",
  followSpeed: 0.12,
  zIndex: 9999,
};

let options = { ...defaultOptions };

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function createCanvas() {
  canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = options.zIndex;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dark overlay
  ctx.fillStyle = `rgba(0,0,0,${options.darknessOpacity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Smooth follow mouse with lerp
  mouseX = lerp(mouseX, targetX, options.followSpeed);
  mouseY = lerp(mouseY, targetY, options.followSpeed);

  // Draw spotlight circle around mouse
  const gradient = ctx.createRadialGradient(
    mouseX,
    mouseY,
    0,
    mouseX,
    mouseY,
    options.spotlightRadius
  );
  gradient.addColorStop(0, options.lightColor);
  gradient.addColorStop(1, "transparent");

  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, options.spotlightRadius + options.blur, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  animationFrameId = requestAnimationFrame(draw);
}

function handleMouseMove(e) {
  targetX = e.clientX;
  targetY = e.clientY;
}

function handleResize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function initStageSpotlight(customOptions = {}) {
  options = { ...defaultOptions, ...customOptions };
  createCanvas();
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);
  draw();
}

export function destroyStageSpotlight() {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("resize", handleResize);
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
}
