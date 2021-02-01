`use strict`;

/** Static messages **/
const staticMessages = {
  Unauthorized: "Unauthorized!",
  ErrorUpdating: "Error Updating",
  InvalidPassword: "Invalid password",
  AccountNotFound: "Account not found",
  LoginSuccessful: "Success! You are Successfully Login",
  MongodbConnectionMessage: "Mongodb connected!",
  MongodbErrorConnection: "DB Connection Error!",
  ServerListenError: "Server listen error!",
  ServerSuccess: "Server running!",
  OppsSomethingBadHappen: "Opps! Something bad happened",
  AuthorizationToken: `Authorization token to validate the user. Add bearer prifix with token ("bearer token")`,
  
  // Dynamic Messages
  UserUpdated: (Value) => `${Value} successfully updated.`,
  AlreadyTaken: (Value) => `Login ${Value} has already been taken`,
  UserCreated: (Value) => `${Value} is Successfully Created`,
  AdminUserUpdated: (Value) => `${Value} successfully updated.`,
};
module.exports = staticMessages;
`use strict`;
