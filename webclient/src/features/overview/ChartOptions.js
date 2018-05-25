const chartOptions = ['pie', 'bar', 'doughnut', 'polarArea'].map((option, index) => {
    return { key: index, value: option, text: option }
});

export default chartOptions;