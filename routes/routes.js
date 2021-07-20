const express = require("express");
const router = express.Router();

const personagens = [
  {
    id: 1,
    nome: "Yuna",
    imagemURL: "./img/yuna.png",
  },
  {
    id: 2,
    nome: "Tidus",
    imagemURL: "./img/tidus.png",
  },
  {
    id: 3,
    nome: "Auron",
    imagemURL: "./img/auron.png",
  },
  {
    id: 4,
    nome: "Kimahri Ronso",
    imagemURL: "./img/kimahri.png",
  },
  {
    id: 5,
    nome: "Wakka",
    imagemURL: "./img/wakka.png",
  },
  {
    id: 6,
    nome: "Lulu",
    imagemURL: "./img/lulu.png",
  },
  {
    id: 7,
    nome: "Rikku",
    imagemURL: "./img/rikku.png",
  },
  {
    id: 8,
    nome: "Seymour Guado",
    imagemURL: "./img/seymour.png",
  },
  {
    id: 9,
    nome: "Sin",
    imagemURL: "./img/sin.png",
  },
  {
    id: 10,
    nome: "Yu Yevon",
    imagemURL: "./img/yuYevon.png",
  },
  {
    id: 11,
    nome: "Belgemine",
    imagemURL: "./img/belgemine.png",
  },
  {
    id: 12,
    nome: "Lord Braska",
    imagemURL: "./img/lordBraska.png",
  },
  {
    id: 13,
    nome: "Dona",
    imagemURL: "./img/dona.png",
  },
  {
    id: 14,
    nome: "Lord Gandof",
    imagemURL: "./img/lordGandof.png",
  },
  {
    id: 15,
    nome: "Lady Ginnem",
    imagemURL: "./img/ladyGinnem.png",
  },
  {
    id: 16,
    nome: "Isaaru",
    imagemURL: "./img/isaaru.png",
  },
  {
    id: 17,
    nome: "Lord Ohalland",
    imagemURL: "./img/lordOhalland.png",
  },
  {
    id: 18,
    nome: "Lady Yocun",
    imagemURL: "./img/ladyYocun.png",
  },
];

JSON.stringify(personagens)

const getPersonagensValidos = () => personagens.filter(Boolean);

const getPersonagemById = (id) =>
  getPersonagensValidos().find((pers) => pers.id === id);
const getPersonagensIndexById = (id) =>
  getPersonagensValidos().findIndex((pers) => pers.id === id);

router.get("/", (req, res) => {
  res.send("Bem-vindo");
});

router.get("/personagem", (req, res) => {
  console.log(personagens.length)
  res.send(personagens);
});

//COM MASCARA
// router.get("/personagem", (req, res) => {
//   console.log(personagens.length)
//   res.send(getPersonagensValidos());
// });

router.get("/personagem/:id", (req, res) => {
  const id = +req.params.id;
  const personagem = getPersonagemById(id);
  if (!personagem) {
    return res.status(404).send(`Personagem <b>${id}</b> não encontrado.`);
  }
  res.send(personagem);
});

router.post("/personagem", (req, res) => {
  let personagem = req.body;

  if (!personagem || !personagem.nome || !personagem.imagemURL) {
    res.status(400).send({
      message:
        "Personagem Inválido. Certifique-se que o body da requisição possui 'nome' e 'imagemURL'.",
    });
    return;
  }
  personagem.id = personagens.length + 1;
  let data = personagens;
  personagem = { id: data.id, ...personagem };
  personagens.push(personagem);
  res.send(
    `O personagem <b>${personagem.nome}</b> foi adicionado com id <b>${personagem.id}</b>`
  );
});

router.put("/personagem/:id", (req, res) => {
  const id = +req.params.id;
  const personagemIndex = getPersonagensIndexById(id);
  if (personagemIndex < 0) {
    res.status(404).send({
      message: `Personagem com o id: <b>${id}</b> não foi encontrado.`,
    });
    return;
  }
  const novoPers = req.body;
  if (!Object.keys(novoPers).length) {
    res
      .status(400)
      .send({ message: "O body da requisição não pode estar vazio." });
    return;
  }

  if (!novoPers || !novoPers.nome || !novoPers.imagemURL) {
    res.status(400).send({
      message:
        "Personagem Inválido. Certifique-se que o body da requisição possui 'nome' e 'imagemURL'.",
    });
    return;
  }
  const pers = getPersonagemById(id);
  personagens[personagemIndex] = {
    ...pers,
    ...novoPers,
  };
  res.send(personagens[personagemIndex]);
});

router.delete("/personagem/:id", (req, res) => {
  const id = +req.params.id;
  const personagemIndex = getPersonagensIndexById(id);


  if (personagemIndex < 0) {
    res.status(404).send({
      message: `Personagem com o id: ${id} não foi encontrado.`,
    });
    return;
  }

  //delete personagens[personagemIndex] ======Exemplo Proff===============
  personagens.splice(personagemIndex, 1)

  
  res.send({message:`${id} removido com sucesso.`});
});

module.exports = router;
