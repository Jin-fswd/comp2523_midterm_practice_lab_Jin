import * as fs from 'node:fs/promises';
import { EOL } from 'node:os';

interface IWritable {
    write(menuStr: string): Promise<void>; // This is very important
    prepareContent(menuStr: string[]): string; // This is very important
}

class HtmlWriter {
    prepareContent(csvData: string[]) {
        const categorizedMeal = this.categorizing(csvData);
        let htmlStr = `<html><body>`;

        categorizedMeal.forEach((category) => {
            htmlStr += `<h2>${category.charAt(0).toUpperCase() + category.slice(1)} Items</h2>`;
            htmlStr += `<ul>`;
            const categoryItems = csvData.filter(line => line.startsWith(category));
            categoryItems.forEach((item) => {
                const [_, name, description, price] = item.split(',');
                htmlStr += `<li>${name.trim()}, ${description.trim()} - ${price.trim()}</li>`;
            });
            htmlStr += `</ul>`;
        });
        htmlStr += `</body></html>`;
        return htmlStr;
    }
    
    categorizing(csvData: string[]): string[] {
        const arrCategory: string[] = [];
        csvData.forEach((line) => {
            const category = line.split(',')[0];
            if (category.trim() !== '' && !arrCategory.includes(category)) {
                arrCategory.push(category);
            }
        });
        return arrCategory;
    }

    async write(menuStr: string): Promise<void> {
        return await fs.writeFile('csv.html', menuStr);
    }
}

class TextWriter {
    prepareContent(csvData: string[]) {
        // categorizing
        const categorizedMeal = this.categorizing(csvData);   
        let myStr = ``;
        categorizedMeal.forEach((category) => {
            myStr += `* ${category.charAt(0).toUpperCase() + category.slice(1)} Items *\n`;
            const categoryItems = csvData.filter(line => line.startsWith(category));
            categoryItems.forEach((item) => {
                const [_, name, description, price] = item.split(',');
                myStr += `${price.trim()}  ${name.trim()}, ${description.trim()}\n`;
            });
            myStr += '\n'; 
        });
        return myStr;
    }


    categorizing(csvData: string[]): string[] {
        const arrCategory: string[] = [];
        csvData.forEach((line) => {
            const category = line.split(',')[0];
            if (category.trim() !== '' && !arrCategory.includes(category)) {
                arrCategory.push(category);
            }
            
        });
        return arrCategory
    }

    async write(menuStr: string) {
        return await fs.writeFile('csv.txt', menuStr);
    }
}

class CsvMenuParser {
    private _csvData: string[] = [];

    private constructor(data: string[]) {
        this._csvData = data;
    }

    static async buildMenu(filename: string) {
        const data = await fs.readFile(filename, 'utf8');
        return new CsvMenuParser(data.split(EOL));
    }

    async writeMenu(writer: IWritable) {
        const str = writer.prepareContent(this._csvData)
        writer.write(str);
    }

    getMenuData() {
        return this._csvData;
    }
}



async function main() {
    const menu = await CsvMenuParser.buildMenu('menu.csv');
    menu.writeMenu(new HtmlWriter())
    menu.writeMenu(new TextWriter())
}
main();