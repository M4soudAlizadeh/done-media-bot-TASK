const Telegraf = require("telegraf");

const bot = new Telegraf("2036374613:AAFphxooVg-Wj6_hgka_GWhVRXS2vuqFz4g");

bot.command(["start", "help"], (ctx) => {
  const message = `
  Help Reference:
  /newyork - image from New york
  /dubai - get gif of dubai
  /singapore - get location singapore
  /cities - get photos of cities
  /citiesfile - get cities file list`;
  ctx.reply(message);
});

bot.command("newyork", (ctx) => {
  ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo");
  ctx.telegram.sendPhoto(
    ctx.chat.id,
    { source: "res/newyork.jpg" },
    { reply_to_message_id: ctx.update.message.message_id }
  );
});

bot.command("dubai", (ctx) => {
  ctx.telegram.sendChatAction(ctx.chat.id, "upload_video");
  ctx.telegram.sendAnimation(
    ctx.chat.id,
    "https://tenor.com/view/dubaitourpackagesfrom-coimbatore-dubaitourpackagesfrom-hyderabad-dubaitourpackagesfrom-ahmedabad-dubaitourpackagesfrom-chennai-dubaihoneymoonpackages-gif-16024993",
    {
      reply_to_message_id: ctx.update.message.message_id,
    }
  );
});

bot.command("cities", (ctx) => {
  ctx.telegram.sendChatAction(ctx.chat.id, "upload_video");
  const cities = [
    "res/dubai.jpg",
    "res/london.jpg",
    "res/hongkong.jpg",
    "res/newyork.jpg",
    "res/singapore.jpg",
  ];
  const result = cities.map((city) => {
    return { type: "photo", media: { source: city } };
  });

  bot.telegram.sendMediaGroup(ctx.chat.id, result);
  //  [
  //     { type: "photo", media: { source: "res/dubai.jpg" } },
  //     { type: "photo", media: { source: "res/london.jpg" } },
  //     { type: "photo", media: { source: "res/hongkong.jpg" } },
  //     { type: "photo", media: { source: "res/newyork.jpg" } },
  //     { type: "photo", media: { source: "res/singapore.jpg" } },
  //   ]);
});

bot.command("citieslist", (ctx) => {
  bot.telegram.sendDocument(
    ctx.chat.id,
    { source: "res/citieslist.txt" },
    { thumb: { source: "res/dubai.jpg" } }
  );
});

bot.command("singapore", (ctx) => {
  bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198);
});

bot.on("message", async (ctx) => {
  if (ctx.updateSubTypes[0] == "document") {
    try {
      const link = await bot.telegram.getFileLink(ctx.message.document.file_id);
      ctx.reply("your download link :" + link);
    } catch (err) {
      console.log(err);
      ctx.reply(err.description);
    }
  } else if (ctx.updateSubTypes[0] == "photo") {
    try {
      const link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
      ctx.reply("your download link :" + link);
    } catch (err) {
      console.log(err);
      ctx.reply(err.description);
    }
  }
});
// bot.command("test", (ctx) => {
//   send phto    Url
//     bot.telegram.sendPhoto(
//       ctx.chat.id,
//       "https://cdn.pixabay.com/photo/2014/08/01/15/51/manhattan-407703_1280.jpg"
//     );
//   send photo    file
//     bot.telegram.sendPhoto(ctx.chat.id, { source: "res/london.jpg" });
//   send photo   id
//   bot.telegram.sendPhoto(
//     ctx.chat.id,
//     "AgACAgQAAxkBAAMIYV3Hjz619pxXevmLeCHMzWN8c_UAAui4MRu_hfFSD7EbR3nNqZMBAAMCAAN4AAMhBA"
//   );
// });

bot.launch();
