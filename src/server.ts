import { app } from "./app";

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Stox API rodando na porta ${PORT}`);
})
