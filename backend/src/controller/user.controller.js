import { users } from "../helpers/user.helpers";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const createUsers = async (req, res) => {
  const usersDB = await User.insertMany(users);

  res.status(201).json(usersDB);
};

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!email || !password || !fullName || !role) {
      res.status(400).json({ msg: "Campos requeridos" });
    }

    const findUserByEmail = await User.findOne({ email });

    if (findUserByEmail) {
      return res.status(401).json({ msg: "Ya existe este correo" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Campos requeridos" });
  }

  const findMatchUser = await User.findOne({
    email,
    password,
  });

  let token;

  if (findMatchUser) {
    token = jwt.sign({ user: findMatchUser }, "mykey", {
      expiresIn: 43200,
    });
  } else {
    return res.status(404).json({ msg: "Usuario o contraseña incorrecta" });
  }

  return res.status(200).json({
    user: findMatchUser,
    token,
  });
};

export const findUserToken = (req, res) => {
  return res.status(200).json({ ok: true, user: req.decode });
};
