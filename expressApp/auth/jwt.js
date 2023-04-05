const jwt = require('jsonwebtoken');

// Fonction pour générer un token
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
}

// Fonction pour vérifier un token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
