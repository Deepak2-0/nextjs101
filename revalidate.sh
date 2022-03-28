curl "https://nextjs-pokemon-modes.vercel.app/api/revalidate"
    -X POST \
    -H "content-type:application/json" \
    -d "[\"/pokemon/1"]"