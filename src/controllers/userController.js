const User = require('../models/User');

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching profile'
    });
  }
};

// @desc    Get all users list (helpful for testing)
// @route   GET /api/users
// @access  Private
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching users'
    });
  }
};

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    // If changing email, ensure it's not taken by another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'This email is already in use by another account'
        });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }
      user.password = password;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating user'
    });
  }
};

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: `User with ID ${id} deleted successfully`
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting user'
    });
  }
};

module.exports = { getProfile, getAllUsers, updateUser, deleteUser };
