'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result'); 
    const scoreLabel = document.querySelector('#result > p');

    const quizset = shuffle([
        {q: 'フィリピンの伝統料理は？', c: ['シシグ', 'ケバブ', 'チャーハン']},
        {q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'Go']},
        {q: 'anong pinaka gusto kong lugar?', c: ['Bulacan', 'Japan', 'Manila']},
    ]);

    let currentNum = 0;  //今何問目を解いてるかの変数
    let isAnswered;     //回答されたかどうかを判別する変数
　　 let score = 0;
    
    function checkAnswer(li) {  
        //if (isAnswered === true) {   //省略可
        if (isAnswered) {
            return;
        }　　　　　　　//trueならこれ以上処理が必要ないため

        isAnswered = true;
                           //配列の最初が正解という設定にする
        if(li.textContent === quizset[currentNum].c[0]) {
            li.classList.add('correct')
            score++;
        } else {
            li.classList.add('wrong')
        }

        btn.classList.remove('disabled');
    }
   
    function setQuiz() {
        isAnswered = false;

        question.textContent = quizset[currentNum].q;

        while(choices.firstChild) {   //setQuizで回答の選択肢を表示する前に予め全ての選択肢を消しておく
           choices.removeChild(choices.firstChild); 
        }
        　　      //スプレット演算子→これが無いと、リロードして選択肢がシャッフルされるのと同時にconsoleに表示された元の選択肢もシャッフルされてしまう、そうなると選択肢の最初の要素を正解にしていたのに崩れてしまって正誤判断ができなくなる
        const shuffledChoices = shuffle([...quizset[currentNum].c]);
        shuffledChoices.forEach(choice => {     
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            })
            choices.appendChild(li);
        });

        if (currentNum === quizset.length - 1) {  //最後
            btn.textContent = 'Show Score';
        }
    }

    function shuffle(arr) {　　　　//フィッシャー・イェーツのシャッフル
       for (let i = arr.length - 1; i > 0; i--) {　　　
           const j = Math.floor(Math.random() * (i + 1));　　//0からi番目(最後)のランダムな整数値
           [arr[j], arr[i]] = [arr[i], arr[j]];   //分割代入による末尾(i)と選ばれた数(j)の入れ替え
       } 
        return arr;
    }

    setQuiz();

    btn.addEventListener('click', () => {
　　　　　if (btn.classList.contains('disabled')) {
           return;      
        }
        btn.classList.add('disabled');　　//回答した状態→disabledが外れて青になる→次に行くときにもう一度グレーに
        
        if (currentNum === quizset.length - 1) {
            //console.log(`Score: ${score} / ${quizset.length}`);
            scoreLabel.textContent = `Score: ${score} / ${quizset.length}`;
            result.classList.remove('hidden');
        } else {
            currentNum++;  //次へ
            setQuiz();
        }
    });
}