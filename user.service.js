const userController=require("./user.controller")

function gettAllusers()
{
    let notEmptyUsers=users.filter(u=>Boolean());
    return notEmptyUsers;
}



// function getUser(userID)
// {
//     return users.find(u => u.id == userID);
// }

//get single user by ID
async function getUser(userID) {
    
    const filter={ _id: userID }
    let user=await userController.readOne(filter)
    return user;
}




function deleteUser (userID)
{
    let userIndex=users.findIndex(u => u.id == userID)
    
    if (userIndex)
    {
        users.splice(userIndex, 1)
        return true;
    } else
    {
        return false;
    }
}



// function updateUser (userID, newKeyValue)
// {
//     let user=getUser(userID);
//     updatedData={...user, ...newKeyValue}
//     return  updatedData;
// }




//update user
async function updateUser(userID, updatedData) {
    // בדיקה אם היוזר קיים
    const filter = { _id: userID };
    let user = await userController.readOne(filter);

    if (!user) {
        return { success: false, message: "Item not found" };
    } else{
        return await userController.updateById(filter, updatedData);
    }

   
}



// function addUser (userData)
// {
//     let isExist=users.find(u => u.email == userData.email)
//     if (!isExist)
//     {
//         const newUser={...userData, id: idGenerator(userData.firstName)}
//         users.push(newUser)
//         return newUser;
//     }
//     else {
//         newUser= false;
//         return newUser;
//     }

// }


//add new user
async function addUser(newUser) {
    
    const filter = { email: newUser.email };
    let isExist=await userController.readOne(filter);

    if (!isExist) {
        return await userController.create(newUser);
    } else {
        return { success: false, message: "User is already in the list" };
    }
}






//update user orders
async function addUserOrder(userId, orderId) {
    const updateResult = await userController.updateById(
        { _id: userId },
        { $push: { orders: orderId } }
    );

    if (updateResult.matchedCount === 0) {
        // טיפול במצב שבו היוזר לא נמצא
        throw new Error("User not found");
    }

    return updateResult;
}





function idGenerator(firstName) {
    let id = "001" + firstName.substring(0, 2);
    console.log(id);
    return id;
}

module.exports = {gettAllusers ,addUserOrder, getUser, deleteUser, updateUser, addUser}
