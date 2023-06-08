function startGame() {      
      var size = 100;
      
      var htmlElements;
      var cells;

      var EMPTY = 0;
      var ALIVE = 1;

      function criajogo() { //funcao que cria tabuleiro
        htmlElements = [];
        cells = [];
        var table = document.getElementById('field');
        for (var y = 0; y < size; y++) {
          var tr = document.createElement('tr');
          var tdElements = [];
          cells.push(new Array(size).fill(EMPTY));
          htmlElements.push(tdElements);
          table.appendChild(tr);
          for (var x = 0; x < size; x++) {
            var td = document.createElement('td');
            tdElements.push(td);
            tr.appendChild(td);
          }
        }
      }

      function draw() { //funcao que inicializa as pecas no display
        for (var y = 0; y < size; y++) {
          for (var x = 0; x < size; x++) {
            htmlElements[y][x].setAttribute('class', 'cell ' + (cells[y][x] == 1 ? 'filled' : 'empty'));
          }
        }
      }

      function countNeibhours(x, y) { //calculo dos vizinhos 
        var count = 0;
        for (dy = -1; dy <= 1; dy++) {
          for (dx = -1; dx <= 1; dx++) {
            var nx = (x + dx + size) % size, ny = (y + dy + size) % size;
            count = count + cells[ny][nx];
          }
        }
        return count - cells[y][x];
      }

      function newGeneration() { //caso seja possivel criar nova geracao 
        var newCells = [];
        for (var i = 0; i < size; i++) {
          newCells.push(new Array(size).fill(EMPTY));
        }
        for (var y = 0; y < size; y++) {
          for (var x = 0; x < size; x++) {
            var neibhours = countNeibhours(x, y);
            if (cells[y][x] == EMPTY && neibhours == 3) { //se tem 3 vizinhos e celular na coordenada é vazia
              newCells[y][x] = ALIVE; //nova celula
            }
            if (cells[y][x] == ALIVE && (neibhours == 2 || neibhours == 3)) { //se tem celula viva na coordenada e é 2 ou 3 vizinhos
              newCells[y][x] = ALIVE; //nova celula
            }
          }
        }
        cells = newCells;
        draw();
      }

      function init() { //funcao de inicializacao dos elementos no tabuleiro
        criajogo();
        for (var i = 0; i < Math.floor(size * size * 0.1); i++) {
          var x, y;
          do {
            x = Math.floor(Math.random() * size), y = Math.floor(Math.random() * size); //cria celulas em coordenadas aleatorias
            if (cells[y][x] == EMPTY) {
              cells[y][x] = ALIVE;
              break;
            }
          } while (true);
        }
        draw();
        setInterval(newGeneration, 125); //intervalo de movimento
      }

      init();
}