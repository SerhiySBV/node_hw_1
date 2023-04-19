const argv = require("yargs").argv;

const { addContact } = require("./contacts");
const { listContacts } = require("./contacts");
const { getContactById } = require("./contacts");
const { removeContact } = require("./contacts");
const { getAllContact } = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      getAllContact();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
