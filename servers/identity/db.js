import { faker } from "@faker-js/faker"
import fs from "fs"

import { MOCK_FILE, MOCK_USERS } from "./config.js"

const data = {
  users: [
    {
      first: "User",
      last: "Dalvit",
      phone: "1-111-111-1111",
      email: "user@dalv.it",
      password: "user",
      admin: false,
    },
    {
      first: "Admin",
      last: "Dalvit",
      phone: "2-222-222-2222",
      email: "admin@dalv.it",
      password: "admin",
      admin: true,
    },
    ...[...Array(MOCK_USERS)].map(mockUser),
  ],
}

fs.writeFileSync(MOCK_FILE, JSON.stringify(data, null, 2), "utf-8")

//#region
function mockUser() {
  return {
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    admin: faker.datatype.boolean(),
  }
}
//#endregion
