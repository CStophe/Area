module.exports = (app, db) => {
    const services = require("../controllers/services.controller");

    // app.post("/services/", services.create);
    app.get("/services/:userId", services.findOne);
    // app.put("/services/:userId", services.upadate);
    // app.delete("/services/:userId", services.delete);
};