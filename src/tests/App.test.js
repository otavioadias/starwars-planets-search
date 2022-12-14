import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Teste da aplicação StarWars', () => {
  const ROW_ROLE_SELECTOR = 'row';
  const INPUT_FILTER_NAME_SELECTOR = 'name-filter';

  test('1 - Teste se a aplicação possui os filtros:', async () => {
    render(<App />);

    await waitFor(() =>  expect(screen.getByText(/Loading/i)).toBeInTheDocument(), {timeout: 4000});
    const filterByName = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
    await waitFor(() =>  expect(filterByName).toBeInTheDocument(), {timeout: 2000});

    const filterByColumn = await screen.findByTestId('column-filter');
    expect(filterByColumn).toBeInTheDocument();
    fireEvent.change(filterByColumn, { target: { value: 'population' } });

    const filterByComp = await screen.findByTestId('comparison-filter');
    expect(filterByComp).toBeInTheDocument();
    fireEvent.change(filterByComp, { target: { value: 'maior que' } });
  });

  test('2 - A tabela deve possuir um cabeçalho com 13 colunas', async () => {
    render(<App />);
    await waitFor(() =>  expect(screen.getByText(/Loading/i)).toBeInTheDocument(), {timeout: 3000});
    expect( await screen.findByText('Name')).toBeInTheDocument();
    expect(await screen.findByText('Rotation Period')).toBeInTheDocument();
    expect(await screen.findByText('Orbital Period')).toBeInTheDocument();
    expect(await screen.findByText('Diameter')).toBeInTheDocument();
    expect(await screen.findByText('Climate')).toBeInTheDocument();
    expect(await screen.findByText('Gravity')).toBeInTheDocument();
    expect(await screen.findByText('Terrain')).toBeInTheDocument();
    expect(await screen.findByText('Surface Water')).toBeInTheDocument();
    expect(await screen.findByText('Population')).toBeInTheDocument();
    expect(await screen.findByText('Films')).toBeInTheDocument();
    expect(await screen.findByText('Created')).toBeInTheDocument();
    expect(await screen.findByText('Edited')).toBeInTheDocument();
    expect(await screen.findByText('URL')).toBeInTheDocument();
  });

  test('Filtra planetas que possuem "oo"', async () => {
    render(<App />);
    await waitFor(() =>  expect(screen.getByText(/Loading/i)).toBeInTheDocument(), {timeout: 3000});
    const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
    fireEvent.change(input, { target: { value: 'oo' } });
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(3);
    const planetNames = ['Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
    expect(await screen.findByText(planetName)).toBeInTheDocument();
  }
});

test('Filtra planetas que possuem "OO"', async () => {
  render(<App />);
  await waitFor(() =>  expect(screen.getByText(/Loading/i)).toBeInTheDocument(), {timeout: 3000});
  const input = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
  fireEvent.change(input, { target: { value: 'OOI' } });
  expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(2);
  expect(await screen.findByText('Tatooine')).toBeInTheDocument();
});

test('4 - Teste se a aplicação filtra usando maior que:', async () => {
  render(<App />);

  await waitFor(() =>  expect(screen.getByText(/Loading/i)).toBeInTheDocument(), {timeout: 3000});
  const filterByName = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
  await waitFor(() =>  expect(filterByName).toBeInTheDocument(), {timeout: 2000});

  const filterByColumn = await screen.findByTestId('column-filter');
  expect(filterByColumn).toBeInTheDocument();
  fireEvent.change(filterByColumn, { target: { value: 'population' } });

  const filterByComp = await screen.findByTestId('comparison-filter');
  expect(filterByComp).toBeInTheDocument();
  fireEvent.change(filterByComp, { target: { value: 'maior que' } });

  const filterByValue = await screen.findByTestId('value-filter');
  expect(filterByValue).toBeInTheDocument();
  fireEvent.change(filterByValue, { target: { value: '4500000000' } });

  const btnSearch = await screen.findByTestId('button-filter');
  userEvent.click(btnSearch);
  expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(2);

  const deleteFilter = await screen.findByTestId('filter');
  userEvent.click(deleteFilter);
});

test('4 - Teste se a aplicação filtra usando menor que:', async () => {
  render(<App />);

  await waitFor(() =>  expect(screen.getByText(/Loading/i)).toBeInTheDocument(), {timeout: 3000});
  const filterByName = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
  await waitFor(() =>  expect(filterByName).toBeInTheDocument(), {timeout: 2000});

  const filterByColumn = await screen.findByTestId('column-filter');
  expect(filterByColumn).toBeInTheDocument();
  fireEvent.change(filterByColumn, { target: { value: 'orbital_period' } });

  const filterByComp = await screen.findByTestId('comparison-filter');
  expect(filterByComp).toBeInTheDocument();
  fireEvent.change(filterByComp, { target: { value: 'menor que' } });

  const filterByValue = await screen.findByTestId('value-filter');
  expect(filterByValue).toBeInTheDocument();
  fireEvent.change(filterByValue, { target: { value: '10465' } });

  const btnSearch = await screen.findByTestId('button-filter');
  userEvent.click(btnSearch);
  expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

  const deleteFilter = await screen.findByTestId('filter');
  userEvent.click(deleteFilter);
  expect(deleteFilter).not.toBeInTheDocument();
});

test('4 - Teste se a aplicação filtra usando igual a:', async () => {
  render(<App />);

  await waitFor(() =>  expect(screen.getByText(/Loading/i)).toBeInTheDocument(), {timeout: 3000});
  const filterByName = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
  await waitFor(() =>  expect(filterByName).toBeInTheDocument(), {timeout: 2000});

  const filterByColumn = await screen.findByTestId('column-filter');
  expect(filterByColumn).toBeInTheDocument();
  fireEvent.change(filterByColumn, { target: { value: 'orbital_period' } });

  const filterByComp = await screen.findByTestId('comparison-filter');
  expect(filterByComp).toBeInTheDocument();
  fireEvent.change(filterByComp, { target: { value: 'igual a' } });

  const filterByValue = await screen.findByTestId('value-filter');
  expect(filterByValue).toBeInTheDocument();
  fireEvent.change(filterByValue, { target: { value: '23' } });

  const btnSearch = await screen.findByTestId('button-filter');
  userEvent.click(btnSearch);
  expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(1);
  expect(filterByColumn).toHaveLength(4);

  const btnDeleteAll = await screen.findByTestId('button-remove-filters');
  expect(btnDeleteAll).toBeInTheDocument();
  userEvent.click(btnDeleteAll);
  expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
});

test('4 - Teste se a aplicação não tem o filtro de comparação:', async () => {
  render(<App />);
  await waitFor(() =>  expect(screen.getByText(/Loading/i)).toBeInTheDocument(), {timeout: 3000});

  const filterByName = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
  await waitFor(() =>  expect(filterByName).toBeInTheDocument(), {timeout: 2000});

  const filterByColumn = await screen.findByTestId('column-filter');
  expect(filterByColumn).toBeInTheDocument();
  fireEvent.change(filterByColumn, { target: { value: 'orbital_period' } });

  const filterByComp = await screen.findByTestId('comparison-filter');
  expect(filterByComp).toBeInTheDocument();
  fireEvent.change(filterByComp, { target: { value: 'default' } });

  const filterByValue = await screen.findByTestId('value-filter');
  expect(filterByValue).toBeInTheDocument();
  fireEvent.change(filterByValue, { target: { value: '23' } });

  const btnSearch = await screen.findByTestId('button-filter');
  userEvent.click(btnSearch);
  
  expect(false).toBeTruthy;
  
});
});

// describe('Teste a chamada da API', () => {
//   beforeEach(() => {
//     jest.spyOn(global, 'fetch')
//       .mockImplementation(() => Promise.resolve)({
//         status: 200,
//         ok: true,
//         json: () => Promise.resolve(testData)
//       });
//   });

//   test('1 - Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos da coluna `residents`:', () => {
//     render(<App />);
//     expect(global.fetch).toHaveBeenCalled();
//   });
// });
