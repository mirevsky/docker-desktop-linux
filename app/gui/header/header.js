import Control from "../libraries/controls.js";
import HeaderLabel from "../components/header-label.js";

export default class Header extends Control
{
    constructor() {
        super("header");
    }

    Render(){
        let dockerDetails = new Control("div");
        dockerDetails.Attribute('class', 'docker_details');
        dockerDetails.Controls.Add(new HeaderLabel("OS", "elementaryOS"));
        dockerDetails.Controls.Add(new HeaderLabel("Version", "20.10.13"));
        this.Controls.Add(dockerDetails)
        return super.Render()
    }
}