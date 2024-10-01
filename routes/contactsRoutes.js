const express = require('express');

const router = express.Router();

const {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact
} = require('../controllers/contactController');
const ValidateToken = require('../middleware/ValidateToken');

//this is the one way to define the controller and another way if the routes is same only http method is 

// different then we can add like
router.use(ValidateToken);

router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);



// router.route('/').get(getContacts);

// router.route('/').post(createContact);

// router.route('/:id').get(getContact);

// router.route('/:id').put(updateContact);

// router.route('/:id').delete(deleteContact);

module.exports = router;