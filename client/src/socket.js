import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io({
  auth: {
    token: localStorage.getItem('messenger-token')
  }
});;

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", ({ message, sender }) => {
    if(message.senderId !== store.getState().user.id) {
      store.dispatch(setNewMessage(message, sender));
    }
  });
});

export default socket;
