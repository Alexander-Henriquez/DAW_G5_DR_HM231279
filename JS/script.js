document.addEventListener("DOMContentLoaded", function () {

    const chartTypeRadios = document.querySelectorAll('input[name="chartType"]');
    const chartColorRadios = document.querySelectorAll('input[name="chartColor"]');
    const chartOrientationRadios = document.querySelectorAll('input[name="chartOrientation"]');
    const chart2006Container = document.getElementById('chart2006');
    const chart2007Container = document.getElementById('chart2007');
    const generateChartButton = document.getElementById('generateChartButton');

    // Datos de muestra para los gráficos
    const dataSamples = {
        'sistema-operativo': {
            '2006': [50, 30, 20], // Uso de sistema operativo en 2006 (Windows, Mac, Linux)
            '2007': [55, 35, 10], // Uso de sistema operativo en 2007 (Windows, Mac, Linux)
        },
        'navegador': {
            '2006': [20, 50, 30], // Uso de navegador en 2006 (Edge, Chrome, Opera)
            '2007': [15, 60, 25], // Uso de navegador en 2007 (Edge, Chrome, Opera)
        },
    };

    // Configuración de gráficos
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    let currentChart2006 = null;
    let currentChart2007 = null;

    // Función para crear un gráfico
    function createChart(container, data, options) {
        const ctx = container.getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options,
        });
    }

    // Función para destruir los gráficos actuales
    function destroyCharts() {
        if (currentChart2006) {
            currentChart2006.destroy();
        }
        if (currentChart2007) {
            currentChart2007.destroy();
        }
    }

    // Función para actualizar los gráficos
    function updateCharts() {
        const selectedType = document.querySelector('input[name="chartType"]:checked');
        const selectedColor = document.querySelector('input[name="chartColor"]:checked');
        const selectedOrientation = document.querySelector('input[name="chartOrientation"]:checked');

        if (!selectedType || !selectedColor || !selectedOrientation) {
            // No se han seleccionado opciones, no hacer nada
            return;
        }

        const selectedTypeValue = selectedType.value;
        const selectedColorValue = selectedColor.value;
        const selectedOrientationValue = selectedOrientation.value;

        const year2006Data = dataSamples[selectedTypeValue]['2006'];
        const year2007Data = dataSamples[selectedTypeValue]['2007'];

        destroyCharts();

        // Configura la orientación de los gráficos
        if (selectedOrientationValue === 'horizontal') {
            chartOptions.indexAxis = 'y'; // Cambio a 'y' para orientación horizontal
        } else {
            delete chartOptions.indexAxis;
        }

        // Crea los gráficos para los años 2006 y 2007
        currentChart2006 = createChart(chart2006Container, {
            labels: ['Windows', 'Mac', 'Linux'],
            datasets: [
                {
                    label: '2006',
                    data: year2006Data,
                    backgroundColor: selectedColorValue,
                },
            ],
        }, chartOptions);

        currentChart2007 = createChart(chart2007Container, {
            labels: ['Windows', 'Mac', 'Linux'],
            datasets: [
                {
                    label: '2007',
                    data: year2007Data,
                    backgroundColor: selectedColorValue,
                },
            ],
        }, chartOptions);

        // Muestra los gráficos
        chart2006Container.style.display = 'block';
        chart2007Container.style.display = 'block';
    }

    generateChartButton.addEventListener('click', updateCharts);
    updateCharts();
});
