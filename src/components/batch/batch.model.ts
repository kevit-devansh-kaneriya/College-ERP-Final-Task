import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Batch Schema for DB

const batchSchema = new Schema({
	year: {
		type: Schema.Types.Number,
		required: true,
		unique: true,
	},
	totalSeats: {
		type: Schema.Types.Number,
		required: true,
		default: 0,
	},
	branches: [
		{
			name: {
				type: Schema.Types.String,
				required: true,
			},
			totalStudentsIntake: {
				type: Schema.Types.Number,
				required: true,
			},
			totalStudents: {
				type: Schema.Types.Number,
				required: true,
				default: 0,
			},
			availableIntake: {
				type: Schema.Types.Number,
				required: true,
				default: function () {
					return this.totalStudentsIntake;
				},
			},
		},
	],
});

// eslint-disable-next-line func-names
batchSchema.pre('save', async function (next) {
	try {
		let totalSeats = 0;
		if (this.isModified('branches')) {
			this.branches.forEach(
				(branch) => (totalSeats += branch.totalStudentsIntake),
			);
			this.totalSeats = totalSeats;
		}
		next();
	} catch (err) {
		const statusCode = 500; 
        const errorMessage = 'SAVING_BATCH_UNHANDLED_IN_DB'; 
        throw { statusCode, message: errorMessage, originalError: err }; 
	}
});

module.exports = model('Batch', batchSchema);
