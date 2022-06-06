import db from "../../components/backend/db";
import { signToken } from "../../components/backend/auth";
import User from "../../components/backend/models/User";
import bcrypt from "bcrypt";

export default async function login(req, res) {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: "invalid user or password" });
  }
}
