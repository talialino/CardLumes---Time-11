const fs = require('fs');

const readFile = () => {
    const content = fs.readFileSync('./src/models/user.json', 'utf-8');
    return JSON.parse(content);
};

module.exports = {
    // Aqui viria um put para colocar os dados da API do CPFL no json
    async show(req, res) {
        const { cpf } = req.params;
        const reading = readFile();
        const selectCpf = await reading.findIndex(
            (validation) => validation.cpf === cpf
        );

        try {
            if (!reading[selectCpf]) {
                return res.status(409).send({ Error: 'Invalid CPF' });
            }

            res.status(302).send(reading);
        } catch (err) {
            res.status(404).send(err, 'User not exist');
        }
        return res;
    },
};
