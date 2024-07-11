const jwt = require('jsonwebtoken');
const authCtrl = {};

authCtrl.verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(200).json({ 'status': '0', 'msg': 'Unauthorized request.' });
    } else {
        var arrayTexto = req.headers.authorization.split(' ');
        var token = arrayTexto.length >= 2 ? arrayTexto[1] : null;
        if (token == null) {
            res.json({ 'status': '0', 'msg': 'Unauthorized request.' });
        } else {
            try {
                const payload = jwt.verify(token, "secretkey");
                req.userId = payload.id;
                next();
            } catch (error) {
                res.json({ 'status': '0', 'msg': 'Unauthorized request.' });
            }
        }
    }
}

module.exports = authCtrl;
