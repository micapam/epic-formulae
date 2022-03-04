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
      default: 'referent',
      description: 'Group results',
      options: ['metre', 'referent'],
    }),
  }

  document: Document = new Document('Formulae')

  async findAndGroupByMetre(): Promise<void> {
    this.document.paragraph('Ordered by metre')
    const formulae = await Formula.find().sort({ metricalSortKey: 1 })

    for (const [idx, element] of formulae.entries()) {
      // this.log(`Working on formula: ${element}`)
      const lastPrettyMetre = idx > 0 ? formulae[idx - 1].prettyMetreForGrouping : ''

      if (element.prettyMetreForGrouping !== lastPrettyMetre) {
        this.document.heading(element.prettyMetreForGrouping)
      }

      this.document.paragraph(`${element.text} _(${element.referent})_`)
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

  async generateMarkdown(group: string): Promise<string> {
    await (group === 'metre' ?
      this.findAndGroupByMetre() :
      this.findAndGroupByReferent()
    )

    return this.document.toString()
  }

  async generate(format: string, group: string): Promise<string> {
    return (format === 'markdown' ?
      this.generateMarkdown(group) :
      this.generateCsv(group)
    )
  }

  writeOutput(body: string): void {
    this.log(body)
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(List)
    const { format, group } = flags

    await connect()
    const output = await this.generate(format, group)
    await disconnect()
    this.writeOutput(output)
  }
}
