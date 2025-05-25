"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("./application/web");
web_1.web.listen(3000, () => {
    console.log(`Server listen on http://localhost:3000}`);
});
