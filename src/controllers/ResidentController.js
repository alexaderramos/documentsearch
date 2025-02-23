const Resident = require('../models/Resident');

class ResidentController {
    static async getAllResidents(req, res) {
        try {
            const residents = await Resident.findAll();
            res.json(residents);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createResident(req, res) {
        try {
            const newResident = await Resident.create(req.body);
            res.status(201).json(newResident);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateResident(req, res) {
        try {
            const [updated] = await Resident.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedResident = await Resident.findByPk(req.params.id);
                res.json(updatedResident);
            } else {
                res.status(404).json({ message: 'Residente no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteResident(req, res) {
        try {
            const deleted = await Resident.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.json({ message: 'Residente eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Residente no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getResidentById(req, res) {
        try {
            const resident = await Resident.findByPk(req.params.id);
            if (resident) {
                res.json(resident);
            } else {
                res.status(404).json({ message: 'Residente no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ResidentController; 