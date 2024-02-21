const parser = new CsvMenuParser();
const textWriter = new TextWriter();
const htmlWriter = new HtmlWriter();

// .txt 파일로 출력
parser.writeMenu(textWriter);

// .html 파일로 출력
parser.writeMenu(htmlWriter);