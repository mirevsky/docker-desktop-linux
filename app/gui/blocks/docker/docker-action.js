import {Block} from "../../libraries/blocks.js";
import {AlertBox, Hyperlink, MessageBox} from "../../libraries/ui.js";
import {StringHandler} from "../../libraries/handlers.js";
import Control from "../../libraries/controls.js";
import Request, {RequestType} from "../../libraries/request.js";

export default class DockerAction extends Block {
    indexAction(params= { "is_container": true, "id": null }){
        this.Attribute('class','docker-action')
        this.Style('display','none')
        this.Style('width', (params.is_container) ? '64px' : '32px')
        const actions = (params.is_container) ? ["restart", "stop", "copy", "ssh"] : ["create", "delete"]
        for (let idx in actions) {
            const link = new Hyperlink("", "#"+actions[idx]);
            link.Attribute('class', 'docker-action-'+actions[idx])
            link.onclick = () => {
                const action = StringHandler.snakeCase(actions[idx])
                eval("this."+action+"Action({id:'"+params.id+"'})")
            }
            this.Controls.Add(link)
        }

    }

    startAction(params= {id: null}) {

    }

    pauseAction(params= {id: null}) {

    }

    restartAction(params= {id: null}) {
        let messageBox = Control.getByClassName('MessageBox')[0]
        let message = new MessageBox("restart", "Restart container", "Are you sure you want to restart the container "+params.id+"?")
        message.Style('display','block')
        message.Confirm = () => {
            new Request(RequestType.POST, "/cmd/", (data)=>{
                console.log(data)
                Control.getById(message.id).replaceWith(new MessageBox(this.id, "", "").Render())
            } , {'cmd' : "docker restart "+id})
        }
        messageBox.replaceWith(message.Render())
    }

    stopAction(params= {id: null}) {
        let messageBox = Control.getByClassName('MessageBox')[0]
        let message = new MessageBox("stop", "Restart container", "Are you sure you want to stop the container "+params.id+"?")
        message.Style('display','block')
        message.Confirm = () => {
            new Request(RequestType.POST, "/cmd/", (data)=>{
                console.log(data)
                Control.getById(message.id).replaceWith(new MessageBox(this.id, "", "").Render())
            } , {'cmd' : "docker stop "+id})
        }
        messageBox.replaceWith(message.Render())
    }

    copyAction(params= {id: null}) {
        var tempInput = document.createElement("input");
        tempInput.style = "position: absolute; left: -1000px; top: -1000px";
        tempInput.value = params.id;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        let alertBox = Control.getByClassName('AlertBox')[0]
        let message = new AlertBox('clipboardCopy', "ID "+params.id+" is copied!")
        message.Style('display','block')
        alertBox.replaceWith(message.Render())

        setTimeout(()=>{
            Control.getByClassName('AlertBox')[0].replaceWith(new AlertBox('clipboardCopy', "").Render())
        }, 2000)
    }

    sshAction(params= {id: null}) {

    }

    createAction(params= {id: null}) {

    }

    deleteAction(params= {id: null}) {

    }
}