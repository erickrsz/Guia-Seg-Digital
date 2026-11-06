const PDFDocument = require("pdfkit");
const fs = require("fs");

const OUT = "c:/Users/F18/roteiro-pdf/Roteiro-Consciencia-Digital.pdf";
const doc = new PDFDocument({ size: "A4", margin: 56 });
doc.pipe(fs.createWriteStream(OUT));

const COR_TITULO = "#1a3a6b";
const COR_PART = "#0a6b4a";
const COR_SEC = "#8a4b00";
const COR_TEXTO = "#1a1a1a";

// Capa / cabecalho
doc.fillColor(COR_TITULO).fontSize(26).font("Helvetica-Bold")
  .text("Consciência Digital", { align: "center" });
doc.moveDown(0.3);
doc.fillColor("#555555").fontSize(13).font("Helvetica")
  .text("Guia prático de segurança, privacidade e cidadania online", { align: "center" });
doc.moveDown(0.3);
doc.fillColor("#555555").fontSize(11)
  .text("Roteiro de apresentação — Patrick, Erick, Leonardo e Marcello", { align: "center" });
doc.moveDown(1);

doc.strokeColor(COR_TITULO).lineWidth(2)
  .moveTo(doc.page.margins.left, doc.y)
  .lineTo(doc.page.width - doc.page.margins.right, doc.y)
  .stroke();
doc.moveDown(1);

function participante(nome, subtitulo) {
  if (doc.y > doc.page.height - 160) doc.addPage();
  doc.moveDown(0.5);
  doc.fillColor(COR_PART).fontSize(16).font("Helvetica-Bold").text(nome);
  doc.fillColor("#666666").fontSize(11).font("Helvetica-Oblique").text(subtitulo);
  doc.moveDown(0.5);
}

function bloco(titulo, texto) {
  if (doc.y > doc.page.height - 130) doc.addPage();
  doc.fillColor(COR_SEC).fontSize(12).font("Helvetica-Bold").text(titulo);
  doc.moveDown(0.15);
  doc.fillColor(COR_TEXTO).fontSize(11.5).font("Helvetica")
    .text(texto, { align: "justify", lineGap: 2 });
  doc.moveDown(0.7);
}

// PATRICK
participante("Patrick", "Abertura e Permanência Digital");
bloco("Abertura",
  "\u201COlá a todos. Bem-vindos à nossa apresentação sobre Consciência Digital, um guia prático focado em segurança, privacidade e cidadania online para toda a família. Para começar a entender como proteger nossa vida física e virtual, precisamos aceitar uma premissa básica: a Regra do \u2018Para Sempre\u2019.\u201D");
bloco("A Ilusão do Deletar",
  "\u201CTudo o que cai na rede, fica na rede. O botão de apagar ou deletar que usamos nos aplicativos é, na verdade, uma ilusão técnica. Existe um perigo invisível operando nos bastidores: as capturas de tela, os famosos \u2018prints\u2019, e os servidores de terceiros que armazenam nossos dados mesmo depois de tentarmos excluí-los.\u201D");

// ERICK
participante("Erick", "Superexposição e Prevenção Básica");
bloco("Pegada Digital e Engenharia Social",
  "\u201CPegando o gancho do Patrick, essa permanência de dados cria o que chamamos de Pegada Digital, que é o rastro cumulativo de dados que deixamos na rede. O perigo real está nos pequenos detalhes que publicamos sem perceber: uniformes escolares, fachadas de casas, placas de veículos e nossas rotinas fixas. Criminosos usam exatamente essas informações em táticas de Engenharia Social para criar o que eles chamam de \u2018golpes perfeitos\u2019.\u201D");
bloco("Como Proteger Quem Você Ama",
  "\u201CPara combater isso, temos regras práticas. Primeiro: a configuração de contas de menores deve ser obrigatoriamente privada. Segundo: use a \u2018Regra dos 5 Segundos\u2019, que consiste em inspecionar o fundo da imagem antes de publicá-la. E terceiro: faça postagens atrasadas. Registre o momento na hora, mas publique apenas quando já tiver saído do local.\u201D");

// LEONARDO
participante("Leonardo", "Senhas, Phishing e Autenticação");
bloco("Senhas",
  "\u201CAgora que cuidamos da nossa exposição, precisamos blindar nossos acessos. Um erro crítico de segurança da informação é reutilizar a mesma senha em múltiplos ecossistemas. Robôs criminosos realizam ataques automatizados por dicionários tentando essas credenciais. Esqueçam senhas vulneráveis como \u2018123456\u2019, datas de aniversário ou nomes de pets. Usem senhas robustas, misturando caracteres especiais, letras maiúsculas, minúsculas e números.\u201D");
bloco("Phishing e 2FA",
  "\u201CAlém disso, cuidado com o Phishing, a \u2018pescaria\u2019 digital. Desconfie de mensagens com extrema urgência ou promessas de lucros absurdos, e de falsas centrais telefônicas simulando gerentes de banco ou suporte. Lembrem-se do fato crucial: nenhuma instituição legítima solicita códigos ou transferências de teste. E para garantir, ativem o \u2018Cadeado Duplo\u2019, a autenticação em duas etapas. Isso cria uma blindagem essencial onde, mesmo sabendo a senha, o invasor é bloqueado. Mas evitem o SMS devido ao risco de clonagem do chip, o SIM Swap; prefiram usar Aplicativos Autenticadores.\u201D");

// MARCELLO
participante("Marcello", "Saúde Mental, Aspecto Legal e Encerramento");
bloco("Cyberbullying",
  "\u201CSegurança digital também é sobre proteger a nossa mente. O Cyberbullying é um assédio silencioso que invade o quarto da vítima 24 horas por dia. Práticas cruéis como perfis de fofocas anônimos e o Doxxing, que é o vazamento de dados privados, trazem consequências graves: ansiedade aguda, isolamento social, depressão e queda no rendimento escolar.\u201D");
bloco("A Internet não é sem leis",
  "\u201CÉ fundamental entender que a internet não é uma terra sem leis. Se você for vítima, não alimente o ódio: não discuta nem responda aos agressores. Faça a coleta de provas jurídicas tirando prints completos que contenham URLs, IDs e números. Depois, acione os canais de denúncia, como o Conselho Tutelar e Delegacias Especializadas.\u201D");
bloco("Encerramento e Quiz",
  "\u201CPara testar tudo o que aprendemos hoje, chegou a Hora do Desafio Prático! Escaneiem o QR Code na tela para acessar o nosso portal e participar do nosso QUIZ de segurança digital. Muito obrigado pela atenção de todos!\u201D");

doc.end();
console.log("PDF gerado: " + OUT);
