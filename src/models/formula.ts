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

schema.pre('save', function (next) {
  this.metricalSortKey = this.metre
    .slice(0, -1)         // Remove the last syllable as it doesn't matter (brevis in longo)
    .replace(/[()]/g, '') // Remove parentheses (from initial ghost syllable)
    .split('')
    .reverse()            // Right-to-left sorting on metre
    .join('')

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

export const Formula = model<IFormula>('Formula', schema)
