import { InputHelper } from "../Input";
import Inquirer, { Question } from "inquirer";

Inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

export default class Inquiry implements InputHelper {
    async asking(questions: Question[]) {
        return Inquirer.prompt(questions);
    };
}
