/**
 * A simple service that return a message 
 * @author ferrylinton
 * @module HelloService
 */

/**
 * Generates a message from input name
 * @param name {string} - Input name
 * @returns {string} The message
 * @throws {Error} Throw error if message is empty
 */
export function getMessage(name: string): string {
    if (!name || name.trim() === '') {
        throw new Error('Name is empty')
    } else {
        return `Horas ${name} !!`;
    }
}