<script>
import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  data() {
    return {
      totalValue: 0.0,
      totalPnl24Hours: 0.0,
      totalPnl7Days: 0.0,
      totalPnl30Days: 0.0,
      chartData: {
        labels: ["30 Days", "7 Days", "Current"],
        datasets: [
          {
            label: "30 Day chart",
            data: [],
            fill: false,
            borderColor: "#2554FF",
            backgroundColor: "#2554FF",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted: async function () {
    await axios
      .get("positions")
      .then((response) => {
        this.positions = response.data;
        console.log(response.data);
        for (let i = 0; i < this.positions.length; ++i) {
          this.totalValue += this.positions[i].position_value;
          this.totalPnl7Days += this.positions[i].pnl_7_days;
          this.totalPnl30Days += this.positions[i].pnl_30_days;
        }
        this.totalPnl7Days += this.totalValue;
        this.totalPnl30Days += this.totalValue;
        this.chartData.datasets[0].data.push(this.totalPnl30Days);
        this.chartData.datasets[0].data.push(this.totalPnl7Days);
        this.chartData.datasets[0].data.push(this.totalValue);
      })
      .catch((error) => console.log(error.response));
    await this.renderChart(this.chartData, this.options);
  },
};
</script>
