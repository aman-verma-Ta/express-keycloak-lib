const service = require('../services/crudService');
const logger = require('../utils/logger');

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAll(req.params.model);
    res.json(data);
  } catch (error) {
    logger.error('Error in controller (getAll):', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await service.getById(req.params.model, req.params.id);
    if (!data) return res.status(404).json({ error: 'Record not found' });
    res.json(data);
  } catch (error) {
    logger.error('Error in controller (getById):', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await service.create(req.params.model, req.body);
    res.status(201).json(data);
  } catch (error) {
    logger.error('Error in controller (create):', error);
    res.status(500).json({ error: 'Failed to create record' });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await service.update(req.params.model, req.params.id, req.body);
    res.json(data);
  } catch (error) {
    logger.error('Error in controller (update):', error);
    res.status(500).json({ error: 'Failed to update record' });
  }
};

exports.delete = async (req, res) => {
  try {
    await service.delete(req.params.model, req.params.id);
    res.sendStatus(204);
  } catch (error) {
    logger.error('Error in controller (delete):', error);
    res.status(500).json({ error: 'Failed to delete record' });
  }
};
