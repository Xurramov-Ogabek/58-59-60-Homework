export class BaseController {
	constructor(model) {
		console.log(model);

		this.model = model;
	}

	async getAll(req, res, next) {
		try {
			const data = await this.model.find();
			res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async getById(req, res, next) {
		try {
			const id = req.params.id;
			const data = await this.model.findById(id);
			if (data) {
				res.json(data);
			} else {
				res.status(404).json({ error: "Yozuv topilmadi" });
			}
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			console.log("model", this);

			const newData = await new this.model(req.body);
			await newData.save();
			res.status(201).json(newData);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const id = req.params.id;
			const updated = await this.model.findByIdAndUpdate(id, req.body);
			if (updated) {
				res.json(updated);
			} else {
				res.status(404).json({ error: "Yozuv topilmadi" });
			}
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const id = req.params.id;
			const deleted = await this.model.findByIdAndDelete(id);
			if (deleted) {
				res.status(204).send();
			} else {
				res.status(404).json({ error: "Yozuv topilmadi" });
			}
		} catch (error) {
			next(error);
		}
	}
}