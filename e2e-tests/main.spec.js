const { test, describe, expect } = require('@playwright/test')

describe('Pokedex', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(
      page.getByText(
        'Pokémon and Pokémon character names are trademarks of Nintendo.',
      ),
    ).toBeVisible()
  })
  test('can navigate to specific pokemon page', async ({ page }) => {
    const pokemonList = await page.locator('a.list-item').all()
    const specificPokemonLocator = pokemonList[6]
    const pokemonName = specificPokemonLocator.textContent()
    const pokemonLink = await specificPokemonLocator.getAttribute('href')
    await specificPokemonLocator.click()
    expect(page.url().endsWith(pokemonLink)).toBeTruthy()
    expect(page.getByText(pokemonName)).toBeTruthy()
  })
})
