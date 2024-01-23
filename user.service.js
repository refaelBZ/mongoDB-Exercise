const {users}=require('./user.data');

function gettAllusers()
{
    let notEmptyUsers=users.filter(u=>Boolean());
    return notEmptyUsers;
}

function getUser(userID)
{
    return users.find(u => u.id == userID);
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

function updateUser (userID, newKeyValue)
{
    let user=getUser(userID);
    updatedData={...user, ...newKeyValue}
    return  updatedData;
}

function addUser (userData)
{
    let isExist=users.find(u => u.email == userData.email)
    if (!isExist)
    {
        const newUser={...userData, id: idGenerator(userData.firstName)}
        users.push(newUser)
        return newUser;
    }
    else {
        newUser= false;
        return newUser;
    }

}

function idGenerator(firstName) {
    let id = "001" + firstName.substring(0, 2);
    console.log(id);
    return id;
}

module.exports = {gettAllusers, getUser, deleteUser, updateUser, addUser}
