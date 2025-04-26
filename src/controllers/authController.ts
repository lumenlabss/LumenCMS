import { Request, Response } from "express";
import { createUser, validateUserCredentials } from "../services/authService";
import { getUserByEmail } from "../services/userService";

// Handle user registration
export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  // Check if the user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Create the new user
  await createUser(email, username, password);
  res.status(201).json({ message: "User registered successfully!" });
};

// Handle user login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate user credentials
  const isValid = await validateUserCredentials(email, password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  // Successfully authenticated
  res.status(200).json({ message: "Login successful!" });
};
