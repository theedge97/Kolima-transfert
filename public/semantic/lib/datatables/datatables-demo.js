// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable(
      {
        "language" : {
          "url" : "/assets/semantic/lib/datatables/french.json"
        }
      }
    );
});
