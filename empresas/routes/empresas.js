const express = require('express');
const empresaRouter = express.Router();
const passport = require('passport');
const auth = require("../../users/auth/auth");
const async = require('async');
const Empresa = require('../models/empresa');

//**************************** USER CRUD************************************//
empresaRouter.post('/', auth, async (req, res) => {
	try {
		const empresa = {
			NIT: req.body.nit,
			nombre: req.body.nombre,
			dueño: req.body.dueño,
			horarios: req.body.horarios,
			telefono: req.body.telefono,
		};
		let newEmpresa = await Empresa.addEmpresa(empresa);
		res.status(200).json(newEmpresa);
	} catch (e) {
		res.status(400).json(e.toString());
	}
});


// Delete user
empresaRouter.delete('/', auth, async (req, res, next) => {
	try {
		const item = req.query.item;
		let response = await Empresa.deleteEmpresa(item.nit);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

// Update user, NEED TO IMPROVE
empresaRouter.put('/', auth, async (req, res, next) => {
	try {
		const updateData = req.body.updateData;

		let response = await Empresa.updateEmpresa(updateData);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}

});

// Get User
empresaRouter.get('/', auth, async (req, res, next) => {
	try {
		let response = await Empresa.getEmpresas();
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}

});



module.exports = empresaRouter;