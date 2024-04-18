import express from 'express';
import db from '@repo/db/client'
const app = express();

app.post('/hdfcwebhook', async (req, res)=>{
    const paymentInfo:{
        token: string,
        userId: string,
        amount: string
    } = {
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount 
    }
    
    try{
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
                    }
                }
            }),

            db.onRampTransaction.update({
                where:{
                    token: paymentInfo.token
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
                    },
                    status: 'Success'
                }
            })
        ])

        res.json({
            message: 'Captured'
        })

    }catch(e){
        console.error(e)
        res.status(411).json({
            message: 'Error while processing webhook'
        })
    }
})

app.listen(3003);