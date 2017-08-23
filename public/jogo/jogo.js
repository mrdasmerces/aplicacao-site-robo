
var jogo = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var fundo;
var roboK7;

var inimigos;
var tiroInimigos;
var explosoes;

var tirosDesviados = 0;
var tirosRecebidos = 0;

var velocidadeRoboK7 = 0;
var teclado;

var texto1;
var texto2;
var texto3; 

Inimigo = function (jogo, jogador, tiros, velocidadeTiro, x, y) {

    this.jogo = jogo; //variavel do jogo Phaser a qual esse objeto pertence.
    this.jogador = jogador; //O alvo do inimigo.
    this.tiros = tiros; //Quantidade de tiros disponiveis.
    this.velocidadeTiro = 2000 - velocidadeTiro; //Velocidade dos tiros disparados.
    this.proximoTiro = 0; //Temporizador de quando os tiros são disparados.
    this.arma = jogo.add.sprite(x, y); //Localização do inimigo no mapa.
};

Inimigo.prototype.update = function() {
    
    //Validação caso o tempo de jogo for maior que o ultimo disparo e se o inimigo ainda tiver tiros disponiveis.
    //Caso verdadeiro, realiza o disparos em direção ao jogador.
    if (this.jogo.time.now > this.proximoTiro && this.tiros.countDead() > 0)
    {
        //Temporizador do proximo disparo é incrementado a cada vez que a arma é acionada.
        this.proximoTiro = this.jogo.time.now + this.velocidadeTiro;

        //Seta a posição da arma e o angulo para qual o tiro sera disparado.
        var tiro = this.tiros.getFirstDead();
        tiro.reset(this.arma.x, this.arma.y);
        tiro.rotation = this.jogo.physics.arcade.moveToObject(tiro, this.jogador, 500);

        //Incrementa quantos tiros o jogador desviou.
        tirosDesviados++;
    }
};

function acertouJogador (roboK7, tiro) {

    tiro.kill(); //Remove imagem do tiro.
    tirosDesviados--; //Decrementa a contagem de tiros desviados.
    tirosRecebidos++; //Incrementa a contagem de tiros recebidos.

    //Executa a animação da explosão em contato com o jogador.
    var explosao = explosoes.getFirstExists(false);
    explosao.reset(roboK7.x, roboK7.y);
    explosao.play('kaboom', 30, false, true);
}

function preload () {
    //Inicia animações, sprites e background do jogo.
    jogo.load.atlas('robo', 'public/jogo/robos.png', 'jogo/robos.json');
    jogo.load.image('tiro', 'public/jogo/tiro.png');
    jogo.load.image('fundo', 'public/jogo/fundo.png');
    jogo.load.spritesheet('kaboom', 'public/jogo/explosao.png', 64, 64, 23);   
}

function create () {
    //Adicionado imagem de fundo ao jogo.
    fundo = jogo.add.tileSprite(0, 0, 800, 600, 'fundo');

    // Criado um estilo de texto para apresentação do resumo da história do jogo.
    var style = { font: "25px Arial", fill: "#RGBA8888", align: "center", };

    // // Adicionado  o robo ao cenario.
    roboK7 = jogo.add.sprite(800/2, 600/2, 'robo', 'robo1');
    roboK7.anchor.setTo(0.5, 0.5);
    robo4', 'robo5', 'robo6'], 20, true);

    // Adicionad fisicas e limitações ao robo.
    jogo.physics.enable(roboK7, Phaser.Physics.ARCADE);
    roboK7.body.maxVelocity.setTo(400, 400);
    roboK7.body.collideWorldBounds = true;

    //  Adicionado quantidade de tiros disponiveis para os inimigos.
    tiroInimigos = jogo.add.group();
    tiroInimigos.enableBody = true;
    tiroInimigos.physicsBodyType = Phaser.Physics.ARCADE;
    tiroInimigos.createMultiple(500, 'tiro');
    
    //  Criação dos inimigos.
    inimigos = [];
    inimigos.push(new Inimigo(jogo, roboK7, tiroInimigos, 0, 0, 0));
    inimigos.push(new Inimigo(jogo, roboK7, tiroInimigos, 100, 0, 600));
    inimigos.push(new Inimigo(jogo, roboK7, tiroInimigos, 200, 800, 0));
    inimigos.push(new Inimigo(jogo, roboK7, tiroInimigos, 300, 800, 600));

    //  Criação da animação de explosao.
    explosoes = jogo.add.group();
    for (var i = 0; i < 10; i++)
    {
        var explosao = explosoes.create(0, 0, 'kaboom', [0], false);
        explosao.anchor.setTo(0.5, 0.5);
        explosao.animations.add('kaboom');
    }

    //Iniciação dos controles do teclado para movimentacao do robo.
    teclado = jogo.input.keyboard.createCursorKeys();

    //Primeiro paragrafo da história.
    texto1 = jogo.add.text(jogo.world.centerX, 140, "Depois que K7 havia derrotado seus oponentes e \nconquistado a FIAP RoboCup 2016, ele foi emboscado por um \ngrupo ladrao de robos e instantaneamente desativado \npara que nao pudesse se defender.\n", style);
    texto1.anchor.set(0.5);
    texto1.alpha = 0.1;

    //Segundo paragrafo da história.
    texto2 = jogo.add.text(jogo.world.centerX, 300, "Com a emboscada, o grupo decidiu levar o pobre robo \nsem consciencia para um deserto cheio de armadilhas. \nPor sorte, K7 tinha um pequeno dispositivo que poderia fazer o ligar \nseus circuitos sem que seus donos do grupo Primeiramente \nestivessem por perto, porem o pior estava por vir.\n", style);
    texto2.anchor.set(0.5);
    texto2.alpha = 0.1;

    //Terceiro paragrafo da história.
    texto3 = jogo.add.text(jogo.world.centerX, 450, "Mesmo ele ativando todo seu sistema, \ndeixaram-no sem sua maior \ndefesa: sua alavanca de espinhos para poder sobreviver \nno meio deste terror.", style);
    texto3.anchor.set(0.5);
    texto3.alpha = 0.1;

    // Exibição da historia juntamente com o nosso robo K7.
    jogo.add.tween(texto1).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    jogo.add.tween(texto2).to({ alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
    jogo.add.tween(texto3).to({ alpha: 1 }, 4000, Phaser.Easing.Linear.None, true);
}

function update () {

    // Validação para que a historia do jogo seja lida então é determinado um tempo de 10 segundos.
    if (jogo.time.totalElapsedSeconds() > 15)
    {    
        // Texto da história é destruido para que o usuário possa jogar o jogo.
        texto1.destroy();
        texto2.destroy();
        texto3.destroy();

        // Atualizado fisica do robo para o recebimento de tiros.
        jogo.physics.arcade.overlap(tiroInimigos, roboK7, acertouJogador, null, this);

        // Definido a variação da direção que o robo tornará pela aperta das setas do teclado.
        if (teclado.left.isDown)
        {
            roboK7.angle -= 4;
        }
        else if (teclado.right.isDown)
        {
            roboK7.angle += 4;
        }

        // Definido a velocidade que o robo tomara ao apertar a seta para cima.
        if (teclado.up.isDown)
        {
            velocidadeRoboK7 = 400;
        }
        else
        {
            if (velocidadeRoboK7 > 0)
            {
                velocidadeRoboK7 -= 4;
            }
        }

        // Se o tecla de aceleração estiver pressionada, a fisica do robo será alterada com os dados.
        if (velocidadeRoboK7 > 0)
        {
            jogo.physics.arcade.velocityFromRotation(roboK7.rotation, velocidadeRoboK7, roboK7.body.velocity);
        }
    
        // Após 15 segundos dentro do jogo as armas serão acionadas para o inicio do jogo.
        if (jogo.time.totalElapsedSeconds() > 18)
        { 
            for (var i = 0; i < inimigos.length; i++)
            {
                inimigos[i].update();   
            }
        }
    }
}

function render () {
    
    if (jogo.time.totalElapsedSeconds() > 15)
    {
        jogo.debug.text('Tiros Recebidos: ' + tirosRecebidos, 32, 32);
        jogo.debug.text('Tiros Desviados: ' + tirosDesviados, 32, 64);
    }
}