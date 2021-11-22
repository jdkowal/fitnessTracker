const router = require('express').Router();
const Workout = require('../models/workout.js');


// * Add exercises to the most recent workout plan. //put

// * Add new exercises to a new workout plan. //post 

// * View the combined weight of multiple exercises from the past seven workouts on the `stats` page. //get 

// * View the total duration of each workout from the past seven workouts on the `stats` page. //get //.aggregate asking for the summary of things 

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{
        $addField: {
            totalDuration: {
                $sum: '$exercises.duration',
            },
        },
    },]
        .sort({ _id: -1 })
        .limit(7)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        })
    )
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            },
        },
    ])
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        {
            $push: {
                exercises: body
            }
        },
        {
            //run validater 
            new: true, runValidators: true,
        })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

// router.delete("/api/workouts", ({ body }, res) => {
//     Workout.findByIdAndDelete(body.id)
//         .then((dbWorkout) => {
//             res.json(dbWorkout);
//         })
//         .catch((err) => {
//             res.json(err);
//         });
// });

module.exports = router;