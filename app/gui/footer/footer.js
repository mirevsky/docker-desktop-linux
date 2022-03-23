import Control from "../libraries/controls.js";
import DockerStatus from "../blocks/docker/docker-status.js";
import {Hyperlink} from "../libraries/ui.js";
import DockerSettings from "../blocks/docker/docker-settings.js";

export default class Footer extends Control
{
    constructor() {
        super("footer");
    }

    Render(){
        let dockerStatus = new Control("span");
        dockerStatus.Attribute('id', 'docker-status');
        dockerStatus.Controls.Add(new DockerStatus())
        this.Controls.Add(dockerStatus)

        let dockerSettings = new Control("span");
        dockerSettings.Attribute('class', 'docker-settings');
        const dockerMenu = new DockerSettings()
        dockerMenu.Attribute('class', 'docker-menu')
        dockerMenu.Style('display','none')
        dockerSettings.Controls.Add(dockerMenu)
        let settings = new Hyperlink("", "#settings");
        settings.Attribute('class','docker-settings-button')
        settings.onclick = () => {
            const button = settings.innerRef
            if (button.classList.value === "docker-settings-button") {
                button.classList.add("active")
            } else {
                button.classList.remove("active")
            }
            const docker_menu = Control.getByClassName('docker-menu')[0]
            docker_menu.style.display = (docker_menu.style.display === 'none') ? 'block' : 'none';
            return false
        }
        dockerSettings.Controls.Add(settings)
        this.Controls.Add(dockerSettings);

        return super.Render()
    }
}