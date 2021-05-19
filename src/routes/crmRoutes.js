import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController";

import { login, register, loginRequired } from "../controllers/userController";

const routes = (app) => {
  app
    .route("/contacts")
    .get(
      (req, res, next) => {
        // Middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      loginRequired,
      getContacts
    )

    // POST endpoint
    .post(loginRequired, addNewContact);

  app
    .route("/contact/:contactId")
    // GET specific Contact
    .get(loginRequired, getContactWithID)

    // PUT request
    .put(loginRequired, updateContact)

    // DELETE request
    .delete(loginRequired, deleteContact);

  // Registration route
  app.route("/auth/register").post(register);

  // Login route
  app.route("/login").post(login);
};

export default routes;
