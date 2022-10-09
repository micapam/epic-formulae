import { Command, Flags } from '@oclif/core'
import { stringify } from 'csv-stringify/sync'
import { connect, disconnect } from '../db'
import { Formula } from '../models/formula'
import Document from '../document'

export default class List extends Command {
  static description = 'List the formulae from the data store'

  static examples = [
    'formula list',
    'formula list -g metre',
    'formula list -f csv',
  ]

  static flags = {
    format: Flags.string({
      char: 'f',
      default: 'markdown',
      description: 'Output format',
      options: ['csv', 'markdown'],
    }),
    group: Flags.string({
      char: 'g',
      default: 'metre',
      description: 'Group results',
      options: ['metre', 'referent'],
    }),
    numSyllables: Flags.integer({
      char: 'n',
      default: 0,
      description: 'Restrict syllables to a certain number for grouping',
    })
  }

  document: Document = new Document('Formulae')

  abbreviateMetricalSortKey(metre: string, numSyllables: number): string {
    if (numSyllables === 0) return metre

    return metre.slice(0, numSyllables)
  }

  abbreviatePrettyMetre(prettyMetre: string, numSyllables: number): string {
    if (numSyllables === 0) return prettyMetre

    return prettyMetre
      .split(' ')
      .join('')
      .slice(-numSyllables)
      .split('')
      .join(' ')
  }

  async findAndGroupByMetre(numSyllables: number): Promise<void> {
    let heading = 'Ordered by metre'
    if (numSyllables > 0) {
      heading = `${heading} (max syllables: ${numSyllables})`
    }

    this.document.paragraph(heading)
    const formulae = await Formula.find().sort({ metricalSortKey: 1 })

    let lastMetre

    for (const [idx, element] of formulae.entries()) {
      // const lastMetre = this.abbreviateMetricalSortKey(
      //   idx > 0 ? formulae[idx - 1].metricalSortKey : '',
      //   numSyllables,
      // )

      const metre = this.abbreviateMetricalSortKey(
        element.metricalSortKey,
        numSyllables,
      )

      if (metre.length < numSyllables) continue

      if (metre !== lastMetre) {
        this.document.heading(this.abbreviatePrettyMetre(
          element.prettyMetreForGrouping,
          numSyllables,
        ))

        lastMetre = metre
      }

      const entry = [element.text, `_(${element.referent})_`]

      if (numSyllables > 0 && element.metricalSortKey.length > metre.length) {
        entry.push(`**${element.prettyMetre.trim()}**`)
      }

      this.document.paragraph(entry.join(' '))
    }
  }

  async findAndGroupByReferent(): Promise<void> {
    this.document.paragraph('Ordered by referent')
    const formulae = await Formula.find().sort({ referent: 1 })

    for (const [idx, element] of formulae.entries()) {
      // this.log(`Working on formula: ${element}`)
      const lastReferent = idx > 0 ? formulae[idx - 1].referent : ''

      if (element.referent !== lastReferent) {
        this.document.heading(element.referent)
      }

      this.document.paragraph(`${element.text} \`${element.metre}\``)
    }
  }

  async generateCsv(group: string): Promise<string> {
    const rows = [['text', 'metre', 'referent']]
    const sortBy = group === 'metre' ? 'metricalSortKey' : 'referent'
    const formulae = await Formula.find().sort({ [sortBy]: 1 })

    for (const formula of formulae) {
      rows.push([
        formula.text,
        formula.metre,
        formula.referent,
      ])
    }

    return stringify(rows)
  }

  async generateMarkdown(group: string, numSyllables: number): Promise<string> {
    await (group === 'metre' ?
      this.findAndGroupByMetre(numSyllables) :
      this.findAndGroupByReferent()
    )

    return this.document.toString()
  }

  async generate(
    format: string, group: string, numSyllables: number
  ): Promise<string> {
    return (format === 'markdown' ?
      this.generateMarkdown(group, numSyllables) :
      this.generateCsv(group)
    )
  }

  writeOutput(body: string): void {
    this.log(body)
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(List)
    const { format, group, numSyllables } = flags

    await connect()
    const output = await this.generate(format, group, numSyllables)
    await disconnect()
    this.writeOutput(output)
  }
}
