import { Router } from "express";
import Database from "../../lib/database.js";

const route = Router();
export default (app) => {
    app.use("/expenses", route);
    /*
        description TEXT,
        totalamount REAL,
        balance REAL,
        user_id INTEGER,
        group_id INTEGER,
    */


    // GET ALL EXPENSES
    //      or
    //  'id' as a query
    // you can use any combination of the quiries to filter your request
    route.get("/", async (req, res) => {
        try {
            // Retrieve Query Details from request
            const { user_id, group_id } = req.query;
    
            // Add user_id to the filter condition
            const filterCondition = { 
                user_id: user_id ? user_id : "*",  // Include user_id in the filter
                group_id: group_id ? group_id : "*",   
            };
    
            res.json(await Database.getEntries('expenses', filterCondition));
        } catch (error) {
            res.status(500).json({ message: "Failure to retrieve EXPENSE data", error: error });
        }
    });

    route.post("/", async (req, res) => {
        try {
            // Parse Post Body
            const requestData = req.body;
            // Create Group and initialize, returns the entry ID
            const entryID = await Database.insertEntry("expenses", requestData);
    
            // Retrieve users involved in the expense
            const usersInExpense = await Database.getEntries("user_groups", { group_id: requestData.group_id });
    
            // Calculate the individual share for each user
            const individualShare = requestData.total / (usersInExpense.length - 1); // Exclude the user who is creating the expense
    
            // Create separate expense entries for each user with their individual balance
            for (const user of usersInExpense) {
                if (user.user_id !== requestData.user_id) { // Exclude the user who is creating the expense
                    const individualExpenseData = {
                        name: requestData.name,
                        notes: requestData.notes,
                        total: individualShare, // Individual share
                        balance: individualShare,
                        user_id: user.user_id,
                        group_id: requestData.group_id,
                    };
    
                    // Insert a new entry for each user
                    const individualExpense = await Database.insertEntry("expenses", individualExpenseData);

                    // Add related expense entry
                    addRelatedExpense(entryID, individualExpense.id);
    }
            }
            res.json({ id: entryID });
        } catch (error) {
            res.status(500).json({ message: "Failure to create Expense", error: error });
        }
    });

    route.put("/", async (req, res) => {
        try {
            // Parse Post Body
            const requestData = req.body;
            // Update the attached entry, need to contain "id" to find the right one
            const response = await Database.updateEntry( "expenses", requestData );
            res.json({ message: response ? "Success" : "Failure" });
        } catch (error) {
            res.status(500).json({ message: "Failure to update EXPENSE", error: error });
        }
    });

    route.delete("/", async (req, res) => {
        try {
            const requestData = req.body;

            // Check if the request data contains an "id" field
            if (!requestData.id) {
                return res.status(400).json({ message: "Bad Request: Missing 'id' field in request data" });
            }

            // Delete the entry with the specified ID
            const response = await Database.deleteEntry("expenses", requestData);

            // Check if the delete was successful
            if (response) { res.json({ message: "Success" });
            } else {
                res.status(404).json({ message: "Not Found: Entry with specified ID not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Failure to delete EXPENSE", error: error });
        }
    });


    route.post("/pay", async (req, res) => {
        try {
            const { expense_id, user_id, amount } = req.body;
    
            console.log("Received payment request with data:", { expense_id, user_id, amount });
    
            // Basic validation
            if (!expense_id || !user_id || !amount || isNaN(amount)) {
                return res.status(400).json({ message: "Invalid request data" });
            }
    
            // Retrieve the expense details
            const expense = await Database.getEntry("expenses", { id: expense_id });
    
            if (!expense) {
                return res.status(404).json({ message: "Expense not found" });
            }
    
            // Update balances
            await updateExpenseAndUserBalances(expense, user_id, amount);
    
            // Retrieve related expenses
            const relatedExpenseIds = getRelatedExpenses(expense_id);
            const relatedExpenses = await Promise.all(
                relatedExpenseIds.map((relatedExpenseId) => Database.getEntry("expenses", { id: relatedExpenseId }))
            );
    
            // Log success message
            console.log("Payment successful");
    
            res.json({ message: "Payment successful", relatedExpenses });
        } catch (error) {
            console.error("Error processing payment:", error);
            res.status(500).json({ message: "Failure to process payment", error: error.message });
        }
    });
    
    // Assuming you have a global variable to store relationships
const expenseRelationships = {};

// Helper function for updating balances
async function updateExpenseAndUserBalances(expense, user_id, amount) {
    try {
        // Update the expense balance
        const updatedExpenseBalance = expense.balance - amount;
        await Database.updateEntry("expenses", { id: expense.id, balance: updatedExpenseBalance });

        // Get related expenses using the data structure
        const relatedExpenseIds = getRelatedExpenses(expense.id);

        // Log information for debugging
        console.log("Related Expense IDs:", relatedExpenseIds);

        // Update the balances for each related expense
        for (const relatedExpenseId of relatedExpenseIds) {
            const relatedExpense = await Database.getEntry("expenses", { id: relatedExpenseId });

            // Log information for debugging
            console.log("Related Expense:", relatedExpense);

            // Update the user's balance for the expense
            if (relatedExpense.user_id === user_id) {
                const updatedUserBalance = relatedExpense.balance - amount;
                await Database.updateEntry("expenses", { id: relatedExpenseId, balance: updatedUserBalance });

                // Log information for debugging
                console.log("Updated User Balance:", updatedUserBalance);
            }

            // Update the balance of the user who created the expense
            if (relatedExpense.user_id === expense.user_id) {
                // Calculate individual share when updating creator's balance
                const individualShare = expense.total / relatedExpenseIds.length;
                const updatedCreatorBalance = relatedExpense.balance - individualShare;
                await Database.updateEntry("expenses", { id: relatedExpenseId, balance: updatedCreatorBalance });

                // Log information for debugging
                console.log("Updated Creator Balance:", updatedCreatorBalance);
            }
        }

        console.log("Balances updated successfully.");
    } catch (error) {
        console.error("Error updating balances:", error);
        throw error; // Rethrow the error to handle it at a higher level if needed
    }
}
// Function to add a related expense
function addRelatedExpense(parentExpenseId, relatedExpenseId) {
    if (!expenseRelationships[parentExpenseId]) {
        expenseRelationships[parentExpenseId] = [];
    }

    expenseRelationships[parentExpenseId].push(relatedExpenseId);
}

// Function to get all related expenses
function getRelatedExpenses(expenseId) {
    return expenseRelationships[expenseId] || [];
}

    //this works without updating creator 

    // async function updateExpenseAndUserBalances(expense, user_id, amount) {
    //     // Update the expense balance
    //     const updatedExpenseBalance = expense.balance - amount;
    //     await Database.updateEntry("expenses", { id: expense.id, balance: updatedExpenseBalance });
    
    //     // Update the user's balance for the expense
    //     const userExpense = await Database.getEntry("expenses", { user_id, group_id: expense.group_id });
    
    //     if (!userExpense) {
    //         throw new Error("User's expense not found");
    //     }
    
    //     // Consider individual share when updating user's balance
    //     const individualShare = expense.total / (expense.usersInExpense.length - 1);
    //     const updatedUserBalance = userExpense.balance - individualShare; // Subtract individual share
    //     await Database.updateEntry("expenses", { id: userExpense.id, balance: updatedUserBalance });
    // }



                // no output 
                // async function updateExpenseAndUserBalances(expense, user_id, amount) {
                //     try {
                //         // Retrieve the updated expense to ensure 'usersInExpense' is present
                //         const updatedExpense = await Database.getEntry("expenses", { id: expense.id });
                
                //         // Ensure 'usersInExpense' is an array before accessing its length
                //         const usersInExpense = updatedExpense.usersInExpense;
                
                //         if (!usersInExpense || !Array.isArray(usersInExpense)) {
                //             console.error("Invalid or missing usersInExpense property:", usersInExpense);
                //             throw new Error("Invalid or missing usersInExpense property");
                //         }
                
                //         // Calculate individual share when updating user's balance
                //         const individualShare = expense.total / (usersInExpense.length - 1);
                
                //         // Update the user's balance for the expense
                //         const userExpense = await Database.getEntry("expenses", { user_id, group_id: expense.group_id });
                
                //         if (!userExpense) {
                //             throw new Error("User's expense not found");
                //         }
                
                //         const updatedUserBalance = userExpense.balance - amount;
                //         await Database.updateEntry("expenses", { id: userExpense.id, balance: updatedUserBalance });
                
                //         // Update the balance of the user who created the expense
                //         const creatorExpense = await Database.getEntry("expenses", {
                //             user_id: updatedExpense.user_id,
                //             group_id: updatedExpense.group_id,
                //         });
                
                //         if (!creatorExpense) {
                //             throw new Error("Creator's expense not found");
                //         }
                
                //         // The creator's balance is affected by individual payments
                //         const updatedCreatorBalance = creatorExpense.balance - amount;
                //         await Database.updateEntry("expenses", { id: creatorExpense.id, balance: updatedCreatorBalance });
                
                //         // Log information for debugging
                //         console.log("Expense usersInExpense:", usersInExpense);
                
                //     } catch (error) {
                //         console.error("Error updating balances:", error);
                //         throw error; // Rethrow the error to handle it at the higher level if needed
                //     }
                // }




// Output what its subtarcting
//     async function updateExpenseAndUserBalances(expense, user_id, amount) {
//     try {
//         // Update the expense balance
//         const updatedExpenseBalance = expense.balance - amount;
//         await Database.updateEntry("expenses", { id: expense.id, balance: updatedExpenseBalance });

//         // Log the original expense for debugging
//         console.log("Original Expense:", expense);

//         // Retrieve users involved in the group (excluding the user who is creating the expense)
//         const usersInExpense = await Database.getEntries("user_groups", { group_id: expense.group_id });
//         const usersExceptCreator = usersInExpense.filter(user => user.user_id !== expense.user_id);

//         // Log the users involved in the expense for debugging
//         console.log("Users in Expense:", usersInExpense);

//         // Update the user's balance for the expense
//         const userExpense = await Database.getEntry("expenses", { user_id, group_id: expense.group_id });

//         if (!userExpense) {
//             throw new Error("User's expense not found");
//         }

//         // Log the user's expense for debugging
//         console.log("User's Expense:", userExpense);

//         // Ensure 'usersInExpense' is an array before accessing its length
//         if (!usersExceptCreator.length) {
//             throw new Error("Invalid or missing usersInExpense property");
//         }

//         // Consider individual share when updating user's balance
//         const individualShare = expense.total / usersExceptCreator.length;
//         const updatedUserBalance = userExpense.balance - individualShare; // Subtract individual share
//         await Database.updateEntry("expenses", { id: userExpense.id, balance: updatedUserBalance });

//         // Log information for debugging
//         console.log("Expense usersInExpense:", usersExceptCreator);

//         // Update the balance of the user who created the expense
//         const creatorExpense = await Database.getEntry("expenses", { user_id: expense.user_id, group_id: expense.group_id });

//         if (!creatorExpense) {
//             throw new Error("Creator's expense not found");
//         }

//         console.log("Creator's expense before update:", creatorExpense);

//         const updatedCreatorBalance = creatorExpense.balance - individualShare; // Subtract individual share
//         await Database.updateEntry("expenses", { id: creatorExpense.id, balance: updatedCreatorBalance });

//         // Log the updated creator's expense for debugging
//         console.log("Creator's expense after update:", await Database.getEntry("expenses", { id: creatorExpense.id }));

//     } catch (error) {
//         console.error("Error updating balances:", error);
//         throw error; // Rethrow the error to handle it at the higher level if needed
//     }
// }
    
}

