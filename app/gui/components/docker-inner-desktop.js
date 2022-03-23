import Footer from "../footer/footer.js";
import InnerSection from "../section/inner-section.js";
import SectionHeader from "../header/section-header.js";
import Control from "../libraries/controls.js";
import Terminal from "../libraries/terminal/terminal.js";
import DockerGeneralSettings from "../blocks/docker/docker-general-settings.js";
import Request, {RequestType} from "../libraries/request.js";
import {MessageBox} from "../libraries/ui.js";
import {StringHandler} from "../libraries/handlers.js";

export default class DockerInnerDesktop {
    Render() {
        const style = new Control("style");
        style.id = "emerald"
        document.head.appendChild(style.Render());

        const messageBox = new Control('div')
        messageBox.Attribute('class', "MessageBox")
        messageBox.Style('display', 'none')
        document.body.appendChild(messageBox.Render());

        const alertBox = new Control('div')
        alertBox.Attribute('class', "AlertBox")
        alertBox.Style('display', 'none')
        document.body.appendChild(alertBox.Render());

        const header = new SectionHeader()
        document.body.appendChild(header.Render());

        const section = new InnerSection()
        document.body.appendChild(section.Render());

        const footer = new Footer()
        document.body.appendChild(footer.Render());

        $('div.terminal-input-component').terminal((command) => {
            let myDiv = Control.getById('command_line')
            myDiv.scrollTop = myDiv.scrollHeight;
            if (command !== '') {
                new Request(RequestType.POST, "/cmd/", (data) => {
                    const output = new Control('div')
                    output.innerHTML = StringHandler.nl2br(data)
                    Control.getByClassName("terminal-output")[0].append(output.Render())

                    let div = Control.getById('command_line')
                    div.scrollTop = myDiv.scrollHeight;
                }, {'cmd': command})
            }
        }, {greetings: Terminal.Banner, prompt: '#:'})

        const sliders = DockerGeneralSettings.sliders

        for (let idx in sliders) {
            $("#" + sliders[idx].id + "_slider").slider(sliders[idx].settings)
        }
    }
}