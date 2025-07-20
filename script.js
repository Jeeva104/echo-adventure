let gameStarted = false;

function speak(message) {
  const msg = new SpeechSynthesisUtterance(message);
  msg.lang = "en-US";
  msg.rate = 1;
  msg.volume = 1;
  window.speechSynthesis.speak(msg);
}

const map = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 9],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0]
];

let playerPos = { x: 0, y: 0 };

function move(dx, dy) {
  if (!gameStarted) return;

  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  const direction = dx === 1 ? "right" : dx === -1 ? "left" : dy === -1 ? "up" : "down";

  if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[0].length || map[newY][newX] === 1) {
    speak(`There's a wall to your ${direction}. Try another direction.`);
    return;
  }

  const tile = map[newY][newX];

  if (tile === 9) {
    playerPos = { x: newX, y: newY };
    speak("Congratulations! You found the goal!");
    setTimeout(() => alert("🎉 Goal Reached!"), 300);
  } else {
    playerPos = { x: newX, y: newY };
    speak(`Moved ${direction}`);
  }
}

function startGame() {
  gameStarted = true;
  speak("Game started. Use arrow keys to move.");
  document.body.focus();
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": move(0, -1); break;
    case "ArrowDown": move(0, 1); break;
    case "ArrowLeft": move(-1, 0); break;
    case "ArrowRight": move(1, 0); break;
  }
});
