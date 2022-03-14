class Player {
  constructor() {
    this.name = null
    this.index = null
    this.positionX = 0
    this.positionY = 0
  }

  //atualizando o playerCount do jogo
  getCount(){
    var getCountRef = database.ref("playerCount");
    getCountRef.on("value", function (data){
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref("/").update({
      playerCount: count
    })
  }

  addPlayer(){
    var playerIndex = "players/player"+this.index

    if (this.index === 1) {
      this.positionX = width / 2 -100;
    } else {
      this.positionX = width / 2 +100;
    }
    
    database.ref(playerIndex).set({
      name:this.name,
      positionX: this.positionX,
      positionY:this.positionY
    })
  }
}
