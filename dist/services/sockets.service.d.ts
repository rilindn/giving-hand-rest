import { Socket } from 'socket.io';
declare function socketsService(socket: Socket): Promise<void>;
export default socketsService;
