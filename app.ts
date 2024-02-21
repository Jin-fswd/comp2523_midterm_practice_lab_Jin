import { readFile } from "node:fs/promises"
import { EOL } from "node:os";
/*
class CsvMenuParser {
    private _menuData: string = "";
    constructor(filename: string) {
        readFile(filename, "utf8")
        .then((data) => {
            this._menuData = data;
        });
    }

    getMenuData() {
        return this._menuData;
    }
}

// const content = await readFile("menu.csv","utf8")

// readFile("menu.csv", "utf8")
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err))

async function main() {
    const csvMenuParser = new CsvMenuParser("menu.csv")
    console.log(csvMenuParser.getMenuData())
    // try {
    //     const data = await readFile("menu.csv", "utf8")
    //     console.log(data);
    // } catch ( error ) {
    //     console.log(error);
    // }
}
main();
*/
interface IWritable {
    write(menuStr: string): void  // Promise<void>;
}

class HtmlWriter implements IWritable {
    async write(menuStr: string) {}
}

class TextWriter implements IWritable {
    async write(menuStr: string) {
        return "hello";
    }
}


class CsvMenuParser {
    private csvData: string[] = [];
    private constructor(data: string[]) {
        this.csvData = data;
    }

    static async buildMenu(filename: string) {
        const data = await readFile(filename, "utf8");
        return new CsvMenuParser(data.split(EOL))
    }

    async writeMenu(writer: IWritable) {
        writer.write()
    }

    get menuData():string[] {
        return this.csvData
    }
}

async function main() {
    const menu = await CsvMenuParser.buildMenu("menu.csv")
    console.log("?");
    //console.log(menu.csvData);
    console.log(menu.menuData);
    menu.writeMenu(new HtmlWriter())
}

main();