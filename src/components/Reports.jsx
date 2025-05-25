function Reports() {
  const reports = [
    { id: 1, name: 'User Growth Report', date: '2024-03-01', format: 'PDF' },
    { id: 2, name: 'Revenue Analysis', date: '2024-03-01', format: 'Excel' },
    { id: 3, name: 'Service Usage Stats', date: '2024-03-01', format: 'PDF' },
  ];

  return (
    <div>
      <h1 className="page-title">Reports</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Date</th>
              <th>Format</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.name}</td>
                <td>{report.date}</td>
                <td>{report.format}</td>
                <td>
                  <button className="button">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;