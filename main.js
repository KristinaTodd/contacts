let contacts = []


function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    number: form.number.value,
    emergencyContact: form.emergencyContact.checked,
  }
  contacts.push(contact)
  saveContacts()
  form.reset()
}


function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}


function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"))
  if (contactsData) {
    contacts = contactsData
  }
}


function drawContacts() {
  let contactListElement = document.getElementById("contact-list")
  let contactsTemplate = ""

  contacts.forEach(contact => {
    contactsTemplate += `
      <div class="contacts card mt-1 mb-1 ${contact.emergencyContact ? 'emergency-contact' : ''}">
      <h3>${contact.name}</h3>
      <p>
      <i class="fa fa-fw fa-phone"></i>
      ${contact.number}</p>
      <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
      </div>
      `
  })
  contactListElement.innerHTML = contactsTemplate
}


function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  if (index == -1) {
    throw new Error("Invalid Contact Id")
  }
  contacts.splice(index, 1)
  saveContacts()
}


function toggleAddContactForm() {
  document.getElementById("new-contact-form").classList.toggle("hidden")
  document.getElementById("add-btn").classList.toggle("hidden")
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()