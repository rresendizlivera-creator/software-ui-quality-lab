import test from 'node:test';import assert from 'node:assert/strict';
import {CASES,filterCases,summarize,toCSV,csvCell} from '../core.js';
test('filters by status and priority',()=>{const rows=filterCases(CASES,{status:'Fail',priority:'Critical'});assert.equal(rows.length,1);assert.equal(rows[0].id,'QA-002');});
test('search is case insensitive and matches title',()=>assert.equal(filterCases(CASES,{search:'KEYBOARD'})[0].id,'QA-002'));
test('summary describes the displayed set',()=>assert.deepEqual(summarize(filterCases(CASES,{status:'Fail'})),{total:2,passed:0,failed:2,open:0,critical:1}));
test('CSV escapes quotes and separates rows',()=>{const csv=toCSV([{id:'ID',area:'UI',title:'a "quote"',priority:'High',status:'Open',owner:'Tester'}]);assert.match(csv,/"a ""quote"""/);assert.ok(csv.endsWith('\r\n'));});
test('CSV protects spreadsheet formula payloads',()=>{for(const payload of ['=2+3','+SUM(1,2)','-5+3','@name','  =HYPERLINK("x")'])assert.ok(csvCell(payload).startsWith('"\''));});
test('no filters returns all demonstration cases',()=>assert.equal(filterCases(CASES).length,8));
