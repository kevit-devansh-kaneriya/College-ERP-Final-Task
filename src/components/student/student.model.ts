import mongoose from 'mongoose';

const { Schema, model } = mongoose;
/**
 * Student Schema for DB
 */
const studentSchema = new Schema({
	firstName: {
		type: Schema.Types.String,
		required: true,
	},
	lastName: {
		type: Schema.Types.String,
		required: true,
	},
	emailId: {
		type: Schema.Types.String,
		required: true,
		unique: true,
	},
	address: {
		type: Schema.Types.String,
		required: true,
	},
	contactNo: {
		type: Schema.Types.Number,
		required: true,
	},
	batch: {
		type: Schema.Types.Number,
		require: true,
	},
	branch: {
		type: Schema.Types.String,
		enum: {
			values: ['CE', 'ICT', 'ME'],
			message: 'Please select correct branch',
		},
	},
	currentSemester: {
		type: Schema.Types.String,
		enum: {
			values: [
				'first',
				'second',
				'third',
				'fourth',
				'fifth',
				'sixth',
				'seventh',
			],
			message: 'Please select correct semester',
		},
		default: 'first',
	},
	attended: [
		{
			type: Date,
			required: true,
		},
	],
	notAttended: [
		{
			type: Date,
			required: true,
		},
	],
	attendence: {
		type: Schema.Types.Number,
		default: 0,
	},
});

studentSchema.pre('save', async function (next) {
	if (!this.isModified('attended') && !this.isModified('notAttended')) {
		next();
	}
	this.attendence =
		(this.attended.length /
			(this.attended.length + this.notAttended.length)) *
		100;
});

module.exports = model('Student', studentSchema);
// export default Student;
