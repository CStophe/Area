const Service = require("../models/services.model");

// exports.create = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can't be empty!"
//         });
//     }
//     const service = new Service({
//         userId: req.body.userId,
//         type: req.body.type,
//         value: req.body.value,
//         reaction: req.body.reaction,
//         reaction_arg: req.body.reaction_arg
//     });
//     Service.create(service, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Somme error occured"
//             });
//         else res.send(data);
//     });
// };

exports.findOne = (req, res) => {
    Service.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Service with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Service with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// exports.update = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({
//             message : "Content can't be empty"
//         });
//     }
//     Service.updateByUserId(
//         req.params.userId,
//         new Service(req.body),
//         (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.status(404).send({
//                         message: `Not found Service with id ${req.params.userId}.`
//                     });
//                 } else {
//                     res.status(500).send({
//                         message: "Error updating Service with id " + req.params.userId
//                     });
//                 }
//             } else res.send(data);
//         }
//     );
// };

// exports.delete = (req, res) => {
//     Service.removeByUserId(req.params.userId, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Service with id ${req.params.userId}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Could not delete Service with id " + req.params.userId
//                 });
//             }
//         } else res.send({message: `Service was deleted successfully!`});
//     });
// };