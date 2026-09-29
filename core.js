/** Pure functions used by the demo QA dashboard. No external dependencies. */
export const CASES = Object.freeze([
  {id:'QA-001',area:'Forms',title:'Required email field',priority:'High',status:'Pass',owner:'Reviewer A'},
  {id:'QA-002',area:'Accessibility',title:'Keyboard navigation',priority:'Critical',status:'Fail',owner:'Reviewer B'},
  {id:'QA-003',area:'Responsive UI',title:'Small-screen table',priority:'Medium',status:'Pass',owner:'Reviewer A'},
  {id:'QA-004',area:'Validation',title:'Malformed CSV input',priority:'High',status:'Open',owner:'Reviewer C'},
  {id:'QA-005',area:'Accessibility',title:'Form labels',priority:'High',status:'Pass',owner:'Reviewer B'},
  {id:'QA-006',area:'Data Quality',title:'Duplicate record handling',priority:'Medium',status:'Fail',owner:'Reviewer C'},
  {id:'QA-007',area:'Forms',title:'Successful submit feedback',priority:'Low',status:'Open',owner:'Reviewer A'},
  {id:'QA-008',area:'Security',title:'Escape exported formula cells',priority:'Critical',status:'Pass',owner:'Reviewer C'},
]);
export const VALID_STATUSES = ['All','Open','Pass','Fail'];
export const VALID_PRIORITIES = ['All','Low','Medium','High','Critical'];

export function filterCases(rows, {search='',status='All',priority='All'}={}) {
  const term = String(search).trim().toLocaleLowerCase();
  return rows.filter(row => (status === 'All' || row.status === status)
    && (priority === 'All' || row.priority === priority)
    && (!term || [row.id,row.title,row.area,row.owner].some(value=>String(value).toLocaleLowerCase().includes(term))));
}
export function summarize(rows) {
  return {total:rows.length,passed:rows.filter(r=>r.status==='Pass').length,
    failed:rows.filter(r=>r.status==='Fail').length,open:rows.filter(r=>r.status==='Open').length,
    critical:rows.filter(r=>r.priority==='Critical' && r.status!=='Pass').length};
}
export function csvCell(value) {
  const raw=String(value ?? '');
  // Prevent spreadsheet formula execution in exports, including leading whitespace.
  const safe=/^[\s\u0000-\u001f]*[=+@-]/u.test(raw) ? "'" + raw : raw;
  return '"' + safe.replaceAll('"','""') + '"';
}
export function toCSV(rows) {
  const fields=['id','area','title','priority','status','owner'];
  return [fields.map(csvCell).join(','),...rows.map(row=>fields.map(field=>csvCell(row[field])).join(','))].join('\r\n')+'\r\n';
}
