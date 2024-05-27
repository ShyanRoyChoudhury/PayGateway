import express, { Request, Response } from "express";
import prisma from "@repo/db";
import cors from 'cors'
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/login', async(req:Request, res:Response)=>{
  const number:string = req.body.number;
  console.log(req.body)
  if(!number){
    res.status(400).json({
      error: "Bad Request"
    })
    return;
  }

  try{
    const user = await prisma.user.findFirst({
    where: {
        number
    }
  });
  console.log(user)
    if(!user){
      res.status(401).json({
        error: 'User not found'
      });
      return;
    }
    res.json({
      redirectURL: "/paymentpage"
    })
  }catch(e){
    console.error(e);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
})

app.post("/hdfcwebhook", async (req: Request, res: Response) => {
  if (!req.body.token || !req.body.amount || !req.body.userId) {
    res.status(400).json({
      error: "Bad Request",
    });
    return;
  }
  const paymentInfo: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };
  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: Number(paymentInfo.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
        },
      }),

      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003, () => {
  console.log("server running on port 3003");
});
