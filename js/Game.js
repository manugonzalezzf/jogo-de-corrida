class Game {
  constructor() {
    this.resetTitle= createElement("h2")
    this.resetButton=createButton("")
    this.leaderBoardTitle= createElement('h2')
    this.leader1 = createElement('h2')
    this.leader2 = createElement('h2')
  }

  //atualizando o GameState do jogo
  getState(){
    var getStateRef = database.ref("gameState");
    getStateRef.on("value", function(data){
      gameState = data.val()
    })
  }
  updateState(state){
    database.ref("/").update({
      gameState: state
    })
  }

  start() {

    player = new Player();
    playerCount = player.getCount();
    
    form = new Form();
    form.display();

    car1 = createSprite(width/2 -50, height -100);
    car1.addImage("car1",car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width/2 +100, height -100);
    car2.addImage("car2",car2_img);
    car2.scale = 0.07;
    
    cars = [car1,car2]

    fuels = new Group()
    powerCoins = new Group()
    obs1 = new Group()
    obs2 = new Group()

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obs2img },
      { x: width / 2 - 150, y: height - 1300, image: obs1img },
      { x: width / 2 + 250, y: height - 1800, image: obs1img },
      { x: width / 2 - 180, y: height - 2300, image: obs2img },
      { x: width / 2, y: height - 2800, image: obs2img },
      { x: width / 2 - 180, y: height - 3300, image: obs1img },
      { x: width / 2 + 180, y: height - 3300, image: obs2img},
      { x: width / 2 + 250, y: height - 3800, image: obs2img },
      { x: width / 2 - 150, y: height - 4300, image: obs1img },
      { x: width / 2 + 250, y: height - 4800, image: obs2img },
      { x: width / 2, y: height - 5300, image: obs1img},
      { x: width / 2 - 180, y: height - 5500, image: obs2img }
    ];

    this.addSprites(fuels, 4, fuelsimg, 0.02)
    this.addSprites(powerCoins, 18, powerCoinsimg, 0.09)
    this.addSprites(obs1,obstaclesPositions.length, obs1img,0.04, obstaclesPositions)
    //this.addSprites(obs2,obstaclesPositions.length, obs2img,0.04, obstaclesPositions)
  }

  addSprites(spriteGroup, numberOfsprites,spriteImg, scale,positions=[]){
    for (let index = 0; index < numberOfsprites; index++) {
      var x, y
      if (positions.length>0) {
        x=positions[index].x
        y=positions[index].y
        spriteImg=positions[index].image
      } else {
        x= random(width/2+150,width/2 -150)
        y= random(-height*4.5,height-400)
      }
      
      var sprite = createSprite(x,y)
      sprite.addImage(spriteImg)
      sprite.scale = scale 
      spriteGroup.add(sprite)
    }
  }

  handleElements(){
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEffect")
    
    this.resetTitle.html("reiniciar jogo")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width/2+200,40)

    this.resetButton.class("resetButton")
    this.resetButton.position(width/2 +230,100)
    
    this.leaderBoardTitle.html("placar")
    this.leaderBoardTitle.class("resetText")
    this.leaderBoardTitle.position(width/3 -60, 40)
    
    this.leader1.class("leadersText")
    this.leader1.position(width/3 -50,80)

    this.leader2.class("leadersText")
    this.leader2.position(width/3 -50,130)
  }

  play(){
    this.handleElements()
    this.handleResetButton()
    Player.getPlayersInfo()
    player.getCarsAtEnd()

    if (allPlayers !== undefined) {
      image(track,0,-height*5,width,height*6)
      this.showLeaderBoard()
      this.showLife()

      var index = 0;
      for (var plr in allPlayers) {
        index ++;
        var x = allPlayers[plr].positionX
        var y = height-allPlayers[plr].positionY

        cars[index-1].position.x = x;
        cars[index-1].position.y = y;
        if (index==player.index) {
          fill("red")
          ellipse(x,y,60,60)
          //camera.position.x= cars[index-1].position.x 
          camera.position.y= cars[index-1].position.y       }
      }

      this.heandlePlayerControls();

      const finishLine= height*6-100
      if (player.positionY>finishLine) {
        gameState= 2
        player.rank++
        Player.updateCarsAtEnd(player.rank)
        player.update()
        this.showRank()
      }
      
      drawSprites();
    }
  }

  heandlePlayerControls(){

    if (keyIsDown(UP_ARROW)) {
      player.positionY+= 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW)&&player.positionX>width/3-30) {
      player.positionX-= 5;
      player.update();
      }
      if (keyIsDown(RIGHT_ARROW)&&player.positionX<width/2 +300) {
        player.positionX+= 5;
        player.update();
        }

  }
  showLeaderBoard(){
    var leader1, leader2
    var players = Object.values(allPlayers)
    if (players[0].rank==0&&players[1].rank==0||players[0].rank==1) {
      leader1= players[0].rank+ "&emsp" +players[0].name+ "&emsp" + players[0].score
      leader2= players[1].rank+ "&emsp" +players[1].name+ "&emsp" + players[1].score
    }
    if (players[1].rank==1) {
      leader2= players[0].rank+ "&emsp" +players[0].name+ "&emsp" + players[0].score
      leader1= players[1].rank+ "&emsp" +players[1].name+ "&emsp" + players[1].score
    }
    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }
  handleResetButton(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        gameState: 0,
        playerCount: 0,
        carsAtEnd: 0,
        players: {}
      })
      window.location.reload()
    })
  }
  showRank(){
    swal({
      title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você alcançou a linha de chegada com sucesso!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Fim de Jogo`,
      text: "Oops você perdeu a corrida!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Obrigado por jogar"
    });
  }
  showLife(){
    push()
    image(lifeImg, width/2-130,height-player.positionY-400,20,20)
    fill("white")
    rect(width/2-100,height-positionY-400,185,20)
    fill("#f50057")
    rect(width/2-100,height-positionY-400,player.life,20)
    pop()
  }
}
