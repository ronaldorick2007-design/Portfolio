export default function parse(code) {
    const lines = code.split("\n");
    const output = [];

    // ============================================================
    // STATE
    // ============================================================

    let braceDepth = 0;

    const functionStack = [];
    const scopes = [];

    function currentFunction() {
        return functionStack.length
            ? functionStack[functionStack.length - 1]
            : null;
    }

    function currentFunctionName() {
        return currentFunction()?.name ?? "main";
    }

    function currentVariables() {
        return scopes.length
            ? scopes[scopes.length - 1].variables
            : new Map();
    }

    // ============================================================
    // ACTION BUILDERS
    // ============================================================

    function yieldActions(actions, indent = "") {
        output.push(`${indent}yield [`);

        actions.forEach((action, index) => {
            const comma = index < actions.length - 1 ? "," : "";
            output.push(`${indent}    ${action}${comma}`);
        });

        output.push(`${indent}];`);
    }

    function setAction(type, index, name, scope) {
        return `{ action: "set", type: "${type}", index: ${index}, name: "${name}", scope: ${scope} }`;
    }

    function indicateAction(index, data, marker, scope) {
        if (data !== undefined) {
            return `{ action: "indicate", index: [${index}, "${marker}"], d: ${data}, scope: ${scope} }`;
        }

        return `{ action: "indicate", index: [${index}, "${marker}"], scope: ${scope} }`;
    }

    function rearrangeAction(
        index,
        name,
        scope,
        action = "rearrange"
    ) {
        return `{ action: "${action}", index: ${index}, name: "${name}", scope: ${scope} }`;
    }

    function clearAction(scope) {
        return `{ action: "clear", index: [], scope: ${scope} }`;
    }

    function logAction(message, scope) {
        return `{ action: "log", index: [${message}], scope: ${scope} }`;
    }

    // ============================================================
    // TYPES
    // ============================================================

    function getType(type) {
        type = type.trim();

        if (type.endsWith("[]")) {
            return "A";
        }

        if (
            type === "int" ||
            type === "float" ||
            type === "double" ||
            type === "char" ||
            type === "string" ||
            type === "boolean" ||
            type === "bool"
        ) {
            return "P";
        }

        return type;
    }

    function inferType(value, variables) {
        value = value.trim();

        // new Node(...)
        const newMatch = value.match(
            /^new\s+([A-Za-z_$][\w$]*)\s*\(/
        );

        if (newMatch) {
            return newMatch[1];
        }

        // Array literal
        if (/^\[.*\]$/.test(value)) {
            return "A";
        }

        // Primitive
        if (
            /^[-+]?\d+(?:\.\d+)?$/.test(value) ||
            /^["'`].*["'`]$/.test(value) ||
            /^(true|false)$/.test(value) ||
            /^null$/.test(value)
        ) {
            return "P";
        }

        // Existing variable
        const variable = value.match(
            /^[A-Za-z_$][\w$]*$/
        );

        if (variable && variables.has(variable[0])) {
            return variables.get(variable[0]);
        }

        return "P";
    }

    // ============================================================
    // PARAMETERS
    // ============================================================

    function parseParameters(rawParams) {
        const parameters = [];

        if (!rawParams.trim()) {
            return {
                parameters,
                cleanParams: ""
            };
        }

        for (const raw of rawParams.split(",")) {
            const param = raw.trim();

            if (!param) continue;

            // int[] arr
            // int p
            // Node head
            const typed = param.match(
                /^([A-Za-z_$][\w$]*(?:\[\])?)\s+([A-Za-z_$][\w$]*)$/
            );

            if (typed) {
                parameters.push({
                    name: typed[2],
                    type: getType(typed[1])
                });
            } else {
                parameters.push({
                    name: param,
                    type: null
                });
            }
        }

        return {
            parameters,
            cleanParams: parameters
                .map(param => param.name)
                .join(", ")
        };
    }

    // ============================================================
    // FUNCTION
    // ============================================================

    function parseFunction(line) {
        const match = line.match(
            /^(\s*)function\s+\*?\s*([A-Za-z_$][\w$]*)\s*\((.*?)\)\s*\{(.*)$/
        );

        if (!match) {
            return false;
        }

        const indent = match[1];
        const name = match[2];
        const rawParams = match[3];
        const remainder = match[4];

        const {
            parameters,
            cleanParams
        } = parseParameters(rawParams);

        // Every function gets depth = 1.
        const finalParams = parameters.some(
            param => param.name === "depth"
        )
            ? cleanParams
            : cleanParams
                ? `${cleanParams}, depth = 1`
                : "depth = 1";

        const functionLine =
            `${indent}function* ${name}(${finalParams}) {${remainder}`;

        output.push(functionLine);

        const variables = new Map();

        for (const param of parameters) {
            if (param.type) {
                variables.set(param.name, param.type);
            }
        }

        variables.set("depth", "P");

        functionStack.push({
            name,
            braceDepth: braceDepth + 1
        });

        scopes.push({
            name,
            variables
        });

        const scope = `"${name}"`;

        // Function itself
        yieldActions(
            [
                setAction("F", undefined, undefined, scope)
                    .replace(', name: "undefined"', "")
            ],
            indent
        );

        // Parameters
        const parameterActions = parameters
            .filter(param => param.type)
            .map(param =>
                setAction(
                    param.type,
                    param.name,
                    param.name,
                    scope
                )
            );

        if (parameterActions.length) {
            yieldActions(parameterActions, indent);
        }

        braceDepth++;

        return true;
    }

    // ============================================================
    // RECURSIVE CALL
    // ============================================================

    function isRecursiveCall(name) {
        const fn = currentFunction();

        return fn !== null && fn.name === name;
    }

    function transformCall(name, args) {
        args = args.trim();

        // Only recursive calls receive depth + 1.
        if (isRecursiveCall(name)) {
            if (
                !/(^|,)\s*depth\s*\+\s*1\s*$/.test(args)
            ) {
                args = args
                    ? `${args}, depth + 1`
                    : "depth + 1";
            }
        }

        return `yield* ${name}(${args})`;
    }

    // ============================================================
    // FUNCTION CALLS INSIDE EXPRESSIONS
    // ============================================================

    function transformCalls(expression) {
        const ignored = new Set([
            "if",
            "while",
            "for",
            "switch",
            "catch",
            "function",
            "Math"
        ]);

        let result = "";
        let i = 0;

        while (i < expression.length) {
            const char = expression[i];

            if (!/[A-Za-z_$]/.test(char)) {
                result += char;
                i++;
                continue;
            }

            const start = i;

            i++;

            while (
                i < expression.length &&
                /[\w$]/.test(expression[i])
            ) {
                i++;
            }

            const name = expression.slice(start, i);

            // Not a function call.
            if (
                expression[i] !== "(" ||
                ignored.has(name)
            ) {
                result += name;
                continue;
            }

            // Don't touch "new Foo()".
            const before = expression
                .slice(Math.max(0, start - 5), start)
                .trim();

            if (before.endsWith("new")) {
                result += name;
                continue;
            }

            let depth = 1;
            let j = i + 1;
            let quote = null;

            while (j < expression.length && depth > 0) {
                const c = expression[j];

                if (quote) {
                    if (
                        c === quote &&
                        expression[j - 1] !== "\\"
                    ) {
                        quote = null;
                    }
                } else if (
                    c === "'" ||
                    c === '"' ||
                    c === "`"
                ) {
                    quote = c;
                } else if (c === "(") {
                    depth++;
                } else if (c === ")") {
                    depth--;
                }

                j++;
            }

            if (depth !== 0) {
                result += name;
                continue;
            }

            const args = expression.slice(
                i + 1,
                j - 1
            );

            result += `(${transformCall(name, args)})`;

            i = j;
        }

        return result;
    }

    // ============================================================
    // $ VISUALIZATION
    // ============================================================

    function parseDollar(trimmed) {
        let match;

        // $arr->[left,right]->hold
        match = trimmed.match(
            /^\$([A-Za-z_$][\w$]*)->\[\s*(.*?)\s*\]->(active|hold)\s*;?$/
        );

        if (match) {
            return indicateAction(
                `[ [${match[2]}], "${match[3]}" ]`
                    .replace("[ [", "[[")
                    .replace("] ]", "]]"),
                match[1],
                undefined,
                `"${currentFunctionName()}"`
            );
        }

        // $arr->[i]->active
        match = trimmed.match(
            /^\$([A-Za-z_$][\w$]*)->\[\s*(.*?)\s*\]->(active|hold)\s*;?$/
        );

        if (match) {
            return indicateAction(
                match[2],
                match[1],
                match[3],
                `"${currentFunctionName()}"`
            );
        }

        // $arr->left->hold
        match = trimmed.match(
            /^\$([A-Za-z_$][\w$]*)->([A-Za-z_$][\w$]*)->(active|hold)\s*;?$/
        );

        if (match) {
            return indicateAction(
                match[2],
                match[1],
                match[3],
                `"${currentFunctionName()}"`
            );
        }

        // $curr->active
        match = trimmed.match(
            /^\$([A-Za-z_$][\w$]*)->(active|hold)\s*;?$/
        );

        if (match) {
            return indicateAction(
                match[1],
                undefined,
                match[2],
                `"${currentFunctionName()}"`
            );
        }

        return null;
    }

    // ============================================================
    // TYPED DECLARATION
    // ============================================================

    function parseTypedDeclaration(trimmed, line) {
        const match = trimmed.match(
            /^(int|float|double|char|string|boolean|bool|[A-Za-z_$][\w$]*(?:\[\]))\s+([A-Za-z_$][\w$]*)\s*=\s*(.+);$/
        );

        if (!match) {
            return false;
        }

        const rawType = match[1];
        const name = match[2];
        const value = match[3];

        const type = getType(rawType);

        currentVariables().set(name, type);

        const indent = line.match(/^\s*/)[0];

        output.push(
            `${indent}let ${name} = ${transformCalls(value)};`
        );

        yieldActions(
            [
                setAction(
                    type,
                    name,
                    name,
                    `"${currentFunctionName()}"`
                )
            ],
            indent
        );

        return true;
    }

    // ============================================================
    // NORMAL DECLARATION
    // ============================================================

    function parseDeclaration(trimmed, line) {
        const match = trimmed.match(
            /^(let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*(.+);$/
        );

        if (!match) {
            return false;
        }

        const keyword = match[1];
        const name = match[2];
        const value = match[3];

        const type = inferType(
            value,
            currentVariables()
        );

        currentVariables().set(name, type);

        const indent = line.match(/^\s*/)[0];

        output.push(
            `${indent}${keyword} ${name} = ${transformCalls(value)};`
        );

        yieldActions(
            [
                setAction(
                    type,
                    name,
                    name,
                    `"${currentFunctionName()}"`
                )
            ],
            indent
        );

        return true;
    }

    // ============================================================
    // ARRAY DESTRUCTURING SWAP
    // ============================================================

    function parseSwap(trimmed, line) {
        const match = trimmed.match(
            /^\[\s*([A-Za-z_$][\w$]*)\s*\[[^\]]+\](?:\s*,\s*\1\s*\[[^\]]+\])*\s*\]\s*=\s*\[/
        );

        if (!match) {
            return false;
        }

        const array = match[1];
        const indent = line.match(/^\s*/)[0];

        output.push(line);

        yieldActions(
            [
                rearrangeAction(
                    "[]",
                    array,
                    `"${currentFunctionName()}"`
                )
            ],
            indent
        );

        return true;
    }

    // ============================================================
    // MEMBER MUTATION
    // ============================================================

    function parseMemberMutation(trimmed, line) {
        const match = trimmed.match(
            /^([A-Za-z_$][\w$]*)\.(push|pop|shift|unshift|add|remove|append|insert)\s*\(.*\);$/
        );

        if (!match) {
            return false;
        }

        const object = match[1];
        const indent = line.match(/^\s*/)[0];

        output.push(
            `${indent}${transformCalls(trimmed)}`
        );

        yieldActions(
            [
                rearrangeAction(
                    "[]",
                    object,
                    `"${currentFunctionName()}"`
                )
            ],
            indent
        );

        return true;
    }

    // ============================================================
    // RETURN
    // ============================================================

    function parseReturn(trimmed, line) {
        const match = trimmed.match(
            /^return(?:\s+(.+?))?;$/
        );

        if (!match) {
            return false;
        }

        const value = match[1];
        const indent = line.match(/^\s*/)[0];

        /*
         * ONLY clear before return.
         *
         * No action:"return".
         */

        yieldActions(
            [
                clearAction(
                    `"${currentFunctionName()}"`
                )
            ],
            indent
        );

        if (value) {
            output.push(
                `${indent}return ${transformCalls(value)};`
            );
        } else {
            output.push(`${indent}return;`);
        }

        return true;
    }

    // ============================================================
    // STANDALONE FUNCTION CALL
    // ============================================================

    function parseStandaloneCall(trimmed, line) {
        const match = trimmed.match(
            /^([A-Za-z_$][\w$]*)\s*\((.*)\);$/
        );

        if (!match) {
            return false;
        }

        const name = match[1];

        const ignored = new Set([
            "if",
            "while",
            "for",
            "switch",
            "catch"
        ]);

        if (ignored.has(name)) {
            return false;
        }

        const args = match[2];
        const indent = line.match(/^\s*/)[0];

        output.push(
            `${indent}${transformCall(name, args)};`
        );

        return true;
    }

    // ============================================================
    // SIMPLE ASSIGNMENT
    // ============================================================

    function parseAssignment(trimmed, line) {
        const match = trimmed.match(
            /^([A-Za-z_$][\w$]*)\s*=\s*(.+);$/
        );

        if (!match) {
            return false;
        }

        const left = match[1];
        const value = match[2];

        const indent = line.match(/^\s*/)[0];

        output.push(
            `${indent}${left} = ${transformCalls(value)};`
        );

        const type = currentVariables().get(left);

        const action =
            type === "A" ||
            (type && type !== "P")
                ? rearrangeAction(
                    "[]",
                    left,
                    `"${currentFunctionName()}"`
                )
                : rearrangeAction(
                    left,
                    left,
                    `"${currentFunctionName()}"`,
                    "rearr"
                );

        yieldActions([action], indent);

        return true;
    }

    // ============================================================
    // MAIN LOOP
    // ============================================================

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) {
            output.push(line);
            continue;
        }

        // Function declaration
        if (parseFunction(line)) {
            continue;
        }

        // $ visualization
        const dollarAction = parseDollar(trimmed);

        if (dollarAction) {
            const indent = line.match(/^\s*/)[0];

            yieldActions(
                [dollarAction],
                indent
            );

            continue;
        }

        // Destructuring array swap
        if (parseSwap(trimmed, line)) {
            continue;
        }

        // Typed declaration
        if (parseTypedDeclaration(trimmed, line)) {
            continue;
        }

        // Normal declaration
        if (parseDeclaration(trimmed, line)) {
            continue;
        }

        // Return
        if (parseReturn(trimmed, line)) {
            continue;
        }

        // Member mutation
        if (parseMemberMutation(trimmed, line)) {
            continue;
        }

        // Standalone function call
        if (parseStandaloneCall(trimmed, line)) {
            continue;
        }

        // Assignment
        if (parseAssignment(trimmed, line)) {
            continue;
        }

        // Everything else:
        // preserve normal JS/control flow.
        output.push(transformCalls(line));

        // Brace tracking
        const opening =
            (line.match(/\{/g) || []).length;

        const closing =
            (line.match(/\}/g) || []).length;

        braceDepth += opening - closing;

        // Pop finished functions.
        while (
            functionStack.length &&
            braceDepth <
                functionStack[functionStack.length - 1]
                    .braceDepth
        ) {
            functionStack.pop();
            scopes.pop();
        }
    }

    return output.join("\n");
}