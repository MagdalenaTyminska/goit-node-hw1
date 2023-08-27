const uniqid = require("uniqid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);

    if (contactById) {
      console.log("Found contact: ", contactById);
    } else {
      console.log(`No contacts for id: '${contactId}'.`);
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const checkContact = contacts.find((contact) => contact.id === contactId);

    if (checkContact) {
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      console.log("Contact has been removed.");
    } else {
      console.log(`No contacts for id: ${contactId}.`);
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const newContact = {
      id: uniqid(),
      name,
      email,
      phone,
    };

    const checkContact = contacts.find(
      (contact) => contact.phone === phone || contact.email === email
    );

    if (checkContact) {
      console.log(
        `Contact '${newContact.name}: ${newContact.phone}, ${newContact.email}' is on your contact list already.`
      );
    } else {
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      console.log(
        `New contact '${newContact.name}: ${newContact.phone}, ${newContact.email}' added to contact list.`
      );
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
