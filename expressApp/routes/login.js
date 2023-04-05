var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

// Middleware pour vérifier le JWT
function verifyJWT(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(403).send('Forbidden');
    }
  }
  
// Route d'authentification
router.post('/co', (req, res) => {
    // Vérifier les identifiants de l'utilisateur
    const user = {
        id: 1,
        email: 'user@example.com'
    };
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json( { title: 'Express' });
});

router.get('/yo', function(req, res, next) {
  res.render('index', { title: 'yooooooo' })
});

module.exports = router;
