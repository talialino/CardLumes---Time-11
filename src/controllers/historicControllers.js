const fs = require('fs');

const readUser = () => {
    const content = fs.readFileSync('./src/models/user.json', 'utf-8');
    return JSON.parse(content);
};

const readHistoric = () => {
    const content = fs.readFileSync('./src/models/historic.json', 'utf-8');
    return JSON.parse(content);
};

const writeHistoric = (content) => {
    const updateFile = JSON.stringify(content);
    fs.writeFileSync('./src//models/historic.json', updateFile, 'utf-8');
};

module.exports = {
    async adding(req, res) {
        const { historic } = req.body;
        const { cpf } = req.params;

        const readingUser = readUser();

        const readingHistoric = readHistoric();

        const selectCpf = await readingUser.findIndex(
            (validation) => validation.cpf === cpf
        );

        try {
            if (!readingUser[selectCpf]) {
                return res.status(409).send({ Error: 'Invalid CPF' });
            }
            readingHistoric.push({ cpf, historic });

            writeHistoric(readingHistoric);

            const resul = {
                Mensagem: 'Sucesso!',
                cpf,
                historico: historic,
            };

            res.status(200).send(resul);
        } catch (err) {
            res.status(304).send(err, 'User not exist');
        }
        return res;
    },
    async find(req, res) {
        const { cpf } = req.params;

        const readingHistoric = readHistoric();

        const selectCpf = readingHistoric.findIndex(
            (validation) => validation.cpf === cpf
        );
        try {
            if (!readingHistoric[selectCpf]) {
                return res.status(409).send({ Error: 'Invalid CPF' });
            }

            const resul = {
                Lista: readingHistoric.map((date) => {
                    return {
                        Tarefa: date.historic,
                    };
                }),
            };

            res.status(302).send(resul);
        } catch (err) {
            res.status(404).send(err, 'Not find');
        }
        return res;
    },
};
