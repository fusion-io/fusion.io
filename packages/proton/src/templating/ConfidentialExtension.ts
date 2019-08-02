import { Environment, runtime } from "nunjucks";

/**
 * Nah nah! It does not mean this extension need to be protected!
 *
 * It is just a nunjucks extension which will hide some piece of View
 * if the user is unauthenticated.
 *
 */
export default class ConfidentialExtension {

    /**
     *
     */
    tags:string[] = ['confidential', 'protected', 'auth'];

    /**
     *
     * @param parser
     * @param nodes
     * @param lexer
     */
    parse(parser: any, nodes: any, lexer: any) {
        const tok = parser.nextToken();

        const args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        const confidentialContent = parser.parseUntilBlocks('endconfidential', 'endprotected', 'replacement', 'endauth');

        let replacementContent = null;

        if(parser.skipSymbol('replacement')) {
            parser.skip(lexer.TOKEN_BLOCK_END);
            replacementContent = parser.parseUntilBlocks('endconfidential', 'endprotected', 'endauth');
        }

        parser.advanceAfterBlockEnd();

        return new nodes.CallExtension(this, 'run', args, [confidentialContent, replacementContent]);
    }

    /**
     *
     * @param env
     * @param confidential
     * @param replacement
     */
    run({env}: {env: Environment}, confidential: () => string, replacement: () => string) {
        try {
            // @ts-ignore
            const koaContext = env.getGlobal('context');
            return new runtime.SafeString(koaContext.identity ? confidential() : replacement());
        } catch (e) {
            return new runtime.SafeString(replacement());
        }
    }
}
