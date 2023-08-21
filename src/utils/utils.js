const UsersService = require('../models/services/user.service');

const roleGenerator = (name) => {
  return name.replaceAll(' ', '_').toLowerCase();
};

const generateRoleCode = (parent_role, role) => {
  return (parent_role + '_' + role).replaceAll(' ', '_').toLowerCase();
};

const checkValidity = (name) => {
  return name.includes(' ') || name.includes('.');
};

const codeGenerator = async (Code) => {
  const check = await UsersService.findOneByCond({ user_code: Code });
  if (!check) {
    return Code;
  } else {
    const newCode = `${Math.random().toFixed(4).replace('0.', '')}`;
    return codeGenerator(newCode);
  }
};

module.exports = {
  roleGenerator,
  generateRoleCode,
  codeGenerator,
  checkValidity,
};
