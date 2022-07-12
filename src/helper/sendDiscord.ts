import {
  Client,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";

import { QuickDB } from "quick.db";
const quickdb = new QuickDB();

import EmojiStore from "../store/EmojiStore";


const scrapeToDiscord = async (
  image: string,
  title: string,
  price: string,
  link: string,
  client: Client
) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID as string);
  const channel = guild?.channels.cache.get(process.env.CHANNEL_ID as string);

  if (!channel || channel.type !== "GUILD_TEXT") return;

  const getProduct = await quickdb.get("last-product");

  if (link === getProduct) return;

  await quickdb.set("last-product", link);

  const url = `https://wunder.com.tr${link}`;

  const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel("Ürüne Git").setURL(url).setStyle("LINK")
  );

  const embed = new MessageEmbed({
    color: "AQUA",
    author: { name: `${EmojiStore.get('new')} | ${title}` },
    image: { url: image },
    footer: { text: `Fiyat: ${price}` },
    timestamp: new Date(),
  });

  return channel.send({ embeds: [embed], components: [row] });
};

export default scrapeToDiscord;
