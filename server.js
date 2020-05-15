const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://.glitch.me/`);
}, 280000);

const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const { prefix, devs } = require("./config");
const client = new Client({
  disableEveryone: true
});
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require("snekfetch");
const db = require("quick.db");
const guild = require("guild");
const dateFormat = require("dateformat"); //npm i dateformat
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(process.env.BOT_TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");

console.log("==================================");
console.log("1");
console.log("2");
console.log("3");
console.log("=========> Bot Online <=========");
console.log("========> TestBot <========");
console.log("=======> Token Bot **** <=======");
console.log("3");
console.log("2");
console.log("1");
console.log("====================================");
console.log("Bot Online 24/7");

client.on("message", message => {
  if (message.author.bot) return;

  if (message.content === prefix + "help") {
    message.channel.send(`**Bot Commands
● | ${prefix}buy sfa/nfa amount -> To Buy An Account
● | ${prefix}stock -> To Check The Stock
● | ${prefix}add sfa/nfa email pass -> To Add An Account To The Stock (The Owner OF The Bot)
● | ${prefix}give mention sfa/nfa amount -> To Give Someone An Account (The Owner OF The Bot)
**`);
  }
});

const cools = [];
let sfa = JSON.parse(fs.readFileSync("./sfa.json", "utf8")); // .
let nfa = JSON.parse(fs.readFileSync("./nfa.json", "utf8")); // .
let SFAP = 1000; /*Full Data Priceا*/
let NFAP = 100; /*Normal Account Price*/
let URID = ""; //The ID Of The Credits Receiver
client.on("message", async message => {
  let bOn = await db.fetch(`bOn_${message.guild.id}`);
  if (message == prefix + "stock") {
    let ahmed = 0;
    let hossam = 0;

    if (bOn === "off")
      return message.reply("**Sorry, Buying mode are disabled**");

    sfa.forEach(acc => {
      if (!acc.email) return;
      ahmed++;
    });
    nfa.forEach(acc => {
      if (!acc.email) return;
      hossam++;
    });
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle("💵 shop 💵") ///1
        .addField("**[SFA | فل داتا] > **", `**${ahmed} Account(s)**`, true)
        .addField("**[NFA | عادي] > **", `**${hossam} Account(s)  **`, true)
        .setColor("GREEN")
        .addField(
          "**Infos**",
          `**\`[SFA]\` > Full Data - You Can Change The Skin And The Password And The Name
\`[NFA]\` > Normal - You Can Only Play You Cannot Change Anything**`
        )
        .addField(
          "**الاسعار**",
          `\`[1 SFA] > ${SFAP} Credits ProBot\` \n \`[1 NFA] > ${NFAP} Credits ProBot\``
        )
        .setFooter(
          `To Buy An Account Type This Command $buy [sfa/nfa] [Ammount]`
        )
    );
  }
  if (message.content.startsWith(prefix + "buy")) {
    if (bOn === "off")
      return message.reply("**Sorry, Buying mode are disabled**");

    let cmd = message.content.split(" ")[1];
    let args = message.content.split(" ")[2];
    if (!cmd || !args || isNaN(args))
      return message.channel.send(
        `**Correct Usage Example: ${prefix}buy SFA 1**`
      ); ///2
    if (cmd == "sfa") {
      if (
        cools[message.author.id + message.guild.id] &&
        cools[message.author.id + message.guild.id].status == "on"
      )
        return message.reply("**You Are Already Afecting another Purshase.**");
      let ahmed = 0;
      sfa.forEach(acc => {
        if (!acc.email) return;
        ahmed++;
      });
      if (ahmed < 1) return message.channel.send("No Accounts Found");
      if (ahmed < args)
        return message.channel.send("No Accounts Found In The Stock"); //
      message.author
        .send("✅ Nothing.. Just Checked  If Your DM open is or no")
        .then(() => {
          cools[message.author.id + message.guild.id] = {
            status: "on"
          };
          let P = Math.floor(args * SFAP);
          message.channel.send(
            new Discord.RichEmbed()
              .setAuthor(message.author.tag, message.author.avatarURL)
              .setColor("#918383")
              .setDescription(`**Type This Command To Continue
#credits <@${URID}> ${P}
You Have 3 Minutes Before Canceling.**`)
          );
          let P2 = Math.floor(P - P * (5 / 100)); ///3
          let filter = response =>
            response.author.id == "282859044593598464" &&
            response.mentions._content.includes(
              `**:moneybag: | ${message.author.username}, has transferred \`$${P2}\` to <@${URID}> **`
            );
          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 240000,
              errors: ["time"]
            })
            .then(collected => {
              let C = 0;
              let Accs = [];
              sfa.forEach(acc => {
                if (!acc.email) return;
                if (C == args) return;
                Accs.push(`Email: ${acc.email} | pass: ${acc.pass}`);
                C++;
                delete acc.email;
                delete acc.pass;
                fs.writeFile("./sfa.json", JSON.stringify(sfa), err => {
                  if (err) console.error(err);
                });
              });
              delete cools[message.author.id + message.guild.id];
              message.channel.send("**Done,,\nNow Check Your DM**!");
              message.author
                .send(
                  `Your Accs :)\`\`\`json\n${Accs.join(
                    "\n"
                  )}\n\`\`\`This Message Will Be Deleted After 5 Minutes Please Copy The Account and paste it into your notes !`
                )
                .then(M => M.delete(5 * 60 * 1000));
            });
        })
        .catch(err => {
          delete cools[message.author.id + message.guild.id];
          return message.channel.send("**:x: Please Open Your DM**!");
        });
    }
    if (cmd == "nfa") {
      if (
        cools[message.author.id + message.guild.id] &&
        cools[message.author.id + message.guild.id].status == "on"
      )
        return message.reply("**You Are Already Affecting Nother Purshase.**");

      let ahmed = 0;
      nfa.forEach(acc => {
        if (!acc.email) return;
        ahmed++;
      });
      if (ahmed < 1)
        return message.channel.send("No Accounts Found In The Stock");
      if (ahmed < args)
        return message.channel.send("Not Enough Accounts In The Stock");
      message.author
        .send("✅ Nothing.. Just Checked If Your DM is open or no")
        .then(() => {
          let P = Math.floor(args * NFAP);
          cools[message.author.id + message.guild.id] = {
            status: "on"
          };
          let P3 = Math.floor(args * NFAP);
          message.channel.send(
            new Discord.RichEmbed()
              .setAuthor(message.author.tag, message.author.avatarURL)
              .setColor("#918383")
              .setDescription(`**Type This Command To Continue
#credits <@${URID}> ${P3}
You Have 3 Minutes Before Canceling.**`)
          );
          P = Math.floor(P3 - P3 * (5 / 100)); ///4
          let filter = response =>
            response.author.id == "282859044593598464" &&
            response.mentions._content.includes(
              `**:moneybag: | ${message.author.username}, has transferred \`$${P}\` to <@${URID}> **`
            );
          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 240000,
              errors: ["time"]
            })
            .then(collected => {
              let C = 0;
              let Accs = [];
              nfa.forEach(acc => {
                if (!acc.email) return;
                if (C == args) return;
                Accs.push(`Email: ${acc.email} | pass: ${acc.pass}`);
                C++;
                delete acc.email;
                delete acc.pass;
                fs.writeFile("./nfa.json", JSON.stringify(nfa), err => {
                  if (err) console.error(err);
                });
              });
              delete cools[message.author.id + message.guild.id];
              message.channel.send("**Done, Now Check Your DM**!");
              message.author
                .send(
                  `Your Accs :)\`\`\`json\n${Accs.join(
                    "\n"
                  )}\n\`\`\`The Message Will Be Deleted After 5 Minutes Pls Copy The Account And Paste It Into Your Notes !`
                )
                .then(M => M.delete(5 * 60 * 1000));
            });
        })
        .catch(err => {
          delete cools[message.author.id + message.guild.id];
        });
    }
  }

  if (message.content.startsWith(prefix + "add")) {
    if (message.author.id !== URID)
      return message.reply("** Only <@" + URID + "> can use this command.**");
    let type = message.content.split(" ")[1];
    let email = message.content.split(" ")[2];
    let pass = message.content.split(" ")[3];

    let types = ["sfa", "nfa", "send"];

    if (!email) return message.reply("Email?");
    if (!pass) return message.reply("Password !");
    if (type == "sfa") {
      let alt = {
        email: `${email}`,
        pass: `${pass}`
      };
      sfa.push(alt);
      fs.writeFile("./sfa.json", JSON.stringify(sfa), err => {
        if (err) console.error(err);
      });

      message.reply("**Successfully adedd this account.**");
    } else if (type == "nfa") {
      let alt = {
        email: `${email}`,
        pass: `${pass}`
      };
      nfa.push(alt);
      fs.writeFile("./nfa.json", JSON.stringify(nfa), err => {
        if (err) console.error(err);
      });

      message.reply("**Successfully adedd this account.**");
    }
  }
  if (message.content.startsWith(prefix + "give")) {
    let type = message.content.split(" ")[2];
    let args = message.content.split(" ")[3];
    let user = message.mentions.users.first();

    if (!user) return message.channel.send("**Please mention a user**");

    if (!type) return message.channel.send("**Please input a alt type**");
    if (!args[0]) return message.reply("**Please input amount**");
    if (type === "sfa") {
      let C = 0;
      let Accs = [];
      sfa.forEach(acc => {
        if (!acc.email) return;
        if (C == args) return;
        Accs.push(`Email: ${acc.email} | pass: ${acc.pass}`);
        C++;
        delete acc.email;
        delete acc.pass;

        fs.writeFile("./sfa.json", JSON.stringify(sfa), err => {
          if (err) console.error(err);
        });
      });
      message.channel.send("**Done**");
      user
        .send(
          `${
            message.author.username
          } has gifted you a sfa account \n \`\`\`${Accs.join("\n")}\`\`\` `
        )
        .then(M => M.delete(5 * 60 * 1000));
    }

    if (type === "nfa") {
      let C = 0;
      let Accs = [];
      nfa.forEach(acc => {
        if (!acc.email) return;
        if (C == args) return;
        Accs.push(`Email: ${acc.email} | pass: ${acc.pass}`);
        C++;
        delete acc.email;
        delete acc.pass;

        fs.writeFile("./nfa.json", JSON.stringify(nfa), err => {
          if (err) console.error(err);
        });
      });
      message.channel.send("**Done**");
      user
        .send(
          `${
            message.author.username
          } has gifted you a nfa account \n \`\`\`${Accs.join("\n")}\`\`\` `
        )
        .then(M => M.delete(5 * 60 * 1000));
    }
  }
});
