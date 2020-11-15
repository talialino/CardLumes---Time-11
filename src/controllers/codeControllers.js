const fs = require('fs');

const readUser = () => {
    const content = fs.readFileSync('./src/models/user.json', 'utf-8');
    return JSON.parse(content);
};

const readCode = () => {
    const content = fs.readFileSync('./src/models/code.json', 'utf-8');
    return JSON.parse(content);
};

const writeCode = (content) => {
    const updateFile = JSON.stringify(content);
    fs.writeFileSync('./src//models/code.json', updateFile, 'utf-8');
};

module.exports = {
    async coding(req, res) {
        const { code } = req.body;
        const { cpf } = req.params;

        const readingUser = readUser();

        const readingCode = readCode();

        const selectCpf = await readingUser.findIndex(
            (validation) => validation.cpf === cpf
        );

        try {
            if (!readingUser[selectCpf]) {
                return res.status(409).send({ Error: 'Invalid CPF' });
            }

            readingCode.push({ cpf, code });

            writeCode(readingCode);

            const resul = {
                Mensagem: 'Sucesso!',
                cpf,
                código: code,
            };

            res.status(200).send(resul);
        } catch (err) {
            res.status(304).send(err, 'User not exist');
        }
        return res;
    },
};

// cpf
// code
// points
