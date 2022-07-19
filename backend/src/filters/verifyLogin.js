const jwt = require('jsonwebtoken');
const secret = require('../credentials');
const connection = require('../connection');

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(404).json('Token não informado.');
    }

    try {

        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, secret.secretKey);

        const query = "select * from usuarios where id = $1";
        const { rows, rowCount } = await connection.query(query, [id]);


        if (rowCount === 0) {
            return res.status(404).json('Usuário não encontrado.');
        }

        const { senha, ...usuario } = rows[0];

        req.user = usuario;

        next();

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = verifyLogin;