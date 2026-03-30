const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized. Please login.' });
  }
};

const studentMiddleware = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'student') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Student access only.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin access only.' });
  }
};

module.exports = {
  authMiddleware,
  studentMiddleware,
  adminMiddleware,
};
