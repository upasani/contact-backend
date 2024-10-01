const Contact = require('../model/contactModel')

// @desc get all contact
// route GET /api/contacts
// public access

const getContacts = async (req, res) => {

    const contacts = await Contact.findById(req.user.id);
    console.log("the contacts is",contacts);

    res.status(200).json(contacts)
}

// @desc crate contact
// route POST /api/contacts
// public access 

const createContact = async (req, res) => {

    try {
        const {
            name,
            email,
            phone
        } = req.body

        if (!name || !email || !phone) {
            throw new Error('All fields are mandotary')
        }
        console.log("the req user is",req.user.id);
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id
        });
        res.status(201).json({
            msg: "contact create succesfully",
            contact
        })
    } catch (err) {

        res.status(400).json({ error: err.message });
    }

}

// @desc update contact
// route PUT /api/contacts/:id
// public access 

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json(contact)
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        })
    }

}

// @desc delete contact
// route DELETE /api/contacts/:id
// public access 

const deleteContact = async (req, res) => {
    console.log("the params id is", req.params.id);
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            throw new Error("Enter the valid ID")
        }
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "contact deleted succesfully"
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }

}

// @desc crate contact get single contact
// route GET /api/contacts/:id
// public access 

const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            throw new Error("Enter the valid ID")
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }

}

module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact

}