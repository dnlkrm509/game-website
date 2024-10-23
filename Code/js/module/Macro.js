// Get data from local storage and store it in variables
export let data = {
    isLoggedin: localStorage.getItem("isLoggedin"),
    users: JSON.parse(localStorage.getItem("users")) || [],
    loggedinUser: JSON.parse(localStorage.getItem("loggedinUser")),
    oponentModal: document.getElementById("choose-oponent"),
    gameFeedbackModal: document.getElementById("gameover"),
    fallbackGame: document.getElementById("fallback-game"),
    userName: document.getElementsByClassName("username"),
    coinSpan: document.getElementById("coin"),
    oponentSpan: document.getElementById("oponent"),
    gameOver: false,
    closeOponentModal: function closeOponentModal() {
        oponentModal.style.display = "none";
    }
}