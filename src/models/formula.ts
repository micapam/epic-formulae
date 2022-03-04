/* eslint-disable unicorn/prefer-spread */
import { Schema, model } from 'mongoose'

interface IFormula {
  text: string;
  metre: string;
  referent: string;
  metricalSortKey: string;
  prettyMetreForGrouping: string;
}

const schema = new Schema<IFormula>({
  text: { type: String, index: { unique: true }},
  metre: String,
  referent: { type: String, index: true },
  metricalSortKey: { type: String, index: true },
}, { collection: 'formulae' })

const prettySymbol = (char: string) => {
  switch (char) {
  case 'u':
    return '◡'
  case '-':
    return '—'
  default:
    throw new Error(`Invalid character ${char}`)
  }
}

const generateMetricalSortKey = (metre: string) => metre
  .slice(0, -1)         // Remove the last syllable as it doesn't matter (brevis in longo)
  .replace(/[()]/g, '') // Remove parentheses (from initial ghost syllable)
  .split('')
  .reverse()            // Right-to-left sorting on metre
  .join('')

schema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  const data = this.getUpdate() as { metre: string, metricalSortKey: string }
  data.metricalSortKey = generateMetricalSortKey(data.metre)
  next()
})

schema.pre('save', function (next) {
  this.metricalSortKey = generateMetricalSortKey(this.metre)
  next()
})

schema.virtual('prettyMetreForGrouping').get(function (this: IFormula) {
  return this.metre
    .replace(/[()]/g, '') // Remove parentheses (from initial ghost syllable)
    .split('')
    .slice(0, -1)         // Remove the last syllable (to be replaced with ×)
    .map((char: string) => prettySymbol(char) as string)
    .concat(['×'])        // Final syllable can be either, brevis in longo
    .join(' ')            // Space out the characters
})

const Formula = model<IFormula>('Formula', schema)

export { Formula, IFormula }
