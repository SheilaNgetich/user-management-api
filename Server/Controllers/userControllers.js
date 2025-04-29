import db from "../Database/database.js";

//Create a user
export const createUser = (req,res)=>{
    //getting the name from the request body
    const {name} = req.body;
    const date_added= new Date();

    // Data validation
    if (!name) {
        return res.status(400).json({ error: "Name required" });
    }

    //Query to add name into the db
    const query = "INSERT INTO users (name,date_added) VALUES (?,?)"
    
    //data validation
    if(!name){
        return res.status(400).json({error: "Name required"});
    }
    // Executing the database query
    db.query(query,[name,date_added],(err,results)=>{
        if(err){
            console.error("Error while inserting user's details");
            res.status(500).json({message:"A problem has been encountered while adding a user"})
        }
        return res.status(201).json({
            id : results.insertId,
            name: name,
            date_added: date_added
        });
    });
    
    };


// Get all users
export const getAllUsers = (req,res)=>{
    //Query to get data from the db
    const query = "SELECT * FROM users";
    // Executing the database query
    db.query(query,(err,results)=>{
        if(err){
            console.error("Error selecting all from the db",err);
            res.status(500).json({message: "A problem has been encountered while viewing users"});
        }
        // Format date in a readable way
        results.forEach(user => {
            user.date_added = user.date_added.toLocaleDateString(); // Convert to a readable date format
        });
        
        res.status(200).json(results);
    });
};


// Searching for a user
export const searchUser = (req,res)=>{
    const {name} = req.params;
    //Query to get data from the db
    const query = "SELECT * FROM users WHERE name LIKE ?";
    const searchPattern = `%${name}%`;
    //data validation
    if(!name){
        console.error("Error while searching for a name");
        res.status(400).json({message: "Kindly insert a name"});
    }
    // Executing the database query
    db.query(query,[searchPattern],(err,results)=>{
        if(err){
            console.error("Error while searching for a name",err);
            res.status(500).json({message: "A problem has been encountered while searching for a user"});
        }
        // Simple way to format the date in a readable way
        results.forEach(user => {
            user.date_added = user.date_added.toLocaleDateString(); // Convert to a readable date format
        });
        res.status(200).json(results);
    });
};


// Update a user's details
export const updateUser =(req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    //Query to get data from the db
    const query = "UPDATE users SET name = ? WHERE id = ?";
    // Executing the database query
    db.query(query, [name, id], (err, results) => {
        if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({ message: "A problem has been encountered while updating the user" });
        }
        res.status(200).json({ message: "User updated successfully", id, name });
    });
};


// Delete a user
export const deletePatient = (req, res) => {
    const { id } = req.params;
    
    // Query to delete data from the db
    const query = "DELETE FROM users WHERE id = ?";
    
    // Executing the database query
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error while deleting user:", err);
            return res.status(500).json({ message: "A problem has been encountered while deleting a user" });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return res.status(200).json({ message: "User deleted successfully" });
    });
};