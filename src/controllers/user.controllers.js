import * as repo from "../repositories/user.repo.js";

export const createUser = async (req, res, next) => {
  try {
    const { userId, name, email, password, dob } = req.body;
    console.log("Received request to create user with body:", req.body);

    if (!userId || !name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const id = await repo.createUser({ userId, name, email, password, dob });

    res.status(201).json({ message: "User created", id });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "User already exists" });
    }
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await repo.findAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await repo.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    console.log("Email query parameter:", email);
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email query parameter is required" });
    }
    const user = await repo.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updated = await repo.updateUser(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated" });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await repo.deleteUser(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
