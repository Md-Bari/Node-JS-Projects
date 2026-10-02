const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'supersecretjwtkey_change_in_production_12345'
      );

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'The user belonging to this token no longer exists'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token is invalid or expired'
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no Bearer token provided in Authorization header'
    });
  }
};

module.exports = { protect };
