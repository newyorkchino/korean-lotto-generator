// 로또 번호 생성 함수
function generateLotto() {
  // 1~45 범위에서 6개의 중복 없는 숫자 생성
  const numbers = [];
  while (numbers.length < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  // 숫자를 오름차순으로 정렬
  numbers.sort((a, b) => a - b);

  // 보너스 번호 생성 (1~45 범위)
  let bonus = Math.floor(Math.random() * 45) + 1;
  // 보너스 번호가 이미 뽑은 번호와 중복되지 않도록
  while (numbers.includes(bonus)) {
    bonus = Math.floor(Math.random() * 45) + 1;
  }

  // 화면에 번호 표시
  displayLottoNumbers(numbers, bonus);

  // 히스토리에 추가
  addToHistory(numbers, bonus);
}

// 로또 번호를 화면에 표시하는 함수
function displayLottoNumbers(numbers, bonus) {
  const container = document.getElementById('lottoNumbers');
  container.innerHTML = '';

  // 일반 번호 6개 표시
  numbers.forEach((number) => {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.textContent = number;
    ball.classList.add(getBallColorClass(number));
    container.appendChild(ball);
  });

  // 보너스 번호 표시
  const bonusSection = document.getElementById('bonusNumber');
  bonusSection.innerHTML = `
    <div class="bonus-label">보너스 번호</div>
    <div class="bonus-ball">${bonus}</div>
  `;
}

// 번호 범위에 따라 색상 결정
function getBallColorClass(number) {
  if (number <= 10) return 'color-yellow';
  if (number <= 20) return 'color-blue';
  if (number <= 30) return 'color-red';
  if (number <= 40) return 'color-green';
  return 'color-purple';
}

// 히스토리에 추가하는 함수
function addToHistory(numbers, bonus) {
  const historyList = document.getElementById('history');
  const timestamp = new Date().toLocaleTimeString('ko-KR');
  const numbersStr = numbers.join(', ');
  const historyItem = document.createElement('li');
  historyItem.className = 'history-item';
  historyItem.innerHTML = `<strong>${timestamp}</strong> - ${numbersStr} + ${bonus}`;

  // 새로운 항목을 맨 위에 추가
  historyList.insertBefore(historyItem, historyList.firstChild);

  // 히스토리는 최대 10개까지만 유지
  while (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

// 페이지 로드 시 초기 로또 번호 생성
window.addEventListener('load', () => {
  generateLotto();
});
