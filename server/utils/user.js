const users=[];

//add user
exports.updateUsers=({roomName1,roomId1,userId,host,presenter})=>{
    console.log("recieved the data from server",{roomName1,roomId1,userId,host, presenter});
    users.push({roomName1,roomId1,userId,host,presenter});
    return users.filter((user)=>user.roomId1===roomId1);
}

//remove user use findIndex it returns the index of the  first match
//splice will remove the the given (index..end(as given by u)) from the array

exports.removeUser=(id)=>{
    const userTobeRemoved=users.findIndex((user)=>user.userId==id);
    if(userTobeRemoved!=-1){
        return users.splice(userTobeRemoved,1)[0];
        // afjbagljal
    }
    return null;
    // users.slice
}

//get the user  use find() because it will return the object which matches first 

exports.getUser=(id)=>{
    const userFound=users.find((user)=>user.userId===id);
    return userFound;
}

//get all user in the room 
//we will use filter() since it returns array of all elements which matches the condition

exports.getAllUserInRoom=(roomId)=>{
    const userInRoom=users.filter((user)=>user.roomId===roomId);
    return userInRoom;
}