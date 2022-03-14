class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  setElementsPosition(){
    this.titleImg.position(120,0)
    this.input.position(width/2-110, height /2 -80)
    this.playButton.position(width/2 -90, height/2 -20)
    this.greeting.position(width/2 -300, height/2 -100)
  }

  setElementsStyle(){
    this.greeting.class("greeting")
    this.input.class("customInput")
    this.playButton.class("customButton")
    this.titleImg.class("gameTitle")
  }

  handleMousePressed(){
    this.playButton.mousePressed(
      ()=>{
        this.input.hide()
        this.playButton.hide()
        var message = `ola ${this.input.value()},</br>
        espere outro jogador`
        this.greeting.html(message)
        playerCount ++;
        player.name = this.input.value();
        player.index = playerCount;
        player.addPlayer();
        player.updateCount(playerCount);
      }
    )
  }

  display(){
    this.setElementsPosition()
    this.setElementsStyle()
    this.handleMousePressed()
  }

}
