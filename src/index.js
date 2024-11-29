const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};
const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let resultado;

  switch (true) {
    case random < 0.33:
      resultado = "RETA";
      break;
    case random < 0.66:
      resultado = "CURVA";
      break;
    case random < 0.88:
    default:
      resultado = "CONFRONTO";
  }
  return resultado;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um, dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(p1, p2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // Rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // Teste de habilidade
    let TotalTestSkill1 = 0;
    let TotalTestSkill2 = 0;

    if (block === "RETA") {
      TotalTestSkill1 = diceResult1 + p1.VELOCIDADE;
      TotalTestSkill2 = diceResult2 + p2.VELOCIDADE;

      await logRollResult(p1.NOME, "velocidade", diceResult1, p1.VELOCIDADE);
      await logRollResult(p2.NOME, "velocidade", diceResult1, p2.VELOCIDADE);
    }
    if (block === "CURVA") {
      TotalTestSkill1 = diceResult1 + p1.MANOBRABILIDADE;
      TotalTestSkill2 = diceResult2 + p2.MANOBRABILIDADE;

      await logRollResult(
        p1.NOME,
        "manobrabilidade",
        diceResult1,
        p1.MANOBRABILIDADE
      );
      await logRollResult(
        p2.NOME,
        "manobrabilidade",
        diceResult1,
        p2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + p1.PODER;
      let powerResult2 = diceResult2 + p2.PODER;

      console.log(`${p1.NOME} confrontou com ${p2.NOME}!🥊`);

      await logRollResult(p1.NOME, "poder", diceResult1, p1.PODER);
      await logRollResult(p2.NOME, "poder", diceResult1, p2.PODER);

      if (powerResult1 > powerResult2 && p2.PONTOS > 0) {
        console.log(`${p1.NOME} venceu o confronto! ${p2.NOME}
            perdeu 1 ponto🐢`);
        p2.PONTOS--;}
      else if (powerResult2 > powerResult1 && p1.PONTOS > 0) {
        console.log(`${p2.NOME} venceu o confronto! ${p1.NOME}
            perdeu 1 ponto🐢`)
        p1.PONTOS--;}
       
      else if (powerResult2 === powerResult1) {
        console.log("Confronto empatado nenhum ponto foi perdido!!")
      }
    }
    if (TotalTestSkill1 > TotalTestSkill2) {
      console.log(`${p1.NOME} marcou um ponto!`);
      p1.PONTOS++;
    } else if (TotalTestSkill2 > TotalTestSkill1) {
      console.log(`${p2.NOME} marcou um ponto!`);
      p2.PONTOS++;
    }

    console.log("----------------------------------------")
  } } 

async function declareWin(p1, p2) {
    console.log('Resultado Final:')
    console.log(`${p1.NOME}: ${p1.PONTOS} pontos(s)`)
    console.log(`${p2.NOME}: ${p2.PONTOS} pontos(s)`)

    if (p1.PONTOS > p2.PONTOS) 
        console.log(`${p1.NOME} venceu a corrida! Parabéns!🏆`)
    else if(p2.PONTOS > p1.PONTOS)
        console.log(`${p2.NOME} venceu a corrida! Parabéns!🏆`)
    else
        console.log(" A corrida terminou empatada!!")
    }

(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`
  );
  await playRaceEngine(player1, player2);
  await declareWin(player1, player2)
})(); 
