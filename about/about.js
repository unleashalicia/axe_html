$.getJSON( "about.json", function( data ) {
  var violations = [];
  var one_violation = [];
  var needs_review = [];
  var one_needs_review=[];
  var URL = data[0].url;
  $.each( data[0].violations, function( key, val ) {
    for ( i=0; i<val.nodes.length; i++ ) {
      one_violation.push(
        `<ul>
          <li>HTML: ${escapeHtml(val.nodes[i].html)}</li>
          <li>SUMMARY: ${escapeHtml(val.nodes[i].failureSummary)}</li>
          <li>Fixed: <input type="checkbox" /></li>
        </ul>
        <br>`
      );
    }
    violations.push(
      `<li key=${key}>
        <ul>
          <li>Standard: ${escapeHtml(val.description)}</li>
          <li>Issue: ${escapeHtml(val.help)}</li>
          <li>Category: ${escapeHtml(val.id)}</li>
          <li>Impact: ${escapeHtml(val.impact)}</li>
          <li>Instances:
              ${one_violation.join("")}
          </li>
          <li>Tags: ${val.tags.join(", ")}</li>
         </ul>
      </li>
      <br>`
    );
    one_violation = [];
  });



  $.each( data[0].incomplete, function( key, val ) {
    for ( i=0; i<val.nodes.length; i++ ) {
      one_needs_review.push(
        `<ul>
          <li>HTML: ${escapeHtml(val.nodes[i].html)}</li>
          <li>SUMMARY: ${val.nodes[i].any[0] ? escapeHtml(val.nodes[i].any[0].message) : val.nodes[i].none[0].message}</li>
          <li>Fixed: <input type="checkbox" /></li>
        </ul>
        <br>`
      );
    }
    needs_review.push(
      `<li key=${key}>
        <ul>
          <li>Standard: ${escapeHtml(val.description)}</li>
          <li>Issue: ${escapeHtml(val.help)}</li>
          <li>Category: ${val.id}</li>
          <li>Impact: ${val.impact}</li>
          <li>Instances:
            ${one_needs_review.join("")}
          </li>
          <li>Tags: ${val.tags.join(", ")}</li>
        </ul>
      </li>
      <br>`
    );
    one_needs_review=[];
  });

  $("<p/>", {
    "class": "url-string",
    html: URL
  }).appendTo(".url");

  $( "<ol/>", {
    "class": "violations-list",
    html: violations.join( "" )
  }).appendTo( ".violations" );

  $( "<ol/>", {
    "class": "needs-review-list",
    html: needs_review.join( "" )
  }).appendTo( ".needs-review" );

});

//Function taken from: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript

function escapeHtml(str) {
  return str
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}


