import { Command, Flags } from '@oclif/core'
import { connect, disconnect } from '../db'
import { Formula } from '../models/formula'

export default class Add extends Command {
  static description = 'Add a formula to the data store'

  static examples = [
    "$ formula add -m '(-)-uuu' -r Zeus 'cloud-gatherer'",
  ]

  static flags = {
    metre: Flags.string({
      char: 'm',
      description: "Metrical notation: 'u' = breve, '-' = macron, parenthesise ghost syllable if present",
      required: true,
    }),
    referent: Flags.string({
      char: 'r',
      description: 'Referent. Keep consistent (including case) across related formulae',
      required: true,
    }),
  }

  static args = [{
    name: 'text',
    description: 'Text of the formula',
    required: true,
  }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Add)
    const { text } = args
    const { metre, referent } = flags

    await connect()
    const f = new Formula({ text, metre, referent })
    await f.save()

    this.log(`Created formula: ${f}`)
    await disconnect()
  }
}
