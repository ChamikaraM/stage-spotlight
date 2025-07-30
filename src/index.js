let canvas, ctx, animationFrameId;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

export function initStageSpotlight(options = {}) {
  const {
    spotlightRadius = 150,
    darknessOpacity = 0.7,
    blur = 100,
    lightColor = "#ffffff",
    followSpeed = 0.1,
    zIndex = 9999,
  } = options;

  // Create canvas overlay
  canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = zIndex;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");

  let targetX = mouseX;
  let targetY = mouseY;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Darken entire screen
    ctx.fillStyle = `rgba(0, 0, 0, ${darknessOpacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Smooth follow motion
    mouseX += (targetX - mouseX) * followSpeed;
    mouseY += (targetY - mouseY) * followSpeed;

    // Create radial gradient for spotlight
    const gradient = ctx.createRadialGradient(
      mouseX,
      mouseY,
      0,
      mouseX,
      mouseY,
      spotlightRadius
    );
    gradient.addColorStop(0, lightColor);
    gradient.addColorStop(1, "transparent");

    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, spotlightRadius + blur, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    animationFrameId = requestAnimationFrame(draw);
  }

  function handleMouseMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
  }

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  draw();
}

export function destroyStageSpotlight() {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("mousemove", handleMouseMove);
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
}
