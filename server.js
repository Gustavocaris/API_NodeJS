import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


const app = express();
app.use(express.json());


const users = [];

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            // caminho de onde estou recebendo essas minhas infos
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    users.push(req.body)

    res.status(201).json(req.body);
});

app.get('/usuarios', async (req, res) => {

    if(req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
        
    } else {
        users = await prisma.user.findMany()
    }


    const users = await prisma.user.findMany()


    res.status(200).json(users)
});

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            // caminho de onde estou recebendo essas minhas infos
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    users.push(req.body)

    res.status(201).json(req.body);
});


app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuario Deletado com Sucesso"})
})



app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});











// GustavoCloud
// 9lHO2F1RgVF8dwTM