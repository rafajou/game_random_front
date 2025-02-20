const botao = document.querySelector("#sortear");
const capaJogo = document.querySelector("#game_cover");
const gameScreen = document.querySelector("#game");

botao.addEventListener("click", armazenarSelect);

function armazenarSelect() {
    const select = document.querySelector("#console-select");
    const value = select.options[select.selectedIndex].value;

    console.log("Plataforma selecionada:", value); // Verifica o valor selecionado

    async function getRandomGame(platform) {
        try {
            const response = await fetch(`https://game-random-backend.onrender.com/games?platform=${platform}`);
            if (!response.ok) throw new Error("Erro ao buscar os jogos");

            const games = await response.json();
            if (!Array.isArray(games) || games.length === 0) throw new Error("Nenhum jogo encontrado para essa plataforma");

            return games;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    async function iniciarSorteio() {
        botao.disabled = true; // Evita múltiplos cliques durante o sorteio
        const games = await getRandomGame(value);
        if (!games) {
            botao.disabled = false;
            return;
        }

        const imagens = games.map(game => game.capa);
        let tempo = 50; // Tempo inicial entre trocas
        let totalGiros = 30; // Número total de trocas antes de parar
        let giros = 0;

        const intervalo = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * imagens.length);
            capaJogo.src = imagens[randomIndex];

            giros++;
            tempo += 10; // Faz a rotação desacelerar

            if (giros >= totalGiros) {
                clearInterval(intervalo);
                finalizarSorteio(games);
            }
        }, tempo);
    }

    async function finalizarSorteio(games) {
        const randomGame = games[Math.floor(Math.random() * games.length)];
        
        setTimeout(() => {
            capaJogo.src = randomGame.capa;
            document.querySelector("#title").innerHTML = randomGame.nome;
            document.querySelector("#genero_text").innerHTML = randomGame.genero;
            document.querySelector("#ano_text").innerHTML = randomGame.anoLancamento;
            document.querySelector("#sinopse").innerHTML = randomGame.sinopse;
            gameScreen.style.display = "block";
            botao.disabled = false; // Reativa o botão
        }, 500);
    }

    iniciarSorteio();
}






// const botao = document.querySelector('#sortear');

// botao.addEventListener('click', armazenarSelect);

// function armazenarSelect() {
//     const select = document.querySelector('#console-select');
//     const value = select.options[select.selectedIndex].value;

//     console.log("Plataforma selecionada:", value); // Verifica o valor selecionado

//     async function getRandomGame(platform) {
//         try {
//             const response = await fetch(`http://localhost:3000/games?platform=${platform}`);
//             if (!response.ok) throw new Error("Erro ao buscar os jogos");

//             const games = await response.json();
            

//             if (!Array.isArray(games) || games.length === 0) throw new Error("Nenhum jogo encontrado para essa plataforma");


//             const randomGame = games[Math.floor(Math.random() * games.length)];
//             const nomeGame = randomGame.nome;
//             const capaGame = randomGame.capa;
//             const generoGame = randomGame.genero;
//             const anoLancamento = randomGame.anoLancamento
//             const sinopseGame = randomGame.sinopse;
//             const gameScreen = document.querySelector('#game');
//             document.querySelector("#game_cover").src = capaGame;
//             document.querySelector("#title").innerHTML = nomeGame;
//             document.querySelector("#genero_text").innerHTML = generoGame
//             document.querySelector("#ano_text").innerHTML = anoLancamento
//             document.querySelector("#sinopse").innerHTML = sinopseGame
//             gameScreen.style.display = 'Block'
//         } catch (error) {
//             console.error(error.message);
//         }
//     }

//     getRandomGame(value);
// }
