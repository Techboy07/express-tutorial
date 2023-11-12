import { authRegisterController } from "../../controllers/auth.js";

import user from "../../database/schemas/user.js";

const req = {
  body: {
    email: "fake_email",
    password: "fake_password",
  },
};

it("should send a status code of 400 when user exists", async () => {
  user.findOne.mockImplementationOnce(() => {
    return {
      email: "email",
      password: "password",
      id: "1",
    };
  });
  await authRegisterController(req);
});
