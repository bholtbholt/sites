#!/usr/bin/env sh
# Usage: yarn workspace bf snapshots:delete <id>
set -eu

id="${1:?Usage: yarn workspace bf snapshots:delete <id>}"
case "$id" in
	*[!a-z0-9]*) echo "Invalid id: $id" >&2; exit 1 ;;
esac

yarn wrangler d1 execute bf-bank-snapshots --remote --command "DELETE FROM snapshots WHERE id = '$id'"

yarn wrangler r2 object delete "bf-bank-snapshots/snapshots/$id/bank.epbank" --remote
for i in 0 1 2 3 4 5 6 7 8 9 10 11; do
	yarn wrangler r2 object delete "bf-bank-snapshots/snapshots/$id/pads/$i.wav" --remote
done
