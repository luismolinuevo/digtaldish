import express from  "express"
import prisma from "../db/index.js"
import passport from "passport"

const router = express.Router()

// Create a post at /
router.post("/", passport.authenticate("jwt", { session: false, }), async (req, res) => {
    try {
        const newPost = await prisma.post.create({
            data: {
                username: req.user.userName,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                userId: req.user.id,
            }
        })

        if (newPost) {
            const postList = await prisma.post.findMany({
              where: {
                userId: req.user.id,
              }
            })
            res.status(201).json({
              success: true,
              message: "Post created",
              post: newPost,
              postList
            })
          } else {
            res.status(400).json({
              success: false,
              message: "Post was not created"
            })
          }
        } catch (e) {
          console.log(e)
          res.status(400).json({
            success: false,
            message: "Something went wrong"
          })
    }
})

// Get all post
router.get("/", async (req, res) => {
    try {
      const allPost = await prisma.post.findMany({
      })
  
      if (allPost) {
        res.status(200).json({
          success: true,
          message: "all post fetch!",
          post: allPost
        })
      } else {
        res.status(400).json({
          success: false,
          message: "Something went wrong!"
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        success: false,
        message: "could not get any post!"
      })
    }
  })

//   Get post by id
router.get("/:postId", async (req, res) => {
    console.log(req.params.postId);
    try {
      const getPostbyId = await prisma.post.findFirst({
        where: {
          id: parseInt(req.params.postId)
        }
      })
  
      if (getPostbyId) {
        res.status(200).json({
          success: true,
          message: "successfully fetched post by id!",
          post: getPostbyId
        })
      } else {
        res.status(400).json({
          success: false,
          message: "something went wrong, could not fetch data"
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        success: false,
        message: "Something went wrong, sorry!"
      })
    }
  })

//   Get post by an user
// router.get("/user/:userId", async function (req, res) {
//     const userId = parseInt(req.params.userId);
//     try {
  
//       const getPost = await prisma.post.findMany({
//         where: {
//           userId: userId,
//         },
//       });
  
//       res.status(200).json({
//         sucess: true,
//         getPost,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   });


// Delete a post
router.delete("/:postId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      const deletePost = await prisma.post.deleteMany({
        where: {
          userId: req.user.id,
          id: parseInt(req.params.postId),
        },
      })
      if (deletePost) {
        const newPost = await prisma.post.findMany({
          where: {
            userId: req.user.id,
          },
        })
        res.status(200).json({
          success: true,
          message: "Post was successfully deleted!",
          postList: newPost
        })
      } else {
        res.status(400), json({
          message: "Something went wrong, post could not be deleted!"
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        success: false,
        message: "Something went wrong!"
      })
    }
  })


// User can edit their post
router.put("/:postId", passport.authenticate("jwt", { session: false, }), async (req, res) => {
    // console.log(req.params.id, typeof req.params.id, req.user.id, typeof req.user.id)
    try {
      const updatePost = await prisma.post.updateMany({
        where: {
          userId: req.user.id,
          id: parseInt(req.params.postId)
        },
        data: {
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
        },
      })
  
      if (updatePost) {
        const postList = await prisma.post.findMany({
          where: {
            userId: req.user.id,
          }
        })
        res.status(200).json({
          success: true,
          message: "Post information was updated",
          postList
        })
      } else {
        res.status(400).json({
          success: false,
          message: "Post not updated. Something failed."
        })
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({
        success: false,
        message: "Something went wrong"
      })
    }
  })


export default router

  