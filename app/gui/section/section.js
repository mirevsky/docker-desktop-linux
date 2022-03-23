import Control from "../libraries/controls.js";
import {Tabs, Tab} from "../libraries/ui.js";
import DockerImages from "../blocks/docker/docker-images.js";
import DockerVolumes from "../blocks/docker/docker-volumes.js";

export default class Section extends Control {
    constructor() {
        super("section");
    }

    Render() {
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

        return super.Render()
    }
}