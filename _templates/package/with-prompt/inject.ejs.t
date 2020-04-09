---
inject: true
to: ./index.js
append: true
skip_if: import './packages/<%= name %>'
---
import './packages/<%= name %>'
