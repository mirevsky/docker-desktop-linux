import Control from "../controls.js";
import {TerminalStyle} from "./terminal.style.js";
import {Table, TableCell, TableRow, Textarea} from "../ui.js";

export default class Terminal extends Control
{
    constructor(id) {
        super("div");
        this.id = id
        this.AssignCSSClass(TerminalStyle)
    }

    Render(){
        const terminalLog = new Control('div');
        terminalLog.Attribute('class','terminal-log')
        this.Controls.Add(terminalLog)

        const terminalInputComponent = new Control('div')
        terminalInputComponent.Attribute('class','terminal-input-component')

        this.Controls.Add(terminalInputComponent)

        return super.Render()
    }

    static Banner = "\n" +
        "                           .'''''.                          \n" +
        "                          .,ccccc,.                         \n" +
        "                           ';;;;;'                          \n" +
        "             ...... ........'''''.                          \n" +
        "            .;ccc:,.,cccc,.,ccccc,.           ...           \n" +
        "            .;cc::,.,::cc,.,c::::,.          .;::'.         \n" +
        "       .... ..,,,'...,,,,...,,,,'.  ....    .,:ccc;.        \n" +
        "     .,::::'.,::::'.,::::,.,:::::,.'::::,.  .;cccc:;......  \n" +
        "     .;cccc,.;cccc,.;cccc,.,ccccc,.,cccc;.  .,cccccccccc::,.\n" +
        "     .',,,,..',,,'...,,,,...,,,,,...,,,,..  .,:ccccccccc:;. \n" +
        " .,,,,,;;;;;,,;;;,,,;;;;;,,;;;;;;;;,;;;;;,;;::cccc:::;;'..  \n" +
        ".,ccccccccccccccccccccccccccccccccccccccccccccccc:'..       \n" +
        ".,cccccccccccccccccccccccccccccccccccccccccccccc:'          \n" +
        " 'ccccccccccccccccccccccccccccccccccccccccccccc:'           \n" +
        " .;ccccccccccccccccccccccccccccccccccccccccccc;.            \n" +
        "  ':cccccccccccccccccccccccccccccccccccccccc:,.             \n" +
        "  .,cccccccccccccccccccccccccccccccccccccc:;.               \n" +
        "   .,:cccccccccccccccccccccccccccccccccc:;..                \n" +
        "     .;:ccccccccccccccccccccccccccccc:;'.                   \n" +
        "       .,;:ccccccccccccccccccccc::;,'.                      \n" +
        "          ..'',,;;;::::;;;;,,'....                          \n" +
        "                ..........                                  \n" +
        "\n"+
        "           Docker Desktop Community"
}