import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../db/index.js";
import dotenv from "dotenv";
import passport from "passport";

const router = express.Router();

// Post | create sign up route
router.post("/signup", async (req, res) => {
  try {
    const foundUser = await prisma.user.FindFirst({
      where: {
        username: req.body.username,
      },
    });
    if (foundUser) {
      res.status(401).json({
        success: false,
        message: "User already exist",
      });
    } else {
      // hashing password
      try {
        const hashPassword = await argon2.hash(req.body.password);
        const newUser = await prisma.user.create({
          data: {
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
          },
        });

        if (newUser) {
          res.status(201).json({
            success: true,
            message: "User successfully created",
          });
        } else {
          res.status(500).json({
            success: false,
            message: "User was not created. Please create a account",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "User was not created. Something happened",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// Post | create login route
router.post("/login", async (req, res) => {
  try {
    const foundUser = await prisma.user.FindFirst({
      where: {
        username: req.body.username,
      },
    });

    if (foundUser) {
      try {
        const verifyPassword = await argon2.verify(
          foundUser.password,
          req.body.password
        );

        if (verifyPassword === true) {
          const token = jwt.sign(
            {
              id: foundUser.id,
              username: foundUser.username,
              email: founderUser.email,
            },
            process.env.SECRET_KEY
          );

          res.status(200).json({
            success: true,
            token: token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Incorrect username or password",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// Post | create logout route
router.post("/logout", async (req, res) => {});

// Delete | delete user
router.delete("/deleteuser", async (req, res) => {
  try {
  } catch (error) {}
});

// Edit | update user
router.put("/edituser", async (req, res) => {});

import { Strategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";

dotenv.config()

export default function jwtStrategy(passport) {
    passport.us(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JASONKEY
        }, function (payload, done){
            try {
                return done(null, { 
                    username: payload.username, 
                    id: payload.id,
                    email: payload.email,
                    display
                })
            } catch (e) {
                return done(e, null)
            }
        })
    )
}