import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";


const Actions = {
    ADD: 'add',
    MODIFY: 'modify',
    DELETE: 'delete',
  };
class Room {
    constructor(localAddSahpe, localModifySahpe, localDeleteSahpe){
        this.localAddSahpe = localAddSahpe;
        this.localModifySahpe = localModifySahpe;
        this.localDeleteSahpe = localDeleteSahpe;
        this.stompClient = null;
    }

    connect(roomid){
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe(`/topic/${roomid}`, (message) => {
                const dto = JSON.parse(message.body);
                console.log(dto);
                this.applyChange(dto)
            });
        }); 
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
          paintId: "1",
          shape: shape
        };
        console.log('Shape Update:', JSON.stringify(shapeData, null, 2));
        this.stompClient.send('/app/share', {}, JSON.stringify(shapeData));
      };
}
export default Room;