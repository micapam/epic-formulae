export default class Document {
  elements: Array<string> = []

  constructor(title: string) {
    this.elements.push(`# ${title}`)
  }

  public heading(text: string): void {
    this.elements.push(`## ${text}`)
  }

  public paragraph(text: string): void {
    this.elements.push(text)
  }

  public toString(): string {
    return this.elements.join('\n\n')
  }
}
