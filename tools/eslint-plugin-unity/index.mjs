// небольшой локальный плагин: требует Promise-параметр "params"
export default {
  rules: {
    "require-async-params": {
      meta: {
        type: "problem",
        docs: {
          description: "Next 15: params must be Promise<...> in app routes",
        },
        fixable: "code",
        schema: [],
        messages: {
          needPromise:
            "In {{where}}, `params` must be typed as Promise<...> (Next 15 async params).",
        },
      },
      create(context) {
        /** return true if filename is an app route file we care about */
        const isRouteFile = (filename) =>
          /[\\/]src[\\/]app[\\/].*[\\/](layout|page)\.tsx$/.test(filename);

        const filename = context.getFilename();
        if (!isRouteFile(filename)) return {};

        /** check a function node for `params` param type */
        function checkFn(node, where) {
          if (!node.params || node.params.length === 0) return;

          const p = node.params.find(
            (x) => x.type === "Identifier" && x.name === "params"
          );
          if (!p) return;

          const ann = p.typeAnnotation?.typeAnnotation;
          const isPromise =
            ann?.type === "TSTypeReference" &&
            ann.typeName?.type === "Identifier" &&
            ann.typeName.name === "Promise";

          if (isPromise) return;

          // report and naive fix: wrap existing type into Promise<...>, or add Promise<any> if нет типа
          context.report({
            node: p,
            messageId: "needPromise",
            data: { where },
            fix(fixer) {
              // if has no type -> add : Promise<any>
              if (!p.typeAnnotation) {
                return fixer.insertTextAfter(p, ": Promise<any>");
              }
              const t = p.typeAnnotation;
              // : X  -> : Promise<X>
              return fixer.replaceTextRange(
                [t.range[0], t.range[1]],
                `: Promise<${context.getSourceCode().getText(ann ?? t.typeAnnotation)}>`
              );
            },
          });
        }

        return {
          // export default async function Layout(...) {}
          ExportDefaultDeclaration(node) {
            const decl = node.declaration;
            if (decl?.type === "FunctionDeclaration") {
              checkFn(decl, "default export");
            }
            if (
              decl?.type === "ArrowFunctionExpression" ||
              decl?.type === "FunctionExpression"
            ) {
              checkFn(decl, "default export");
            }
          },

          // const X = async ({ params }) => {}  (page/layout as const export)
          VariableDeclarator(node) {
            const init = node.init;
            if (
              init &&
              (init.type === "ArrowFunctionExpression" ||
                init.type === "FunctionExpression")
            ) {
              // эвристика: имя переменной "Page" | "Layout"
              const idName = node.id.type === "Identifier" ? node.id.name : "";
              if (/Page$|Layout$/i.test(idName)) {
                checkFn(init, idName);
              }
            }
          },

          // export async function generateMetadata({ params }) {}
          ExportNamedDeclaration(node) {
            const decl = node.declaration;
            if (
              decl?.type === "FunctionDeclaration" &&
              decl.id?.name === "generateMetadata"
            ) {
              checkFn(decl, "generateMetadata");
            }
          },
        };
      },
    },
  },
};
