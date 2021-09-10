// export function useTokenChartData(tokenAddress) {
//   const [state, { updateChartData }] = useTokenDataContext();
//   const chartData = state?.[tokenAddress]?.chartData;
//   useEffect(() => {
//     async function checkForChartData() {
//       if (!chartData) {
//         const data = await getTokenChartData(tokenAddress);
//         updateChartData(tokenAddress, data);
//       }
//     }
//     checkForChartData();
//   }, [chartData, tokenAddress, updateChartData]);
//   return chartData;
// }
