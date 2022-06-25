import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getAllByText(/Test/i);
  expect(check.length).toBe(1);
});

test('that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
});

test('that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: ""}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
});

test('that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkTask = screen.getByText(/Test/i);
  expect(checkTask).toBeInTheDocument();
  const checkBox = screen.getByRole('checkbox');
  fireEvent.click(checkBox);
  const checkDelete = screen.getByText(/You have no todo's left/i);
  expect(checkDelete).toBeInTheDocument();
});

test('that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const pastDue = "12/30/2021";
  fireEvent.change(inputTask, { target: { value: "Pink"}});
  fireEvent.change(inputDate, { target: { value: pastDue}});
  fireEvent.click(element);
  const currDue = "12/30/2023";
  fireEvent.change(inputTask, { target: { value: "White"}});
  fireEvent.change(inputDate, { target: { value: currDue}});
  fireEvent.click(element);
  const checkPast = screen.getByText(/Pink/i);
  const checkPastDate = screen.getByText(new RegExp(pastDue,"i"));
  expect(checkPast).toBeInTheDocument();
  expect(checkPastDate).toBeInTheDocument();
  const checkCurr = screen.getByText(/White/i);
  const checkCurrDate = screen.getByText(new RegExp(currDue,"i"));
  expect(checkCurr).toBeInTheDocument();
  expect(checkCurrDate).toBeInTheDocument();
  const pastColor = screen.getByTestId(/Pink/i).style.background;
  const currColor = screen.getByTestId(/White/i).style.background;
  expect(pastColor).not.toBe(currColor);
});
