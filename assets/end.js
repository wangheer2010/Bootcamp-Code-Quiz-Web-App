const username = document.getElementById("username");

const saveScoreBtn = document.getElementById("saveScoreBtn");

const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');
finalScore.innerText = mostRecentScore
username.addEventListener("keyup", () => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log('clicked the save button')
    e.preventDefault();
}