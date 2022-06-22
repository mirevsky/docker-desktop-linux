import {Block} from "../../libraries/blocks.js";
import {Tab, Tabs} from "../../libraries/ui.js";
import DockerImages from "./docker-images.js";
import DockerVolumes from "./docker-volumes.js";

export default class DockerContainers extends Block {
    indexAction(){
        let tabs = new Tabs('docker-tabs', [
            new Tab("Images"),
            new Tab("Volumes")]);
        tabs.Attribute('class','tabs')
        tabs.Images = () => {
            return new DockerImages()
        }
        tabs.Volumes = () => {
            return new DockerVolumes()
        }
        this.Controls.Add(tabs);
    }
}