const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: ()=> new Date(),
    },
    exercises: [
        {
        type: {
            type: String,
            trim: true,
            required: "exercise type required",
        }, 
        name: {
            type: String,
            trim: true,
            required: "workout name required",
        },
        duration: {
            type: Number,
            default: 0,
            required: "enter an exercise duration in minutes"
        },
        weight: {
            type: Number,
            default: 0,
        },
        reps: {
            type: Number,
            default: 0,
        },
        sets: {
            type: Number,
            default: 0,
        }
    }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
