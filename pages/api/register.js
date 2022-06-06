import db from "../../components/backend/db";
import bcrypt from "bcrypt";
import User from "../../components/backend/models/User";
import { signToken } from "../../components/backend/auth";

export default async function register(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { name, surname, email, password } = req.body;

  await db.connect();

  const newUser = new User({
    name,
    surname,
    email,
    password: bcrypt.hashSync(password, 10),
    isAdmin: false,
  });

  try {
    const user = await newUser.save();
    //console.log("newUser is ", newUser, "saved", user);
    const token = signToken(user);
    res.status(200).send({
      type: "registration",
      status: "success",
      user: {
        token,
        name: user.name,
        surname: user.surname,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ type: "registration", status: "error" }); //for errors
  }
}
