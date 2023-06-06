import express from  "express"
import prisma from "../db/index.js"
import passport from "passport"

const router = express.Router()

// Create a post at /
router.post("/", passport.authenticate("jwt", { session: false, }), async (req, res) => {
    try {
      console.log(req.user);
        const newPost = await prisma.post.create({

            data: {
                userName: req.user.userName,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                userId: req.user.id,
                title: req.body.title,
                color: req.body.color,
                subcategory: req.body.subcategory,
                size: req.body.size,
                location: req.body.location,
                shippingFees: req.body.shippingFees,
                carrier: req.body.carrier,
                condition: req.body.condition,
                endTime: req.body.endTime,
                startTime: req.body.startTime,
                type: req.body.type
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
// router.get("/:postId", async (req, res) => {
//     console.log(req.params.postId);
//     try {
//       const getPostbyId = await prisma.post.findFirst({
//         where: {
//           id: parseInt(req.params.postId)
//         }
//       })
  
//       if (getPostbyId) {
//         res.status(200).json({
//           success: true,
//           message: "successfully fetched post by id!",
//           post: getPostbyId
//         })
//       } else {
//         res.status(400).json({
//           success: false,
//           message: "something went wrong, could not fetch data"
//         })
//       }
//     } catch (error) {
//       console.log(error)
//       res.status(400).json({
//         success: false,
//         message: "Something went wrong, sorry!"
//       })
//     }
//   })
router.get("/:postId", async (req, res) => {
  console.log(req.params.postId);
  try {
    const postId = parseInt(req.params.postId);

    // Retrieve the post by ID
    const getPostById = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (getPostById) {
      // Retrieve the highest bid for the post
      const highestBid = await prisma.bid.findFirst({
        where: {
          postId,
        },
        orderBy: {
          price: "desc",
        },
      });

      // Retrieve the count of bids for the post
      const bidCount = await prisma.bid.count({
        where: {
          postId,
        },
      });

      res.status(200).json({
        success: true,
        message: "Successfully fetched post by ID!",
        post: {
          ...getPostById,
          highestBid: highestBid ? highestBid.price : null,
          bidCount,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong, could not fetch data.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong, sorry!",
    });
  }
});


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
//         success: true,
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
    // console.log(req.params.id, typeof request.params.id, request.user.id, typeof request.user.id)
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
            color: req.body.color,
            subcategory: req.body.subcategory,
            size: req.body.size,
            location: req.body.location,
            shippingFees: req.body.shippingFees,
            carrier: req.body.carrier,
            condition: req.body.condition,
            endTime: req.body.endTime,
            startTime: req.body.startTime
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

  