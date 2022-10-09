import { Command, Flags } from '@oclif/core'
import { parse } from 'csv-parse/sync'
import { readFile } from 'node:fs/promises'
import { connect, disconnect } from '../db'
import { Formula, IFormula } from '../models/formula'

export default class Load extends Command {
  static description = 'Load forumlae from a CSV file'

  static examples = [
    'formula load my-formulae.csv',
    './bin/example-stream | formula load',
  ]

  static flags = {
    // ignoreHeader: Flags.boolean({
    //   char: 'i',
    //   default: true,
    //   description: 'Ignore header row in loaded file',
    // }),
    wipe: Flags.boolean({
      char: 'w',
      default: false,
      description: 'Wipe existing data before importing',
    })
  }

  static args = [{ name: 'file' }]

  public async run(): Promise<void> {
    const { args: { file }, flags } = await this.parse(Load)
    const { wipe } = flags
    const data = await readFile(file || '/dev/stdin', 'utf-8')
    const rows = parse(data, {
      columns: true,
      skipEmptyLines: true,
    }) as IFormula[]

    await connect()

    if (wipe) {
      await Formula.deleteMany({})
    }

    await Promise.all(rows.map(async ({ text, metre, referent }) =>
      Formula.findOneAndUpdate(
        { text },
        { text, metre, referent },
        { upsert: true },
      ),
    ))

    await disconnect()
  }
}
