import {Block} from "../../libraries/blocks.js";
import {Label} from "../../libraries/ui.js";
import Control from "../../libraries/controls.js";

export default class DockerGeneralSettings extends Block {

    static sliders = [
            {
                id: "cpus", label: "CPUs:", settings: {
                    range: "max",
                    min: 1,
                    max: 6,
                    value: 2,
                    slide: (event, ui) => {
                        console.log(ui.value)
                    }
                }
            },
            {
                id: "memory", label: "Memory:", settings: {
                    range: "max",
                    min: 1,
                    max: 16,
                    value: 2,
                    slide: (event, ui) => {
                        console.log(ui.value)
                    }
                }
            },
            {
                id: "swap", label: "Swap:", settings: {
                    range: "max",
                    min: 1,
                    max: 6,
                    value: 2,
                    slide: (event, ui) => {
                        console.log(ui.value)
                    }
                }
            },
            {
                id: "disk_image_size", label: "Disk Image size:", settings: {
                    range: "max",
                    min: 20,
                    max: 60,
                    value: 30,
                    slide: (event, ui) => {
                        console.log(ui.value)
                    }
                }
            }
        ]

    indexAction() {

        const sliders = DockerGeneralSettings.sliders

        for (let idx in sliders) {
            let label = new Label(sliders[idx].label)
            label.id = sliders[idx].id
            this.Controls.Add(label)

            let div = new Control('div')
            div.id = sliders[idx].id + '_slider'
            this.Controls.Add(div)
        }
    }
}