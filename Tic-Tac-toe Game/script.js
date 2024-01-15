document.addEventListener("DOMContentLoaded", function () {
  let difficultyLevel = 'medium';

  const difficultySelect = document.getElementById('difficulty-select');
  if (difficultySelect) {
      difficultySelect.addEventListener('change', function () {
          difficultyLevel = this.value;
      });
  }

  const board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
  ];

  const table = document.getElementById('board');
  table.addEventListener('click', handleCellClick);

  function updateBoard() {
      table.innerHTML = '';
      for (let i = 0; i < 3; i++) {
          const row = document.createElement('tr');
          for (let j = 0; j < 3; j++) {
              const cell = document.createElement('td');
              cell.innerText = board[i][j];
              row.appendChild(cell);
          }
          table.appendChild(row);
      }
  }

  function handleCellClick(event) {
      const row = event.target.parentNode.rowIndex;
      const col = event.target.cellIndex;

      if (board[row][col] === ' ') {
          board[row][col] = 'O';
          updateBoard();

          if (checkWinner('O')) {
              alert('You win!');
              resetGame();
          } else if (isBoardFull()) {
              alert("It's a tie!");
              resetGame();
          } else {
              aiMove();
          }
      }
  }

  function aiMove() {
      let bestMove;

      if (difficultyLevel === 'easy') {
          bestMove = findRandomMove();
      } else if (difficultyLevel === 'medium' || difficultyLevel === 'hard') {
          bestMove = findBestMove();
      }

      if (bestMove) {
          board[bestMove.row][bestMove.col] = 'X';
          updateBoard();

          if (checkWinner('X')) {
              alert('AI wins!');
              resetGame();
          } else if (isBoardFull()) {
              alert("It's a tie!");
              resetGame();
          }
      }
  }

  function resetGame() {
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              board[i][j] = ' ';
          }
      }
      updateBoard();
  }

  function findRandomMove() {
      const availableMoves = [];
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if (board[i][j] === ' ') {
                  availableMoves.push({ row: i, col: j });
              }
          }
      }

      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
  }

  function findBestMove() {
      let bestVal = -Infinity;
      let bestMove = { row: -1, col: -1 };

      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if (board[i][j] === ' ') {
                  board[i][j] = 'X';
                  let moveVal = minimax(board, 0, false);
                  board[i][j] = ' ';

                  if (moveVal > bestVal) {
                      bestMove = { row: i, col: j };
                      bestVal = moveVal;
                  }
              }
          }
      }
      return bestMove;
  }

  function minimax(board, depth, maximizingPlayer) {
      if (checkWinner('O')) {
          return -1;
      } else if (checkWinner('X')) {
          return 1;
      } else if (isBoardFull()) {
          return 0;
      }

      if (maximizingPlayer) {
          let maxEval = -Infinity;
          for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                  if (board[i][j] === ' ') {
                      board[i][j] = 'X';
                      maxEval = Math.max(maxEval, minimax(board, depth + 1, false));
                      board[i][j] = ' ';
                  }
              }
          }
          return maxEval;
      } else {
          let minEval = Infinity;
          for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                  if (board[i][j] === ' ') {
                      board[i][j] = 'O';
                      minEval = Math.min(minEval, minimax(board, depth + 1, true));
                      board[i][j] = ' ';
                  }
              }
          }
          return minEval;
      }
  }

  function checkWinner(player) {
      for (let i = 0; i < 3; i++) {
          if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
              return true;
          }
          if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
              return true;
          }
      }
      if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
          return true;
      }
      if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
          return true;
      }
      return false;
  }

  function isBoardFull() {
      return board.every(row => row.every(cell => cell !== ' '));
  }

  updateBoard();
});
