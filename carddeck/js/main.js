let deckid="";
let url="https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
fetch(url)
.then(data => data.json())
.then(data => {
  deckid=data.deck_id;
  console.log(deckid);
})
.catch(err =>{
  console.log(`error is ${err}`)
})

document.querySelector("#getacard").addEventListener('click',fetchacard);

function fetchacard(){
  console.log("fecthing card");
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckid}/draw/?count=2`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.getElementById("card1").src=data.cards[0].image;
    document.getElementById("card2").src=data.cards[1].image;
    let player1value = convertToNum(data.cards[0].value);
    let player2value = convertToNum(data.cards[1].value);
    if(player1value > player2value)
      document.querySelector("h2").innerText="player1 wins!!!"
    else if(player1value < player2value)
      document.querySelector("h2").innerText="player2 wins!!!"
    else
      document.querySelector("h2").innerText="Time for WAR!!!"
  })
  .catch(err => {
    console.log(`error is ${err}`)
  })
}

function convertToNum(val){
  if(val === "ACE")
    return 14;
  else if(val === "KING")
    return 13;
  else if(val === "QUEEN")
    return 12;
  else if(val === "JACK")
    return 11;
  else
    return Number(val);
}
