/*Consegna
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione:
nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati:
- abbiamo calpestato una bomba
- la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba 

o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS esclusivamente se ho concluso l'esercizio correttamente:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Consigli del giorno: :gandalf:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio:
Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.*/

let difficolta = 0;

let caselleCliccate = 0;

let selectlivelloUtente = document.getElementById('livello-utente');




document.getElementById('start-game').addEventListener('click', function () {
    difficolta = parseInt(selectlivelloUtente.value);
    generaGrigliaGioco(difficolta);
});








function generaGrigliaGioco(numeroIndice) {
    let wrapper = document.querySelector('.wrapper');


    wrapper.innerHTML = '';





    let bombe = [];



    for (let i = 0; i < 16; i++) {
        let bombaCasuale;


        do {
            bombaCasuale = Math.floor(Math.random() * numeroIndice) + 1;

        } while (bombe.includes(bombaCasuale));

        bombe.push(bombaCasuale);
    }






    for (let i = 1; i <= numeroIndice; i++) {

        let square = document.createElement('div');

        square.classList.add('quadrato');

        if (numeroIndice === 81) {
            square.classList.add('medium');
        } else if (numeroIndice === 49) {
            square.classList.add('hard');
        } else if (numeroIndice === 100) {
            square.classList.add('easy');
        }


        square.innerText = i;



        square.addEventListener('click', function () {

            if (bombe.includes(i)) {
                square.classList.add('bomba-class');
                terminaGioco();
                
            } else {
                square.classList.add('lightblue');
                caselleCliccate++;
                if (caselleCliccate === numeroIndice - 16) {
                    terminaGioco();
                }
            }
        });

        wrapper.appendChild(square);
    }

    

    function terminaGioco() {
        alert("Game Over! Punteggio: " + caselleCliccate);



        const quadrati = document.querySelectorAll('.quadrato');

        for (let i = 0; i < quadrati.length; i++) {
            const square = quadrati[i];
    
            if (bombe.includes(i + 1)) {
                square.classList.add('bomba-class');
            } else if (square.classList.contains('lightblue')) {
                square.classList.add('lightblue');
            }
        }
    }
    }


