// Get form and result table
const form = document.getElementById("fcfs-form");
const resultTable = document.getElementById("result-table");

// Add event listener to form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get number of processes
  const n = parseInt(document.getElementById("n").value);

  // Create dynamic form fields for each process
  let formHtml = "";
  for (let i = 1; i <= n; i++) {
    formHtml += `
      <label for="arrival-time-${i}">Arrival Time for Process ${i}:</label>
      <input type="number" id="arrival-time-${i}" name="arrival-time-${i}" min="0" required>
      <label for="burst-time-${i}">Burst Time for Process ${i}:</label>
      <input type="number" id="burst-time-${i}" name="burst-time-${i}" min="1" required>
    `;
  }
  document.getElementById("processes").innerHTML = formHtml;

  // Show calculate button
  const calculateBtn = document.getElementById("calculate-btn");
  calculateBtn.style.display = "block";
});

// Add event listener to calculate button
document.getElementById("calculate-btn").addEventListener("click", function () {
  // Get arrival time and burst time for each process
  const processes = [];
  const n = parseInt(document.getElementById("n").value);
  for (let i = 1; i <= n; i++) {
    const arrivalTime = parseInt(document.getElementById(`arrival-time-${i}`).value);
    const burstTime = parseInt(document.getElementById(`burst-time-${i}`).value);
    processes.push({
      id: i,
      arrivalTime: arrivalTime,
      burstTime: burstTime,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
    });
  }

  // Sort processes by arrival time
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  // Calculate completion time, turnaround time, and waiting time for each process
  let totalWaitingTime = 0;
  for (let i = 0; i < n; i++) {
    const prevProcess = processes[i - 1];
    const currProcess = processes[i];
    if (i === 0) {
      currProcess.completionTime = currProcess.burstTime;
    } else {
      currProcess.completionTime = prevProcess.completionTime + currProcess.burstTime;
    }
    currProcess.turnaroundTime = currProcess.completionTime - currProcess.arrivalTime;
    currProcess.waitingTime = currProcess.turnaroundTime - currProcess.burstTime;
    totalWaitingTime += currProcess.waitingTime;
  }
  const avgWaitingTime = totalWaitingTime / n;

  // Display result table
  let tableHtml = "";
  for (let i = 0; i < n; i++) {
    const process = processes[i];
    tableHtml += `
      <tr>
        <td>${process.id}</td>
        <td>${process.arrivalTime}</td>
        <td>${process.burstTime}</td>
        <td>${process.completionTime}</td>
        <td>${process.turnaroundTime}</td>
        <td>${process.waitingTime}</td>
      </tr>
    `;
  }
  resultTable.getElementsByTagName("tbody")[0].innerHTML = tableHtml;
  document.getElementById("avg-wt").innerHTML = avgWaitingTime.toFixed(2);
});
