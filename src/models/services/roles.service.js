class RolesService {
  static async create(data) {
    try {
      return await DATABASE.Roles.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async findOneByCond(cond) {
    try {
      return await DATABASE.Roles.findOne({
        where: cond,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      return await DATABASE.Roles.findAll({
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findAllRoleCodes() {
    try {
      let roles = await DATABASE.Roles.findAll({
        where: {
          is_active: true,
        },
        attributes: ['role_code'],
        raw: true,
      });
      return roles.map((role) => role.role_code);
    } catch (error) {
      throw error;
    }
  }

  static async findAllByCond(cond) {
    try {
      return await DATABASE.Roles.findAll({
        where: cond,
        order: [['createdAt', 'DESC']],
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(data, Id) {
    try {
      const role = await DATABASE.Roles.findOne({ where: { id: Id } });
      if (data.display_name !== role.dataValues.display_name) {
        if (role.dataValues.role_code && typeof role.dataValues.role_code === 'string') {
          const display_name_pattern = role.dataValues.display_name
            .replaceAll(' ', '_')
            .toLowerCase();
          const new_display_name_pattern = data.display_name.replaceAll(' ', '_').toLowerCase();
          data.role_code = role.dataValues.role_code.replace(
            display_name_pattern,
            new_display_name_pattern
          );
        }
        // await DATABASE.Users.update(
        //   { role: data.role_code },
        //   { where: { role: role.dataValues.role_code } }
        // );
      }
      const updatedData = await DATABASE.Roles.update(data, {
        where: {
          id: Id,
        },
        returning: true,
        plain: true,
      });
      return updatedData[1];
    } catch (error) {
      throw error;
    }
  }

  static async deleteByCond(cond) {
    try {
      const roles = await DATABASE.Roles.findAll({
        where: cond,
        raw: true,
        attributes: ['role_code'],
      });
      for (let i = 0; i < roles.length; i++) {
        // await DATABASE.Users.update({ role: 'user' }, { where: { role: roles[i].role_code } });
        await DATABASE.Roles.destroy({
          where: {
            role_code: roles[i].role_code,
          },
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RolesService;
