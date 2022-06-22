import {Block} from "../../libraries/blocks.js";
import {Fieldset, Form, Hyperlink, Input, Label, MessageBox, Password} from "../../libraries/ui.js";
import {StringHandler} from "../../libraries/handlers.js";
import Control from "../../libraries/controls.js";
import Request, {RequestType} from "../../libraries/request.js";

export default class DockerSettings extends Block {
    indexAction() {
        const buttons = ["Sign In", "General", "Command Line", "Shortcuts", "Help"]

        for (let item in buttons) {
            const button_id = StringHandler.camelCaseFirstUpperCase(buttons[item])
            const div = new Control('div')
            div.Attribute('class', StringHandler.snakeCase(buttons[item]));
            const link = new Hyperlink(buttons[item], "#" + button_id);
            if (buttons[item] === "Shortcuts") {
                div.Controls.Add(new DockerSettings('shortcuts-sub-menu', 'shortcuts'))
            } else {
                link.onclick = () => {
                    const action = StringHandler.snakeCase(buttons[item])
                    eval("this." + action + "Action()")
                }
            }

            div.Controls.Add(link)
            this.Controls.Add(div)
        }
    }

    sign_inAction() {
        const form = new Form("sign-in-form")
        form.Controls.Add(new Label("Username:"))
        form.Controls.Add(new Input("username"))
        form.Controls.Add(new Label("Password:"))
        form.Controls.Add(new Password("password"))

        let messageBox = Control.getByClassName('MessageBox')[0]
        let message = new MessageBox("login_in", "Sign Into Docker", form)
        message.Style('display','block')
        message.Confirm = () => {
            new Request(RequestType.POST, "/docker/login", (data)=>{
                console.log(data)
                Control.getById(message.id).replaceWith(new MessageBox(this.id, "", "").Render())
            } , {'cmd' : "docker start $(docker ps -a -q -f status=exited)"})
        }
        messageBox.replaceWith(message.Render())
    }

    generalAction() {
        window.location.assign("/inner/#general")
    }

    command_lineAction() {
        window.location.assign("/inner/#command_line")
    }

    shortcutsAction() {
        this.Attribute('class', 'docker-settings-shortcuts-sub-menu')
        const actions_label = ["Start Stopped Images", "Stop All Images", "Delete All Images / Volumes", "Restart Docker"]
        const actions = ["start_all","stop_all", "delete_all" , "restart_docker"]

        for(let idx in actions_label){
            const button_id = StringHandler.snakeCase(actions_label[idx])
            const link = new Hyperlink(actions_label[idx] , "#"+button_id)
            link.onclick = () => {
                console.log("this."+actions[idx]+"Action()")
                eval("this."+actions[idx]+"Action()")
            }
            this.Controls.Add(link)
        }

    }

    helpAction() {
        console.log("helpAction");
    }

    start_allAction() {
        let messageBox = Control.getByClassName('MessageBox')[0]
        let message = new MessageBox("restart", "Stop All Containers", "Are you sure you want to start all stopped containers?")
        message.Style('display','block')
        message.Confirm = () => {
            new Request(RequestType.POST, "/cmd/", (data)=>{
                console.log(data)
                Control.getById(message.id).replaceWith(new MessageBox(this.id, "", "").Render())
            } , {'cmd' : "docker start $(docker ps -a -q -f status=exited)"})
        }
        messageBox.replaceWith(message.Render())
    }

    stop_allAction() {
        let messageBox = Control.getByClassName('MessageBox')[0]
        let message = new MessageBox("restart", "Stop All Containers", "Are you sure you want to stop all containers?")
        message.Style('display','block')
        message.Confirm = () => {
            new Request(RequestType.POST, "/cmd/", (data)=>{
                console.log(data)
                Control.getById(message.id).replaceWith(new MessageBox(this.id, "", "").Render())
            } , {'cmd' : "docker stop $(docker ps -q)"})
        }
        messageBox.replaceWith(message.Render())
    }

    delete_allAction() {
        let messageBox = Control.getByClassName('MessageBox')[0]
        let message = new MessageBox("restart", "Delete All Containers and Volumes", "Are you sure you want to stop and prune all images and volumes?")
        message.Style('display','block')
        message.Confirm = () => {
            new Request(RequestType.POST, "/cmd/prune", (data)=>{
                console.log(data)
                Control.getById(message.id).replaceWith(new MessageBox(this.id, "", "").Render())
            } , {'cmd' : "docker kill $(docker ps -q) && docker system prune && docker system prune --volumes && docker rmi $(docker images -a -q)"})
        }
        messageBox.replaceWith(message.Render())
    }

    restart_dockerAction() {
        let messageBox = Control.getByClassName('MessageBox')[0]
        let message = new MessageBox("restart", "Restart Docker Service", "Are you sure you want to restart Docker service?")
        message.Style('display','block')
        message.Confirm = () => {
            new Request(RequestType.POST, "/docker/", (data)=>{
                console.log(data)
                Control.getById(message.id).replaceWith(new MessageBox(this.id, "", "").Render())
            } , {'cmd' : "restart"})
        }
        messageBox.replaceWith(message.Render())
    }
}