require("dotenv").config();
const app = require("./src/server");
require("./src/databases")

app.listen(app.get('port'), () => {
    console.log("Server on port:" + app.get("port"));
})