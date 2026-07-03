(function () {
  const progressValue = document.getElementById('progressValue');
  const progressBar = document.getElementById('progressBar');
  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');

  if (!progressValue || !progressBar || !quizForm || !quizResult) return;

  const answers = {
    q1: 'b',
    q2: 'a',
    q3: 'c'
  };

  function updateProgress(score) {
    const percentage = Math.round((score / 3) * 100);
    progressValue.textContent = `${percentage}%`; 
    progressBar.style.width = `${percentage}%`;
  }

  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(quizForm);
    let score = 0;

    for (const [question, answer] of Object.entries(answers)) {
      if (formData.get(question) === answer) score += 1;
    }

    updateProgress(score);
    quizResult.textContent = `Tam puanınız: ${score} / 3. Odyoloji öğrenme ilerlemeniz güncellendi.`;
  });
})();
