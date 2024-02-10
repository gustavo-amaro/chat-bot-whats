const qrcode = require("qrcode-terminal");
const { faker } = require("@faker-js/faker");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message_create", async (message) => {
  const authorNumber = message.from;
  if (message.fromMe) return;

  const randomName = faker.person.fullName();

  setTimeout(() => {
    client.sendMessage(authorNumber, "Olá, meu nome é " + randomName);
  }, 2000);

  setTimeout(() => {
    client.sendMessage(
      authorNumber,
      "Que horas eu posso falar com um atendente?"
    );
  }, 8000);

  setTimeout(() => {
    client.sendMessage(authorNumber, "Obrigado!");
  }, 15000);
});
client.initialize();
