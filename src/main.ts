require("dotenv").config();
import { Client, Intents, Collection } from "discord.js";

import scrapeFromAirJordanCategory from "./scrape/air-jordan.scrape";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on("ready", async (client) => {
  console.log(`${client.user!.username} logged.`);
});

const bootStrap = () => {
  client.login();
  scrapeFromAirJordanCategory(client);
};

bootStrap();
