const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidato");
const { readFile } = require("fs");
const { error } = require("console");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// Contact list

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

async function getAllContact() {
  const contacts = await listContacts();

  contacts
    ? console.log(contacts, chalk.greenBright("Success!"))
    : console.log(chalk.redBright("Somthink went wrong!"));
}

// Contacts update

function updateContacts(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
}

// Add contact

async function addContact(name, email, phone) {
  const data = { name, email, phone };
  const result = dataValidator(data);
  const contacts = await listContacts();

  if (result.error) {
    console.log(chalk.red(`${result.error.details[0].message}`));
    return;
  }

  const addedContact = { name: name, email: email, phone: phone, id: nanoid() };
  contacts.push(addedContact);
  await updateContacts(contacts);
  console.log(
    addedContact,
    chalk.greenBright("Contact was successfully added!")
  );
}

// Get contact by ID

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    console.log(
      chalk.redBright(`"No contact with id:${contactId} is not found!"`)
    );
    return;
  }
  console.log(
    contactById,
    chalk.greenBright("Contact was successfully finded!")
  );

  return contactById;
}

// Remove contact

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    console.log(chalk.redBright(`Contact with id:${contactId} is not found!`));
    return;
  }
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  updateContacts(newContacts);
  console.log(chalk.greenBright("Contact has  been successfully deleted!"));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  getAllContact,
};
