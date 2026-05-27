import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: "6a15bd23077abdf4a91d1352",
    email: "bixebo2767@nuitx.com"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

setTimeout(()=> {
    try {
    const {id, email} = jwt.verify(token, JWT_SECRET);
    console.log({
        id,
        email,
    });
    // const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTViZDIzMDc3YWJkZjRhOTFkMTM1MiIsImVtYWlsIjoiYml4ZWJvMjc2N0BudWl0eC5jb20iLCJpYXQiOjE3Nzk4MTAzMTQsImV4cCI6MTc3OTg5NjcxNH0.w4NTPak5EG24scr2ejUkRWKlqQLEK-fiH7eu85mTH2K";
    // jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error);
}
}, 3000);