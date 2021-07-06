const db = require("./db");
const { User } = require("./models");
const Conversation = require("./models/conversation");
const Message = require("./models/message");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const thomas = await User.create({
    username: "thomas",
    email: "thomas@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png",
  });

  const santiago = await User.create({
    username: "santiago",
    email: "santiago@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
  });

  const santaigoConvo = await Conversation.create({
    user1Id: thomas.id,
    user2Id: santiago.id,
  });

  await Message.create({
    conversationId: santaigoConvo.id,
    senderId: santiago.id,
    text: "Where are you from?",
  });
  await Message.create({
    conversationId: santaigoConvo.id,
    senderId: thomas.id,
    text: "I'm from New York",
  });
  await Message.create({
    conversationId: santaigoConvo.id,
    senderId: santiago.id,
    text: "Share photo of your city, please",
  });

  const chiumbo = await User.create({
    username: "chiumbo",
    email: "chiumbo@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/8bc2e13b8ab74765fd57f0880f318eed1c3fb001_fownwt.png",
  });
  const chiumboConvo = await Conversation.create({
    user1Id: chiumbo.id,
    user2Id: thomas.id,
  });
  await Message.create({
    conversationId: chiumboConvo.id,
    senderId: chiumbo.id,
    text: "Sure! What time?",
  });

  const hualing = await User.create({
    username: "hualing",
    email: "hualing@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/6c4faa7d65bc24221c3d369a8889928158daede4_vk5tyg.png",
  });
  const hualingConvo = await Conversation.create({
    user2Id: hualing.id,
    user1Id: thomas.id,
  });

  for (let i = 0; i < 11; i++) {
    await Message.create({
      conversationId: hualingConvo.id,
      senderId: hualing.id,
      text: "a test message",
    });
  }

  await Message.create({
    conversationId: hualingConvo.id,
    senderId: hualing.id,
    text: "😂 😂 😂",
  });

  const otherUsers = await Promise.all([
    ,
    User.create({
      username: "ashanti",
      email: "ashanti@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/68f55f7799df6c8078a874cfe0a61a5e6e9e1687_e3kxp2.png",
    }),
    User.create({
      username: "julia",

      email: "julia@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/d9fc84a0d1d545d77e78aaad39c20c11d3355074_ed5gvz.png",
    }),
    User.create({
      username: "cheng",
      email: "cheng@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/9e2972c07afac45a8b03f5be3d0a796abe2e566e_ttq23y.png",
    }),
  ]);

  console.log(`seeded users and messages`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
