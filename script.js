let timer;
let timeLeft = 120; // 2 минут = 120 секунд
let student = "";

function startTest() {
  const nameInput = document.getElementById("studentName").value.trim();
  if (nameInput === "") {
    alert("Атыңызды жазыңыз!");
    return;
  }
  student = nameInput;
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("test-screen").style.display = "block";
  document.getElementById("welcome").innerText = "Сәлем, " + student + "!";
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    } else {
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      document.getElementById("timer").innerText =
        "Уақыт: " +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
      timeLeft--;
    }
  }, 1000);
}

function submitQuiz() {
  clearInterval(timer);
  const form = document.getElementById("quizForm");
  let score = 0;

  // Дұрыс жауаптар
  const answers = {
    q1: "Астана",
    q2: "4"
  };

  for (let key in answers) {
    const chosen = form.elements[key].value;
    if (chosen === answers[key]) {
      score++;
    }
  }

  document.getElementById("result").innerHTML =
    "<h3>Нәтиже:</h3>" +
    student + ", сіздің ұпайыңыз: " + score + " / " + Object.keys(answers).length;
}

// Беттен шығып кетуді бақылау
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    alert("Сіз басқа бетке шықтыңыз! Тест автоматты түрде аяқталды.");
    submitQuiz();
  }
});

