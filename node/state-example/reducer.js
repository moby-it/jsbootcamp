let state = {
  employees: [
    {
      name: 'George',
      position: 'Junior'
    },
    {
      name: 'Greg',
      position: 'Mid'
    }
  ]
};
const employeeReducer = (action, state) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    case 'remove':
      const idx = state.employees.indexOf(e => e.name === action.payload.name);
      const newEmployees = state.employees.slice();
      newEmployees.splice(idx, 1);
      return {
        ...state,
        employees: newEmployees
      };
    default:
      return { ...state };
  }
};
export const addEmployee = (name, position) => {
  const action = { type: 'add', payload: { name, position } };
  state = employeeReducer(action, state);
};
export const removeEmployee = (name) => {
  const action = { type: 'remove', payload: name };
  state = employeeReducer(action, state);
};

export const selectEmployees = () => {
  return state.employees;
};