// Default Operator (||)
      // if LHS is true use LHS
      // if LHS is false/falsy/null then, use the RHS
      const score= JSON.parse(localStorage.getItem('ScoreCard')) || {
        wins:0,
        losses:0,
        ties:0,
      }; ;

      updateScore();

      function playGame(playerMove) {
        const computerMove = pickComputerMove();

        let result = '';

        if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
            result = 'You lose.';
          } else if (computerMove === 'paper') {
            result = 'You win.';
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
          }

        } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
            result = 'You win.';
          } else if (computerMove === 'paper') {
            result = 'Tie.';
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
          }
          
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie.';
          } else if (computerMove === 'paper') {
            result = 'You lose.';
          } else if (computerMove === 'scissors') {
            result = 'You win.';
          }
        }

        if(result === 'You win.' )
        {
          score.wins+=1;
        }
        else if(result ==='You lose.')
        {
          score.losses+=1;
        }
        else if(result === 'Tie.')
        {
          score.ties+=1;
        }

        const saveScore=JSON.stringify(score);
        (localStorage.setItem('ScoreCard',saveScore));
        updateScore();
        document.querySelector('.js-result')
        .innerHTML=`${result}`;
        document.querySelector('.js-moves')
        .innerHTML=`
        You <img src="IMAGES/${playerMove}-emoji.png" class="Img">
        <img src="IMAGES/${computerMove}-emoji.png" class="Img">
        Computer 
        `;
        
      
       /* alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\n
Currently, the Score is:\n
Wins:${score.wins} , Losses:${score.losses}, Ties:${score.ties}`);*/
      }


      function updateScore()
      {
        document.querySelector('.score-update').
        innerHTML=
        `Currently, the Score is:
Wins:${score.wins} , Losses:${score.losses}, Ties:${score.ties}`;
      }

      function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'scissors';
        }

        return computerMove;
      }

      function ourResult()
      {
        document.querySelector('.js-result')
        .innerHTML=`You ${result}`;
      }

      function resetText()
      {
        document.querySelector('.js-result')
        .innerHTML=``;
        document.querySelector('.js-moves')
        .innerHTML=``;
      }

      let isAutoPlaying=false;
      let intervalId;

      function autoPlay()
      { if(isAutoPlaying === false){
        intervalId=setInterval( function() {
          const move=pickComputerMove();
          playGame(move);
        }, 1000);
        isAutoPlaying=true;

      }
      else
      {
        clearInterval(intervalId);
        isAutoPlaying=false;
      }
      }

      document.body.addEventListener('keydown',(event)=>
      {
        // alert("KeyPressed!!!");
        // console.log(event.key); //-->(Which key pressed on keyboard!)

        if(event.key === 'r' || event.key === 'R')
        {
          playGame('rock');
        }
        else if(event.key === 'p' || event.key === 'P')
        {
          playGame('paper');
        }
        else if(event.key === 's' || event.key === 'S')
        {
          playGame('scissors');
        }

  
      });



      