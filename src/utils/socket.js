import io from 'socket.io-client';
const clientserver=()=>{
   return io("http://localhost:3000");

}
export default clientserver;