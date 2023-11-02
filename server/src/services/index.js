module.exports = (model) => {
  let dbModel = model;
  return {
    async create(data) {
      try {
        let response = await dbModel.create(data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async get(filters, attributes, includes) {
      try {
        let response = await dbModel.findOne({
          where: filters,
          attributes: attributes,
          include: includes,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getAll() {
      try {
        let response = await dbModel.findAll({});
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getMany(filters, attributes, includes) {
      try {
        let response = await dbModel.findAll({
          where: filters,
          attributes: attributes,
          include: includes,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },

    async delete(filters) {
      try {
        let response = await dbModel.destroy({
          where: filters,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
  };
};
