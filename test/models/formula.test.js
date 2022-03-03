const { expect } = require('chai')
const { Formula } = require('../../src/models/formula')

const loudThundering = () => new Formula({
  text: 'loud-thundering',
  metre: '--uu',
  referent: 'Zeus',
})

const breakerOfHorses = () => new Formula({
  text: 'breaker of horses',
  metre: '(-)-uu-u',
  referent: 'Diomedes',
})

describe('Formula', async () => {
  describe('metricalSortKey', async () => {
    it('correctly generates it', async () => {
      const formula = loudThundering()
      await formula.save()
      expect(formula.metricalSortKey).to.equal('u--')
    })

    it('removes parentheses around initial ghost syllable', async () => {
      const formula = breakerOfHorses()
      await formula.save()
      expect(formula.metricalSortKey).to.equal('-uu--')
    })
  })

  describe('prettyMetreForGrouping', () => {
    it('correctly produces it', () => {
      expect(loudThundering().prettyMetreForGrouping).to.equal('— — ◡ ×')
    })

    it('includes initial ghost syllable (without parentheses)', () => {
      expect(breakerOfHorses().prettyMetreForGrouping).to.equal('— — ◡ ◡ — ×')
    })
  })
})
