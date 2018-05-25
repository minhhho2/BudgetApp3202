const dataOptions = ['incomes', 'expenses', 'inflow', 'outflow'].map((option, index) => {
    return { key: index, value: option, text: option }
});

export default dataOptions;