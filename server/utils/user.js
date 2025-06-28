
let users = [];

function updatedUsers(user) {
  users.push(user);
  return users.filter(u => u.roomId === user.roomId);
}

function getUsersInRoom(roomId) {
  return users.filter(u => u.roomId === roomId);
}

function removeUser(socketId) {
  const index = users.findIndex(u => u.socketId === socketId);
  console.log("index",index);
  if(index!=-1)
  users.splice(index,1);
  return users;
}
function getUser(socketId){
  const user=users.find(u=>u.socketId===socketId);
  return user;
}

module.exports = {
  updatedUsers,
  getUsersInRoom,
  removeUser,
  getUser
};
