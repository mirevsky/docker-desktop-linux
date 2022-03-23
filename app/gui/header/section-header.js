import Control from "../libraries/controls.js";
import {ImageLink, Table, TableCell, TableRow, Image, Hyperlink} from "../libraries/ui.js";

export default class SectionHeader extends Control
{
    constructor() {
        super("header");
        this.Attribute('class', 'section-header')
    }

    Render(){

        const table = new Table()
        table.Attribute('class','inner-header-table')
        table.Attribute('cellspacing','0')
        table.Attribute('cellpadding','0')

        const tr = new TableRow()

        let cell = new TableCell()
        cell.Style("text-align",'left')
        const back = new Hyperlink("Back", "/")
        back.Attribute('class', 'back')
        cell.Controls.Add(back)
        tr.Controls.Add(cell)

        cell = new TableCell()
        cell.Style("text-align",'center')
        const logo = new Image("Docker Community", "/resources/images/docker-logo-header-white.png")
        logo.Attribute('class','logo')
        cell.Controls.Add(logo)
        tr.Controls.Add(cell)

        cell = new TableCell()
        cell.Style("text-align",'right')
        const user = new Control('span')
        user.Attribute('class', 'user')
        const label = new Control('span')
        label.Attribute('class', 'label')
        label.innerHTML = "Sign in"
        const sign_in = new Hyperlink(user.Render().outerHTML+label.Render().outerHTML, "#sign_in")
        sign_in.Attribute('class', 'sign_in')
        cell.Controls.Add(sign_in)
        tr.Controls.Add(cell)

        table.Controls.Add(tr)

        this.Controls.Add(table)

        return super.Render()
    }
}