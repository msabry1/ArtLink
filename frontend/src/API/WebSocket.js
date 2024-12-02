import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";


const Actions = {
    ADD: 'add',
    MODIFY: 'modify',
    DELETE: 'delete',
  };
class Room {
    constructor(roomId, localAddSahpe, localModifySahpe, localDeleteSahpe){
        this.roomId = roomId;
        this.localAddSahpe = localAddSahpe;
        this.localModifySahpe = localModifySahpe;
        this.localDeleteSahpe = localDeleteSahpe;
        this.stompClient = null;
    }

    setRoomId(roomId){
        this.roomId = roomId;
    }

    connect(){
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe(`/topic/${this.roomId}`, (message) => {
                const dto = JSON.parse(message.body);
                console.log(dto);
                this.applyChange(dto)
            });
        }); 
        console.log(this.roomId);
    }

    applyChange(dto){
        switch (dto.action) {
            case Actions.ADD:
                this.localAddSahpe(dto.shape);
                break;
            case Actions.MODIFY:
                this.localModifySahpe(dto.shape);
                break;
            case Actions.DELETE:
                this.localDeleteSahpe(dto.shape.id);
                break;
            default:
                console.error("Action not supported");
        }
    }

    disconnectRoom(){
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
    }

    isConnected() {
        return this.stompClient && this.stompClient.connected;
    }

    logShapeUpdate = (action, shape) => {
        if (!this.isConnected()) {
            console.warn('No connection. Shape update not sent.');
            return;
        }

        const shapeData = {
          action: action,
          paintId: this.roomId,
          shape: shape
        };
        console.log('Shape Update:', JSON.stringify(shapeData, null, 2));
        this.stompClient.send('/app/share', {}, JSON.stringify(shapeData));
      };

    undo(){
        const request = {action: "undo", paintId:this.roomId}
        this.stompClient.send('/app/undo.redo', {}, JSON.stringify(request))
    }
    redo(){
        const request = {action: "redo", paintId:this.roomId}
        this.stompClient.send('/app/undo.redo', {}, JSON.stringify(request))
    }
}
export default Room;