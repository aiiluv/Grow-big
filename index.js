let data = JSON.parse(localStorage.getItem("progress")) || {
    game_one: 0,
    game_two: 0,
    game_three: 0,
    game_four: 0,
}

// ambil semua bar
let bars = document.querySelectorAll(".progress-bar")

bars.forEach(bar => {
    let game = bar.dataset.game
    bar.style.width = data[game] + "%"

    // kalau selesai
    if(data[game] >= 100){
        bar.style.background = "limegreen"
    }
})