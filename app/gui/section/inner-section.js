import Control from "../libraries/controls.js";
import Terminal from "../libraries/terminal/terminal.js";
import {Hyperlink, Table, TableCell, TableRow} from "../libraries/ui.js";
import {StringHandler} from "../libraries/handlers.js";
import DockerGeneralSettings from "../blocks/docker/docker-general-settings.js";
import DockerContainers from "../blocks/docker/docker-containers.js";

export default class InnerSection extends Control
{
    constructor() {
        super("section");
    }

    Render() {

        let currentSection = window.location.hash

        const table = new Table()
        table.Attribute('cellspacing','0')
        table.Attribute('cellpadding','0')
        table.Attribute('class','inner-section-table')
        const tr = new TableRow()

        let cell = new TableCell()
        cell.Attribute('class', 'inner-section-menu')
        const buttons = ["General", "Command Line", "Containers"]
        for (let item in buttons) {
            const action = StringHandler.snakeCase(buttons[item])
            const div = new Control('div')
            div.Attribute('class', action);
            const link = new Hyperlink(buttons[item], "#" + action);
            if ("#"+action === currentSection) link.Attribute('class', 'active')
            link.onclick = () => {
                window.location.assign("/inner/#"+action)
                window.location.reload()
                return false
            }
            div.Controls.Add(link)
            cell.Controls.Add(div)
        }
        tr.Controls.Add(cell)

        cell = new TableCell()
        cell.Attribute('class', 'inner-section-content')
        const general = new DockerGeneralSettings()
        general.id = 'general'
        general.Style('display', ("#"+general.id === currentSection) ? 'block' : 'none')
        cell.Controls.Add(general)
        const terminal = new Terminal("cmd-terminal")
        terminal.id = 'command_line'
        terminal.Style('display', ("#"+terminal.id === currentSection) ? 'block' : 'none')
        cell.Controls.Add(terminal);
        const containers = new DockerContainers()
        containers.id = 'containers'
        containers.Style('display', ("#"+containers.id === currentSection) ? 'block' : 'none')
        cell.Controls.Add(containers)
        tr.Controls.Add(cell)
        table.Controls.Add(tr)

        this.Controls.Add(table)

        return super.Render()
    }
}