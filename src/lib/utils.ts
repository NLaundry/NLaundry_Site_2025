import fs from "node:fs/promises";
import { GLOBAL } from "./variables";

type MarkdownData<T extends object> = {
    frontmatter: T;
    file: string;
    url: string;
};

export enum ContentType {
    Lab = "lab",
    Life = "life",
    Poetry = "poetry",
    Publications = "publications",
}

const fileGlobs: Record<ContentType, Record<string, () => Promise<any>>> = {
    [ContentType.Lab]: import.meta.glob("/src/pages/lab/*.md"),
    [ContentType.Life]: import.meta.glob("/src/pages/life/*.md"),
    [ContentType.Poetry]: import.meta.glob("/src/pages/poetry/*.md"),
    [ContentType.Publications]: import.meta.glob("/src/pages/publications/*.md"),
};

/**
 * This function processes the content of a directory and returns an array of processed content.
 * It takes a content type, a function to process the content, and an optional directory.
 * If no directory is provided, it defaults to the current working directory.
 * 
 * @param contentType the type of content to process
 * @param processFn the function to process the content
 * @param dir the directory to process the content from
 * @returns a promise that resolves to an array of processed content
 */
export const processContentInDir = async <T extends object, K>(
    contentType: ContentType,
    processFn: (data: MarkdownData<T>) => K,
    dir: string = process.cwd(),
) => {
    const files = await fs.readdir(`${dir}/src/pages/${contentType}`);
    const markdownFiles = files
        .filter((file: string) => file.endsWith(".md"))
        .map((file) => file.split(".")[0]);

    const readMdFileContent = async (file: string) => {
        const files = fileGlobs[contentType];
        const filePath = `/src/pages/${contentType}/${file}.md`;

        if (!(filePath in files)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const content = await files[filePath]();
        const data = content as MarkdownData<T>;
        return processFn(data);
    };

    return await Promise.all(markdownFiles.map(readMdFileContent));
};

/**
 * Shortens a string by removing words at the end until it fits within a certain length.
 * @param content the content to shorten
 * @param maxLength the maximum length of the shortened content (default is 20)
 * @returns a shortened version of the content
 */
export const getShortDescription = (content: string, maxLength = 20) => {
    const splitByWord = content.split(" ");
    const length = splitByWord.length;
    return length > maxLength ? splitByWord.slice(0, maxLength).join(" ") + "..." : content;
};

/**
 * Processes the date of an article and returns a string representing the processed date.
 * @param timestamp the timestamp to process
 * @returns a string representing the processed timestamp
 */
export const processArticleDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const monthSmall = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${monthSmall} ${day}, ${year}`;
};

/**
 * Generates a source URL for a content item. The URL is used in meta tags and social media cards.
 * @param sourceUrl the source URL of the content
 * @param contentType the type of content
 * @returns a string representing the source URL with the appropriate domain
 */
export const generateSourceUrl = (
    sourceUrl: string,
    contentType: ContentType,
) => {
    return `${GLOBAL.rootUrl}/${contentType}/${sourceUrl}`;
};

