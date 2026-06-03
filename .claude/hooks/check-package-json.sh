#!/usr/bin/env bash
file=$(jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)
if echo "$file" | grep -q 'package\.json$'; then
  printf '{"decision":"block","reason":"package.json was modified - please review the dependency change before continuing."}\n'
  exit 2
fi
