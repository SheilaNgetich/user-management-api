import express from "express";

import{
    createUser,
    getAllUsers,
    searchUser,
    updateUser,
    deletePatient
} from "../Controllers/userControllers.js"

const router = express.Router();

// Routes for user CRUD operations
router.post('/', createUser); // create a new user
router.get('/', getAllUsers); // get all users
router.get('/search/:name', searchUser); // search users by name
router.patch('/:id', updateUser); // update a user's details
router.delete('/:id', deletePatient); // delete a user

export default router;