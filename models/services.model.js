require("../app")(app, db);

const Services = function(services) {
    this.userId = services.userId;
    this.type = services.type;
    this.value = services.value;
    this.reaction = services.reaction;
    this.reaction_arg = services.reaction_arg;
};

// Services.create = (newService, result) => {
//     sql.query("INSERT INTO services SET ?", newService, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         console.log("created services: ", {userId: res.insertId, ...newService});
//         result(null, {userId: res.insertId, ...newService});
//     });
// };

Services.findById = (userId, result) => {
    db.query(`SELECT * FROM services WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found services: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};

// Services.updateByUserId = (userId, value) => {
//     sql.query(
//         "UPDATE services SET value = ? WHERE userId = ?", 
//         [services.value, services.userId],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }
//             if (res.affectedRows == 0) {
//                 result({kind: "not_found"}, null);
//                 return;
//             }
//             console.log("updated services: ", {userId: userId, ...services});
//             result(null, {userId: userId, ...services});
//         }
//     );
// };

// Services.removeByUserId = (userId, result) => {
//     sql.query("DELETE FROM services WHERE userId = ?", userId, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }
//         if (res.affectedRows == 0) {
//             result({kind: "not_found"}, null)
//         }
//     });
// };

module.exports = Services;